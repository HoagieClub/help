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

    def get_notifications(self, user_id) -> Response:
        """Get all notifications for a given user."""
        notifications = Notification.objects.filter(user=user_id).order_by("-created_at")
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)