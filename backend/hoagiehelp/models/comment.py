from django.db import models

class Comment(models.Model):
    '''Represents comments on an answer of a question'''
    
    id = models.AutoField(primary_key=True)
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    text = models.TextField(blank=False)
    hearts = models.PositiveIntegerField(default=0)
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Comment'

    def __str__(self):
        return f'Comment on {self.answer_id} by {self.user_id}'