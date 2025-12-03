from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from hoagiehelp.models.answer import Answer
from hoagiehelp.models.question import Question


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = (
            "id",
            "question_id",
            "user",
            "text",
            "heart",
            "create_time",
            "last_update_time",
            "is_anonymous",
        )


class AnswerListView(APIView):
    """Handle collection operations for answers under a question."""

    def get(self, request, question_id: str) -> Response:
        """List all answers for a given question."""
        question = get_object_or_404(Question, pk=question_id)

        queryset = Answer.objects.filter(question=question).order_by("-created_at")

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
        try:
            answer = Answer.objects.get(id=answer_id)
        except Answer.DoesNotExist:
            return Response(
                {"detail": "Answer not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = AnswerSerializer(answer)
        return Response(serializer.data)

    def put(self, request, answer_id: str) -> Response:
        """Update an existing answer."""
        try:
            answer = Answer.objects.get(id=answer_id)
        except Answer.DoesNotExist:
            return Response(
                {"detail": "Answer not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = AnswerSerializer(answer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, answer_id: str) -> Response:
        """Delete an existing answer."""
        try:
            answer = Answer.objects.get(id=answer_id)
        except Answer.DoesNotExist:
            return Response(
                {"detail": "Answer not found"}, status=status.HTTP_404_NOT_FOUND
            )
        answer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
