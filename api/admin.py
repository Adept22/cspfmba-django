from django.contrib import admin

from . import models as api_models


# Register your models here.
admin.site.register(api_models.Event)
admin.site.register(api_models.User)
admin.site.register(api_models.ProblemType)
admin.site.register(api_models.EventUserProblemType)
