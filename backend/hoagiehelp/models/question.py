from django.core.validators import MinValueValidator
from django.db import models

from hoagiehelp.models.tag import Tag
from hoagiehelp.models.user import CustomUser


class Question(models.Model):
	"""Represents a question posted by a user."""

	id = models.AutoField(primary_key=True)
	user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
	title = models.CharField(max_length=255)
	tags = models.ManyToManyField(Tag)
	course = models.CharField(max_length=100, blank=True, null=True, db_index=True)
	details = models.TextField()
	create_time = models.DateTimeField(auto_now_add=True)
	last_updated_time = models.DateTimeField(auto_now=True)
	hearts = models.IntegerField(default=0, validators=[MinValueValidator(0)])
	view = models.IntegerField(default=0, validators=[MinValueValidator(0)])
	user_is_anonymous = models.BooleanField(default=False)

	def __str__(self):
		return f"Question(id={self.id}, title={self.title})"
