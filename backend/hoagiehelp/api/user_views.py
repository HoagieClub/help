from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.views import APIView

from hoagiehelp.models.user import CustomUser
from hoagiehelp.models.question import Question
from backend.hoagiehelp.api.question_views import QuestionSerializer

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


def user_comments(request, user_id: str):
    pass
