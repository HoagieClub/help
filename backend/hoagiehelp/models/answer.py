from django.db import models

class Question(models.Model):
    '''Represents an answer to a question'''
    
    id = models.AutoField(primary_key=True)
    question_id = models.ForeignKey('Question', on_delete=models.CASCADE)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    text = models.TextField(blank=False)
    hearts = models.PositiveIntegerField(default=0)
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Answer'

    def __str__(self):
        return f'Answer to question {self.question_id} by {self.user.net_id}'