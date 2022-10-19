
import django_filters

from . import models as api_models


class EventFilter(django_filters.FilterSet):
    class Meta:
        model = api_models.Event
        fields = '__all__'


class UserFilter(django_filters.FilterSet):
    class Meta:
        model = api_models.User
        fields = '__all__'


class ProblemTypeFilter(django_filters.FilterSet):
    class Meta:
        model = api_models.ProblemType
        fields = '__all__'


class EventUserProblemTypeFilter(django_filters.FilterSet):
    class Meta:
        model = api_models.EventUserProblemType
        fields = '__all__'
