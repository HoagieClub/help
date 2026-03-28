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

def get_notifications(request) -> Response:
    """Get all notifications for a given user."""
    user_id = request.user.id
    notifications = Notification.objects.filter(user=user_id).order_by("-created_at")
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)