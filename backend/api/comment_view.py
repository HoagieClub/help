from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


class CommentSerializer(serializers.ModelSerializer):
    pass


class CommentView(APIView):
    def get(self, request, comment_id: str) -> Response:
        """Get all details associated with a given comment."""
        pass

    def put(self, request, comment_id: str) -> Response:
        """Update an existing comment."""
        pass

    def delete(self, request, comment_id: str) -> Response:
        """Delete an existing comment."""
        pass


class CreateCommentView(APIView):
    def post(self, request, answer_id: str) -> Response:
        """Create a new comment associated with a given answer."""
        pass
