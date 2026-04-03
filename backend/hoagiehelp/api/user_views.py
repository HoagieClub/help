from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from hoagiehelp.api.comment_views import CommentSerializer
from hoagiehelp.models.comment import Comment
from hoagiehelp.models.user import CustomUser


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "net_id",
            "class_year",
            "first_name",
            "last_name",
            "username",
            "email",
        )
        read_only_fields = ("net_id", "email")


class UserView(APIView):
    pass


def user_questions(request, user_id: str):
    pass


def user_answers(request, user_id: str):
    pass


def user_comments(request, user_id: str) -> Response:
    # retrieve all comments a user has posted
    get_object_or_404(CustomUser, net_id=user_id)

    queryset = Comment.objects.filter(user__net_id=user_id).order_by("-created_at")

    if user_id != request.user.net_id:
        # only show public comments for other users
        queryset = queryset.filter(is_anonymous=False)

    serializer = CommentSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

