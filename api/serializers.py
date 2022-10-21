
from rest_framework import serializers

from . import models


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = '__all__'
        read_only_fields = ('id',)
        depth = 2


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'
        read_only_fields = ('id',)
        depth = 2


class ProblemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProblemType
        fields = '__all__'
        read_only_fields = ('id',)
        depth = 2


class EventUserProblemTypeSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    user = UserSerializer()
    problem_type = ProblemTypeSerializer()

    # called on create/update operations
    def to_internal_value(self, data):
        self.fields['event'] = serializers.PrimaryKeyRelatedField(queryset=models.Event.objects.all())
        self.fields['user'] = serializers.PrimaryKeyRelatedField(queryset=models.User.objects.all())
        self.fields['problem_type'] = serializers.PrimaryKeyRelatedField(queryset=models.ProblemType.objects.all())

        return super(EventUserProblemTypeSerializer, self).to_internal_value(data)

    class Meta:
        model = models.EventUserProblemType
        fields = '__all__'
        read_only_fields = ('id',)
        depth = 2
