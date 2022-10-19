import uuid
from django.db import models


class BaseModel(models.Model):
    """ Абстрактная модель для использования UUID в качестве PK."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False)

    class Meta:
        abstract = True


class Event(BaseModel):
    name = models.CharField(max_length=255, blank=False, null=False)

    def __str__(self):
        return "%s" % (self.name)


class User(BaseModel):
    email = models.CharField(max_length=255, blank=False, null=False)

    def __str__(self):
        return "%s" % (self.email)


class ProblemType(BaseModel):
    name = models.CharField(max_length=255, blank=False, null=False)

    def __str__(self):
        return "%s" % (self.name)


class EventUserProblemType(BaseModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem_type = models.ForeignKey(ProblemType, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s %s" % (self.event, self.user, self.problem_type)
