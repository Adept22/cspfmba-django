
from rest_framework import serializers

from . import models


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = '__all__'
        read_only_fields = ('id',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'
        read_only_fields = ('id',)


class ProblemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProblemType
        fields = '__all__'
        read_only_fields = ('id',)


class EventUserProblemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventUserProblemType
        fields = '__all__'
        read_only_fields = ('id',)
