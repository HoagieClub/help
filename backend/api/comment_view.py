from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


class CommentSerializer(serializers.ModelSerializer):
    pass


class CommentView(APIView):
    def put(self, request, comment_id: str) -> Response:
        """Update an existing comment."""
        pass

    def post(self, request, comment_id: str) -> Response:
        """Create a new comment."""
        pass

    def delete(self, request, comment_id: str) -> Response:
        """Delete an existing comment."""
        pass
