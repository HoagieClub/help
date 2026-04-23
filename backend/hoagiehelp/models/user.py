from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class CustomUser(AbstractUser):
    """HoagieHelp user."""

    net_id = models.CharField(
        max_length=20, unique=True, db_index=True
    )
    class_year = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1900), MaxValueValidator(2100)]
    )
    hearts = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "User"

    def __str__(self):
        return f"{self.get_full_name()} ({self.net_id})"

