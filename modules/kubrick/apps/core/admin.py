from django.contrib import admin
from apps.users.models import Room, UserProfile
from apps.awards.models import Nominee, Indication, Category

# Register your models here.

admin.site.register([Room, Nominee, Indication, Category, UserProfile])
