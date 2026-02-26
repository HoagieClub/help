from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from hoagiehelp.models.notification import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            "id",
            "user",
            "question",
            "answer",
            "comment",
            "is_read",
            "created_at",
        ]

class NotificationView(APIView):
    """Handle collection operations for notifications."""

    def get(self, request) -> Response:
        """List all notifications for a given user."""
        user = request.user
        queryset = Notification.objects.filter(user=user).order_by("-created_at")

        serializer = NotificationSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, notification_id=None) -> Response:
        """Delete a specific notification for a given user."""
        notification = get_object_or_404(Notification, id=notification_id, user=request.user)
        notification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request) -> Response:
        """Create a new notification."""
        serializer = NotificationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)