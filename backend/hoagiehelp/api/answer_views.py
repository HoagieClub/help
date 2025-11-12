from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


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
        pass

    def put(self, request, answer_id: str) -> Response:
        """Update an existing answer."""
        pass

    def delete(self, request, answer_id: str) -> Response:
        """Delete an existing answer."""
        pass