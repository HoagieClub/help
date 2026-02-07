from rest_framework import serializers
from rest_framework.views import APIView


class UserSerializer(serializers.ModelSerializer):
    pass


class UserView(APIView):
    pass


def user_questions(request, user_id: str):
    pass


def user_answers(request, user_id: str):
    pass


def user_comments(request, user_id: str):
    pass
