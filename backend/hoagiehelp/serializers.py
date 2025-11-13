from rest_framework import serializers
from .models import Answer


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:

        model = Answer

        fields = (
            "id",
            "question_id",
            "user",
            "text",
            "heart",
            "create_time",
            "last_update_time",
            "is_annoymous"
        )

