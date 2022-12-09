from rest_framework import serializers
from .models import FeedCard


class FeedCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedCard
        fields = ("__all__")