from rest_framework import serializers

from hoagiehelp.models.studygroup import StudyGroup


# Study Group Serializer
class StudyGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyGroup
        fields = (
            "id",
            "title",
            "description",
            "leader",
            "meeting_datetime",
            "max_spots",
            "members",
            "created_at",
            "updated_at",
        )
