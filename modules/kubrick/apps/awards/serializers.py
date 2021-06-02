from rest_framework import serializers

from apps.awards import models


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Category
        fields = ['url', 'id', 'name', 'url_field', 'indications']
        extra_kwargs = {
            'url': {'lookup_field': 'url_field'}
        }


class NomineeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Nominee
        fields = ['url', 'id', 'name', 'picture_url', 'description']


class IndicationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Indication
        fields = ['url', 'id', 'category', 'nominated',
                  'year', 'is_winner', 'annotation']


class IndicationReadOnlySerializer(IndicationSerializer):
    # This serializer is provided by convenience and is used in
    # the retrieve and list actions of the Indications view
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)
    nominated = NomineeSerializer(read_only=True)

    class Meta:
        model = models.Indication
        fields = IndicationSerializer.Meta.fields