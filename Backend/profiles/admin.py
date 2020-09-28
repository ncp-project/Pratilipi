from django.contrib import admin
from easy_select2 import select2_modelform
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import *

from django.contrib.auth.models import User

from import_export import resources
from import_export.admin import ImportExportModelAdmin, ExportActionMixin

class UserResource(resources.ModelResource):
    class Meta:
        model = User


class UserAdmin(ImportExportModelAdmin, ExportActionMixin, DefaultUserAdmin):
    resource_class = UserResource
    pass


admin.site.unregister(User)
admin.site.register(User, UserAdmin)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):

    list_display = ('user',)
    list_filter = ()
    search_fields = ['user__username', 'phone']
    select2 = select2_modelform(Profile, attrs={'width': '250px'})
    form = select2