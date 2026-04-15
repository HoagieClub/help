from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from hoagiehelp.api.question_views import QuestionSerializer
from hoagiehelp.api.comment_views import CommentSerializer
from hoagiehelp.models.comment import Comment
from hoagiehelp.models.question import Question
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
    def get(self, request) -> Response:
        """Return the authenticated user's data."""
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request) -> Response:
        """Update first_name, last_name, and username for the authenticated user."""
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_questions_for_user(request, user_id: str):
    target_user = get_object_or_404(CustomUser, id=user_id)
    questions_set = Question.objects.filter(user=target_user)

    if request.user.net_id != target_user.net_id:
        questions_set = questions_set.filter(user_is_anonymous=False)

    questions_set = questions_set.order_by("-created_at")
    serializer = QuestionSerializer(questions_set, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


def user_answers(request, user_id: str):
    pass


def get_comments_for_user(request, user_id: str) -> Response:
    # retrieve all comments a user has posted
    target_user = get_object_or_404(CustomUser, id=user_id)

    queryset = Comment.objects.filter(user=target_user).order_by("-created_at")

    if request.user.net_id != target_user.net_id:
        # only show public comments for other users
        queryset = queryset.filter(is_anonymous=False)

    serializer = CommentSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
