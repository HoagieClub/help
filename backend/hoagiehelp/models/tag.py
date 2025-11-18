from django.db import models

# Choices for question_tag
QUESTION_TAG_CHOICES = (
        ("exam prep", "exam prep"),
        ("problem set", "problem set"),
        ("study tips", "study tips"),
        ("concepts", "concepts"),
        ("course selection", "course selection"),
        ("degree planning", "degree planning"),
        ("citation", "citation"),
        ("course advice", "course advice"),
        ("career", "career"),
    )

class Tag(models.Model):
    '''Represents a tag on a question'''
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30,choices=QUESTION_TAG_CHOICES, unique=True)

    class Meta:
        db_table = 'Tag'

    def __str__(self):
        return f'Tag: {self.name}'