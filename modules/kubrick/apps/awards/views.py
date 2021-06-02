from django.conf import settings
from django.shortcuts import get_object_or_404

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response

from apps.awards import models, serializers
from apps.core.permissions import IsStaffOrReadOnly


class IndicationViewSet(viewsets.ModelViewSet):
    queryset = models.Indication.objects.filter(
        year=settings.AWARD_CURRENT_YEAR
    )
    serializer_class = serializers.IndicationSerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        queryset = models.Indication.objects.all()
        if category := self.request.query_params.get('category', None):
            queryset = queryset.filter(category=category)
        return queryset

    def list(self, request, format=None, **kwargs):
        queryset = self.get_queryset()
        serializer = serializers.IndicationReadOnlySerializer(
            queryset, many=True, context={'request': request}
        )
        return Response(serializer.data)

    def retrieve(self, request, pk=None, format=None, **kwargs):
        queryset = self.get_queryset()
        indication = get_object_or_404(queryset, pk=pk)
        serializer = serializers.IndicationReadOnlySerializer(
            indication, context={'request': request}
        )
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    lookup_field = 'url_field'
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [IsStaffOrReadOnly]


class NomineeViewSet(viewsets.ModelViewSet):
    queryset = models.Nominee.objects.filter()
    serializer_class = serializers.NomineeSerializer
    permission_classes = [IsStaffOrReadOnly]
