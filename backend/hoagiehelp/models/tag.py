from django.db import models

# Choices for question_tag
QUESTION_TAG_CHOICES = (
        (1, "exam prep"),
        (2, "problem set"),
        (3, "study tips"),
        (4, "concepts"),
        (5, "course selection"),
        (6, "degree planning"),
        (7, "citation"),
        (8, "course advice"),
        (9, "career"),
    )

class Tag(models.Model):
    '''Represents a tag on a question'''
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(choices=QUESTION_TAG_CHOICES, unique=True)

    class Meta:
        db_table = 'Tag'

    def __str__(self):
        return f'Tag: {self.tag}'