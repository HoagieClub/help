from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


class QuestionSerializer(serializers.ModelSerializer):
    pass


class QuestionListView(APIView):
    """Handle collection operations for questions."""

    def get(self, request) -> Response:
        """List all questions."""
        pass

    def post(self, request) -> Response:
        """Create a new question."""
        pass


class QuestionDetailView(APIView):
    """Handle individual question operations."""

    def get(self, request, question_id: str) -> Response:
        """Get all details associated with a given question."""
        pass

    def put(self, request, question_id: str) -> Response:
        """Update an existing question."""
        pass

    def delete(self, request, question_id: str) -> Response:
        """Delete an existing question."""
        pass
