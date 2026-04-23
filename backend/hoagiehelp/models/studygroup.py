from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from django.db import models

User = get_user_model()
MAX_TITLE_LENGTH = 255


class StudyGroup(models.Model):
	"""Represents a study group."""

	id = models.AutoField(primary_key=True)
	title = models.CharField(max_length=MAX_TITLE_LENGTH)
	description = models.TextField(blank=True)

	leader = models.ForeignKey(
		User,
		on_delete=models.CASCADE,
		related_name="study_groups_led",
	)

	meeting_datetime = models.DateTimeField(db_index=True)
	max_spots = models.PositiveIntegerField(validators=[MinValueValidator(1)])

	members = models.ManyToManyField(
		User,
		related_name="study_groups_joined",
		blank=True,
	)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ["-created_at"]
		constraints = [
			models.UniqueConstraint(
				fields=["leader", "meeting_datetime", "title"],
				name="unique_study_group_per_leader",
			)
		]

	@property
	def spots_taken(self):
		"""Returns number of members"""
		return self.members.count()

	@property
	def spots_remaining(self):
		"""Returns remaining spots"""
		return max(self.max_spots - self.spots_taken, 0)

	@property
	def is_full(self):
		"""Check if the study group is full"""
		return self.spots_taken >= self.max_spots

	def __str__(self):
		return self.title
