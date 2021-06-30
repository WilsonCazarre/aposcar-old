from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser

import uuid

from apps.awards.models import Indication


class UserProfile(AbstractUser):
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        help_text="User profile picture",
    )
    bets = models.ManyToManyField(
        Indication,
        blank=True,
        help_text="A list of Indication IDs. You can't place two bets to the same category.",
    )
    email = models.EmailField(
        blank=False,
        unique=True,
        error_messages={"unique": "A user with that email already exists"},
    )

    def __str__(self):
        return self.username


class Room(models.Model):
    share_code = models.CharField(unique=True, max_length=6, blank=True)
    name = models.CharField(max_length=14)
    owner = models.ForeignKey(
        UserProfile, related_name="owner", on_delete=models.CASCADE
    )
    users = models.ManyToManyField(
        UserProfile, related_name="users", blank=True
    )

    def save(self, *args, **kwargs):
        share_code = self.share_code
        if not share_code:
            share_code = uuid.uuid4().hex[:6].upper()
        while (
            Room.objects.filter(share_code=share_code)
            .exclude(pk=self.pk)
            .exists()
        ):
            share_code = uuid.uuid4().hex[:6].upper()
        self.share_code = share_code
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
