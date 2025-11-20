from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from hoagiehelp.models.question import Question


class QuestionSerializer(serializers.ModelSerializer):
    pass


class QuestionListView(APIView):
    """Handle collection operations for questions."""

    def get(self, request) -> Response:
        """List all questions."""
        try:
            queryset = Question.objects.all()

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = QuestionSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request) -> Response:
        """Create a new question."""
        serializer = QuestionSerializer(data=request.data)
        
        # field checks and validation
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionDetailView(APIView):
    """Handle individual question operations."""

    def get(self, request, question_id: str) -> Response:
        """Get all details associated with a given question."""
        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response({"detail": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def put(self, request, question_id: str) -> Response:
        """Update an existing question."""
        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response({"detail": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


    def delete(self, request, question_id: str) -> Response:
        """Delete an existing question."""
        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response({"detail":"Question not found"}, status=status.HTTP_404_NOT_FOUND)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
