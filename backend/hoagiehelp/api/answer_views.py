from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Answer


class AnswerSerializer(serializers.ModelSerializer):
    pass


class AnswerListView(APIView):
    """Handle collection operations for answers under a question."""

    def get(self, request, question_id: str) -> Response:
        """List all answers for a given question."""
        pass

    def post(self, request, question_id: str) -> Response:
        """Create a new answer associated with a given question."""
        pass


class AnswerDetailView(APIView):
    """Handle individual answer operations."""

    def get(self, request, answer_id: str) -> Response:
        """Get all details associated with a given answer."""
        try:
            answer = Answer.objects.get(id=answer_id)
        except Answer.DoesNotExist:
            return Response({"detail": "Answer not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AnswerSerializer(answer)
        return Response(serializer.data)

    def put(self, request, answer_id: str) -> Response:
        """Update an existing answer."""
        try:
            answer = Answer.objects.get(id=answer_id)
        except Answer.DoesNotExist:
            return Response({"detail": "Answer not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AnswerSerializer(answer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, answer_id: str) -> Response:
        """Delete an existing answer."""
        try:
            answer = Answer.objects.get(id=answer_id)
        except Answer.DoesNotExist:
            return Response({"detail":"Answer not found"}, status=status.HTTP_404_NOT_FOUND)
        answer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
