from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


class AnswerSerializer(serializers.ModelSerializer):
    pass


class AnswerView(APIView):
    def get(self, request, answer_id: str) -> Response:
        """Get all details associated with a given answer. This includes info on comments."""
        pass

    def put(self, request, answer_id: str) -> Response:
        """Update an existing answer."""
        pass

    def delete(self, request, answer_id: str) -> Response:
        """Delete an existing answer."""
        pass

class CreateAnswerView(APIView):
    def post(self, request, question_id: str) -> Response:
        """Create a new answer associated with a given question."""
        pass