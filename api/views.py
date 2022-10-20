from rest_framework import permissions, viewsets
from django_filters import rest_framework as filters

from . import serializers as api_serializers, models, filters as api_filters


class Events(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = api_serializers.EventSerializer
    queryset = models.Event.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = api_filters.EventFilter


class Users(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = api_serializers.UserSerializer
    queryset = models.User.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = api_filters.UserFilter


class ProblemTypes(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = api_serializers.ProblemTypeSerializer
    queryset = models.ProblemType.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = api_filters.ProblemTypeFilter


class EventUserProblemTypes(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = api_serializers.EventUserProblemTypeSerializer
    queryset = models.EventUserProblemType.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = api_filters.EventUserProblemTypeFilter
