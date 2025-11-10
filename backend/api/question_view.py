from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


class QuestionSerializer(serializers.ModelSerializer):
    pass


class QuestionView(APIView):
    def get(self, request, question_id: str) -> Response:
        """Get all details associated with a given question. This includes info on answers and comments."""
        pass

    def put(self, request, question_id: str) -> Response:
        """Update an existing question."""
        pass

    def post(self, request, question_id: str) -> Response:
        """Create a new answer associated with a given question."""
        pass

    def delete(self, request, question_id: str) -> Response:
        """Delete an existing question."""
        pass
