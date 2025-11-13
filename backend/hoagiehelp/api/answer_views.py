from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from hoagiehelp.models import Answer, Question
from hoagiehelp.serializers import AnswerSerializer


class AnswerListView(APIView):
    """Handle collection operations for answers under a question."""

    def get(self, request, question_id: str) -> Response:
        """List all answers for a given question."""
        question = get_object_or_404(Question, pk=question_id)

        queryset = Answer.objects.filter(question=question).order_by('-created_at')

        serializer = AnswerSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, question_id: str) -> Response:
        """Create a new answer associated with a given question."""

        question = get_object_or_404(Question, pk=question_id)

        data = request.data.copy()
        data["question"] = question.id

        serializer = AnswerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswerDetailView(APIView):
    """Handle individual answer operations."""

    def get(self, request, answer_id: str) -> Response:
        """Get all details associated with a given answer."""
        pass

    def put(self, request, answer_id: str) -> Response:
        """Update an existing answer."""
        pass

    def delete(self, request, answer_id: str) -> Response:
        """Delete an existing answer."""
        pass