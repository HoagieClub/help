from django.db import models

class Heart(models.Model):
    """Represents a like on a question, answer, or comment"""
    
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    question = models.ForeignKey('Question', on_delete=models.CASCADE, null=True, blank=True)
    answer = models.ForeignKey('Answer', on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey('Comment', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'Heart'
        constraints = [
            models.UniqueConstraint(fields=['user', 'question'], condition=models.Q(question__isnull=False), name='unique_heart_question'),
            models.UniqueConstraint(fields=['user', 'answer'], condition=models.Q(answer__isnull=False), name='unique_heart_answer'),
            models.UniqueConstraint(fields=['user', 'comment'], condition=models.Q(comment__isnull=False), name='unique_heart_comment'),
            models.CheckConstraint(
                condition=(
                    models.Q(question__isnull=False, answer__isnull=True, comment__isnull=True) |
                    models.Q(question__isnull=True, answer__isnull=False, comment__isnull=True) |
                    models.Q(question__isnull=True, answer__isnull=True, comment__isnull=False)
                ),
                name='heart_exactly_one_target',
            ),
        ]

    def __str__(self):
        # Point heart to question, answer, or comment to which it pertains
        return f'Heart on {self.question_id or self.answer_id or self.comment_id} by {self.user_id}'
