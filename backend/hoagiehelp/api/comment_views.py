from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


class CommentSerializer(serializers.ModelSerializer):
    pass


class CommentListView(APIView):
    """Handle collection operations for comments under an answer."""

    def get(self, request, answer_id: str) -> Response:
        """List all comments for a given answer."""
        pass

    def post(self, request, answer_id: str) -> Response:
        """Create a new comment associated with a given answer."""
        pass


class CommentDetailView(APIView):
    """Handle individual comment operations."""

    def get(self, request, comment_id: str) -> Response:
        """Get all details associated with a given comment."""
        pass

    def put(self, request, comment_id: str) -> Response:
        """Update an existing comment."""
        pass

    def delete(self, request, comment_id: str) -> Response:
        """Delete an existing comment."""
        pass
