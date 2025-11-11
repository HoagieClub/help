from django.db import models
from django.core.validators import MinValueValidator

class Question(models.Model):
    """Represents a question posted by a user."""
    
    id = models.AutoField(primary_key = True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    tags = models.ManyToManyField('Tag', related_name='questions')
    course = models.CharField(max_length=100, blank=True, null=True, db_index=True)
    details = models.TextField()
    create_time = models.DateTimeField(auto_now_add=True)
    last_updated_time = models.DateTimeField(auto_now=True)
    heart = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    view = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    user_is_anonymous = models.BooleanField(default=False)

    def __str__(self):
        return f"Question(id={self.id}, title={self.title})"