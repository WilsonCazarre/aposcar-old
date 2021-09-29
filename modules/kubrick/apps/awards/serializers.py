from rest_framework import serializers

from apps.awards import models
from apps.users.models import UserProfile


class NomineeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Nominee
        fields = ["id", "name", "picture_url", "description"]


class IndicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Indication
        fields = [
            "id",
            "category",
            "nominated",
            "year",
            "is_winner",
            "annotation",
        ]


class CategorySerializer(serializers.ModelSerializer):
    winner_indication = serializers.SerializerMethodField()
    current_user_indication = serializers.SerializerMethodField()

    class Meta:
        model = models.Category
        fields = [
            "id",
            "name",
            "url_field",
            "indications",
            "winner_indication",
            "current_user_indication",
        ]
        extra_kwargs = {"url": {"lookup_field": "url_field"}}

    def get_winner_indication(self, obj: models.Category):
        try:
            winner = models.Indication.objects.get(
                is_winner=True, category=obj
            )
            return IndicationReadOnlySerializer(winner).data
        except models.Indication.DoesNotExist:
            return {}

    def get_current_user_indication(self, obj: models.Category):
        user: UserProfile = self.context["request"].user
        print(user)
        if not user.is_anonymous:
            try:
                return IndicationReadOnlySerializer(
                    user.bets.get(category=obj)
                ).data
            except models.Indication.DoesNotExist:
                return


class IndicationReadOnlySerializer(IndicationSerializer):
    # This serializer is provided by convenience and is used in
    # the retrieve and list actions of the Indications view
    category = serializers.SlugRelatedField(slug_field="name", read_only=True)
    nominated = NomineeSerializer(read_only=True)

    class Meta:
        model = models.Indication
        fields = IndicationSerializer.Meta.fields


class CategoryDetailSerializer(CategorySerializer):
    indications = IndicationReadOnlySerializer(many=True, read_only=True)

    class Meta:
        model = models.Category
        fields = CategorySerializer.Meta.fields
