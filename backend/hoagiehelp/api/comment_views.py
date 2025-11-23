from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from hoagiehelp.models.comment import Comment


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
        comment = get_object_or_404(Comment, id=comment_id)
        serializer = CommentSerializer(comment)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, comment_id: str) -> Response:
        """Update an existing comment."""
        comment = get_object_or_404(Comment, id=comment_id)
        serializer = CommentSerializer(comment, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, comment_id: str) -> Response:
        """Delete an existing comment."""
        comment = get_object_or_404(Comment, id=comment_id)
        comment.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
