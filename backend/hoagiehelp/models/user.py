from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class CustomUser(AbstractUser):
    '''HoagieHelp user.'''

    net_id = models.CharField(
        max_length=20, unique=True, null=True, blank=True, db_index=True
    )
    class_year = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1900), MaxValueValidator(2100)]
    )
    dietary_restrictions = ArrayField(
        models.CharField(max_length=50),
        blank=True,
        default=list,
        help_text=_("List of dietary restrictions/preferences"),
    )
    daily_calorie_target = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MaxValueValidator(10000)]
    )
    daily_protein_target = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MaxValueValidator(1000)]
    )
    hearts = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "users"

    def __str__(self):
        return f"{self.get_full_name()} ({self.net_id})"

