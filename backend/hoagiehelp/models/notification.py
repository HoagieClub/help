from django.db import models


class Notification(models.Model):
	"""Represents notifications to a user when an answer is given"""

	id = models.AutoField(primary_key=True)
	user = models.ForeignKey("CustomUser", on_delete=models.CASCADE)
	question = models.ForeignKey("Question", on_delete=models.CASCADE)
	answer = models.ForeignKey("Answer", on_delete=models.CASCADE)
	comment = models.ForeignKey("Comment", on_delete=models.CASCADE, null=True)
	is_read = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = "Notification"

	def __str__(self):
		return f"Notification on {self.question_id} by {self.user_id}"
