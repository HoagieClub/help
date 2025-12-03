from django.db import models
from django.db.models import Q

from hoagiehelp.models.question import Question
from hoagiehelp.models.user import CustomUser


class AnonymousName(models.Model):
    """Model to store anonymous names associated with users and questions."""

    id = models.AutoField(primary_key=True)
    anonymous_name = models.CharField(max_length=255)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["question", "user"],
                name="unique_question_user",
            ),
            models.UniqueConstraint(
                fields=["question", "anonymous_name"],
                name="unique_question_anonymous_name",
            ),
        ]

    def __str__(self):
        return f"Anonymous_Name(id={self.id}, anonymous_name={self.anonymous_name})"
