from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


class AnswerSerializer(serializers.ModelSerializer):
    pass


class AnswerView(APIView):
    def put(self, request, answer_id: str) -> Response:
        """Update an existing answer."""
        pass

    def post(self, request, answer_id: str) -> Response:
        """Create a new answer."""
        pass

    def delete(self, request, answer_id: str) -> Response:
        """Delete an existing answer."""
        pass
