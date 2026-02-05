from django.shortcuts import get_object_or_404
from rest_framework import serializers

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
