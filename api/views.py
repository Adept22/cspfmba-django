from rest_framework import permissions, viewsets
from django_filters import rest_framework as filters

from . import serializers as api_serializers, models, filters as api_filters, paginators as api_paginators


class Events(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = api_serializers.EventSerializer
    queryset = models.Event.objects.all()
    pagination_class = api_paginators.CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = api_filters.EventFilter


class Users(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = api_serializers.UserSerializer
    queryset = models.User.objects.all()
    pagination_class = api_paginators.CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = api_filters.UserFilter


class ProblemTypes(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = api_serializers.ProblemTypeSerializer
    queryset = models.ProblemType.objects.all()
    pagination_class = api_paginators.CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = api_filters.ProblemTypeFilter


class EventUserProblemTypes(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = api_serializers.EventUserProblemTypeSerializer
    queryset = models.EventUserProblemType.objects.all()
    pagination_class = api_paginators.CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = api_filters.EventUserProblemTypeFilter
