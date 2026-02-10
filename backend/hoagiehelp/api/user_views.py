from rest_framework import serializers
from rest_framework.views import APIView

from hoagiehelp.models.user import User


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
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


def user_comments(request, user_id: str):
    pass
