from django.core.mail import EmailMultiAlternatives
from django.db.models import Count
from django.dispatch import receiver

from django.template.loader import render_to_string
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.users import models, serializers
from apps.core.permissions import IsProfileOwnerOrReadOnlyOrStaff, \
    IsOwnerOrInRoom


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    permission_classes = [IsProfileOwnerOrReadOnlyOrStaff]

    def get_queryset(self):
        queryset = models.UserProfile.objects.all()

        ordering_query_sets = {
            'score': models.UserProfile.objects
                .annotate(score=Count('bets__is_winner')).order_by('-score'),
            '-score': models.UserProfile.objects
                .annotate(score=Count('bets__is_winner')).order_by('score'),
        }

        if ordering := self.request.query_params.get('ordering'):
            return ordering_query_sets['score']
        return queryset

    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAuthenticated])
    def current_user(self, request, pk=None):
        """
        Returns the user corresponding to the specified Authorization header
        token, if it's valid.
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class RoomViewSet(viewsets.ModelViewSet):
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrInRoom]

    def get_queryset(self):
        queryset = models.Room.objects.all()

        # The user can see all rooms that he owns or belongs to.
        return queryset.filter(users__in=[self.request.user]) | \
               queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['POST'])
    def add_user(self, request, pk=None):
        room = self.get_object()
        users = models.UserProfile.objects.filter(pk__in=request.data['users'])
        for user in users:
            room.users.add(user.id)
        return Response({'status': 'new users added'})

    @action(detail=True, methods=['POST'])
    def remove_user(self, request, pk=None):
        room = self.get_object()
        users = models.UserProfile.objects.filter(pk__in=request.data['users'])
        for user in users:
            room.users.remove(user.id)
        return Response({'status': 'users removed'})

    @action(detail=True, methods=['PATCH'])
    def renew_code(self, request, pk=None):
        room = self.get_object()
        self.check_object_permissions(self.request, room)
        room.share_code = None
        room.save()
        return Response({'share_code': room.share_code})


class CustomPasswordResetView:
    @staticmethod
    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
        context = {
            'current_user': reset_password_token.user,
            'username': reset_password_token.user.username,
            'email': reset_password_token.user.email,
            'reset_password_url': "{}?token={}".format(
                instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
                reset_password_token.key)
        }

        email_html_message = render_to_string('email/user_reset_password.html', context)
        email_plaintext_message = render_to_string(
            'email/user_reset_password.txt', context)

        msg = EmailMultiAlternatives(
            subject="Password Reset for Aposcar",
            body=email_plaintext_message,
            from_email='no-replay@labqu4tro.com',
            to=[reset_password_token.user.email]
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()
        print('message sent')