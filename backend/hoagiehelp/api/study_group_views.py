from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

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


class StudyGroupListView(APIView):
    """Handle collection operations for study groups."""

    def get(self, request) -> Response:
        """List all study groups."""
        queryset = StudyGroup.objects.all()
        serializer = StudyGroupSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request) -> Response:
        """Create a new study group."""
        serializer = StudyGroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudyGroupDetailView(APIView):
    """Handle individual study group operations."""

    def get(self, request, studygroup_id: str) -> Response:
        """Get all details associated with a given study group."""
        try:
            study_group = StudyGroup.objects.get(id=studygroup_id)
        except StudyGroup.DoesNotExist:
            return Response(
                {"detail": "Study group not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = StudyGroupSerializer(study_group)
        return Response(serializer.data)

    def put(self, request, studygroup_id: str) -> Response:
        """Update an existing study group."""
        try:
            study_group = StudyGroup.objects.get(id=studygroup_id)
        except StudyGroup.DoesNotExist:
            return Response(
                {"detail": "Study group not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = StudyGroupSerializer(study_group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, studygroup_id: str) -> Response:
        """Delete an existing study group."""
        try:
            study_group = StudyGroup.objects.get(id=studygroup_id)
        except StudyGroup.DoesNotExist:
            return Response(
                {"detail": "Study group not found"}, status=status.HTTP_404_NOT_FOUND
            )
        study_group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
