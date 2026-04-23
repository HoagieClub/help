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
		read_only_fields = ["id", "user", "question", "answer", "comment", "created_at"]


class NotificationView(APIView):
	"""Handle collection operations for notifications."""

	def get(self, request, notification_id: str) -> Response:
		"""Retrieve specific notification for a given user."""
		notification = get_object_or_404(Notification, id=notification_id, user=request.user)
		serializer = NotificationSerializer(notification)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def delete(self, request, notification_id: str) -> Response:
		"""Delete a specific notification for a given user."""
		notification = get_object_or_404(Notification, id=notification_id, user=request.user)
		notification.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

	def post(self, request, notification_id: str) -> Response:
		"""Update an existing notification."""
		notification = get_object_or_404(Notification, id=notification_id, user=request.user)
		serializer = NotificationSerializer(notification, data=request.data, partial=True)

		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_notifications(request) -> Response:
	"""Get all notifications for a given user."""
	user_id = request.user.id
	notifications = Notification.objects.filter(user=user_id).order_by("-created_at")
	serializer = NotificationSerializer(notifications, many=True)
	return Response(serializer.data, status=status.HTTP_200_OK)
