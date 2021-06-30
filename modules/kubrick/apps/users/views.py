from django.core.mail import EmailMultiAlternatives
from django.db.models import Count, QuerySet
from django.dispatch import receiver

from django.template.loader import render_to_string
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.users import models, serializers
from apps.awards.models import Indication
from apps.core.permissions import (
    IsProfileOwnerOrReadOnlyOrStaff,
    IsOwnerOrInRoom,
)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    permission_classes = [IsProfileOwnerOrReadOnlyOrStaff]
    lookup_field = "username"

    def get_queryset(self):
        queryset = models.UserProfile.objects.all()
        ordering: str

        if room := self.request.query_params.get("room"):
            queryset = models.Room.objects.get(pk=room).users.all()

        if ordering := self.request.query_params.get("ordering"):
            queryset = queryset.annotate(
                score=Count("bets__is_winner")
            ).order_by(ordering.strip("/"))
        return queryset

    @action(
        detail=False,
        methods=["GET"],
        permission_classes=[permissions.IsAuthenticated],
    )
    def current_user(self, request, username=None):
        """
        Returns the user corresponding to the specified Authorization header
        token, if it's valid.
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(
        detail=True,
        methods=["POST"],
        permission_classes=[permissions.IsAuthenticated],
    )
    def guess(self, request, username=None):
        try:
            new_indication = Indication.objects.get(
                pk=request.data["indicationId"]
            )
        except Indication.DoesNotExist:
            return Response(
                {"status": "indication does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user: models.UserProfile = request.user
        user.bets.remove(
            *Indication.objects.filter(category=new_indication.category)
        )
        user.bets.add(new_indication)
        return Response({"status": "success"})


class RoomViewSet(viewsets.ModelViewSet):
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrInRoom]

    def get_queryset(self):
        queryset = models.Room.objects.all()

        # The user can see all rooms that he owns or belongs to.
        return queryset.filter(users__in=[self.request.user])

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(
        detail=False,
        methods=["POST"],
        permission_classes=[permissions.IsAuthenticated],
    )
    def join_room(self, request, pk=None):
        room_queryset: QuerySet[models.Room] = models.Room.objects.all()
        room = room_queryset.get(share_code=request.data["shareCode"])
        if room.users.filter(pk=request.user.id).exists():
            return Response(
                {"status": "user is already on the room"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        room.users.add(request.user)
        return Response({"status": "new user added"})

    @action(
        detail=True,
        methods=["POST"],
        permission_classes=[permissions.IsAuthenticated],
    )
    def remove_user(self, request, pk=None):
        room = self.get_object()
        user_to_remove = models.UserProfile.objects.get(
            username=request.data["username"]
        )
        is_room_owner = room.owner == request.user
        if room.owner == user_to_remove:
            return Response({"status": "You can't remove the owner of a room"})

        if (user_to_remove != request.user) and is_room_owner:
            return Response(
                {"status": "you don't have permission to remove this user"}
            )

        room.users.remove(user_to_remove)
        return Response({"status": "user removed"})

    @action(detail=True, methods=["PATCH"])
    def renew_code(self, request, pk=None):
        room = self.get_object()
        self.check_object_permissions(self.request, room)
        room.share_code = None
        room.save()
        return Response({"share_code": room.share_code})


class CustomPasswordResetView:
    @staticmethod
    @receiver(reset_password_token_created)
    def password_reset_token_created(
        sender, instance, reset_password_token, *args, **kwargs
    ):
        context = {
            "current_user": reset_password_token.user,
            "username": reset_password_token.user.username,
            "email": reset_password_token.user.email,
            "reset_password_url": "{}?token={}".format(
                instance.request.build_absolute_uri(
                    reverse("password_reset:reset-password-confirm")
                ),
                reset_password_token.key,
            ),
        }

        email_html_message = render_to_string(
            "email/user_reset_password.html", context
        )
        email_plaintext_message = render_to_string(
            "email/user_reset_password.txt", context
        )

        msg = EmailMultiAlternatives(
            subject="Password Reset for Aposcar",
            body=email_plaintext_message,
            from_email="no-replay@labqu4tro.com",
            to=[reset_password_token.user.email],
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()
        print("message sent")


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.MyTokenObtainPairSerializer
