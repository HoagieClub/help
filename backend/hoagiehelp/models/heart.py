from django.db import models
from django.core.exceptions import ValidationError

class Heart(models.Model):
    """Represents a like on a question, answer, or comment"""
    
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    question = models.ForeignKey('Question', on_delete=models.CASCADE, null=True, blank=True)
    answer = models.ForeignKey('Answer', on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey('Comment', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'Heart'

    def clean(self):
        # Count number of present "belonging to" fields
        present_fields = [
            self.question,
            self.answer,
            self.comment,
        ]
        is_present = sum(1 for field in present_fields if field is not None and field != "")

        # If none are filled, throw a validation error
        if is_present == 0:
            raise ValidationError("Heart must belong to a question, answer, or comment.")

        # If more than one is filled, throw a validation error
        elif is_present > 1:
            raise ValidationError("Heart must belong to a question, answer, or comment exclusively.")

    def __str__(self):
        # Point heart to question, answer, or comment to which it pertains
        return f'Heart on {self.question_id or self.answer_id or self.comment_id} by {self.user_id}'
