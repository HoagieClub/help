from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


class QuestionListSerializer(serializers.ModelSerializer):
    pass


class QuestionListView(APIView):
    def get(self, request) -> Response:
        """Fetch all questions."""
        pass

    def post(self, request) -> Response:
        """Create a new question."""
        pass
