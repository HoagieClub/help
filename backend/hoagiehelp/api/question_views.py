from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from hoagiehelp.models.question import Question
from django.db.models import Count


class QuestionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Question
		fields = [
			"id",
			"user",
			"title",
			"tags",
			"course",
			"details",
			"create_time",
			"last_updated_time",
			"hearts",
			"view",
			"user_is_anonymous",
			"answer_count",
		]
		# The author is always the authenticated user, never client-supplied
		read_only_fields = ["user", "answer_count"]
		extra_kwargs = {"tags": {"required": False, "allow_empty": True}}
		answer_count = serializers.IntegerField(read_only=True)

	def get_answer_count(self, obj):
		if hasattr(obj, "answer_count"):
			return obj.answer_count
		return obj.answer_set.count()


class QuestionListView(APIView):
	"""Handle collection operations for questions."""

	def get(self, request) -> Response:
		"""List all questions, filtered by title and tags."""
		queryset = Question.objects.all()

		# Filter queries by following parameters
		title_string = request.query_params.get("title")
		tags_list = request.query_params.getlist("tags")
		queryset = queryset.annotate(answer_count=Count("answer", distinct=True))

		if title_string:
			queryset = queryset.filter(title__icontains=title_string)
		if tags_list:
			queryset = queryset.filter(tags__name__in=tags_list).distinct()

		serializer = QuestionSerializer(queryset, many=True)
		return Response(serializer.data)

	def post(self, request) -> Response:
		"""Create a new question."""
		serializer = QuestionSerializer(data=request.data)

		# field checks and validation
		if serializer.is_valid():
			question = serializer.save(user=request.user)

			question = Question.objects.annotate(answer_count=Count("answer", distinct=True)).get(id=question.id)

			return Response(QuestionSerializer(question).data, status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionDetailView(APIView):
	"""Handle individual question operations."""

	def get(self, request, question_id: str) -> Response:
		"""Get all details associated with a given question."""
		try:
			question = Question.objects.annotate(answer_count=Count("answer", distinct=True)).get(id=question_id)
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
			question = serializer.save()

			question = Question.objects.annotate(answer_count=Count("answer", distinct=True)).get(id=question.id)

			return Response(QuestionSerializer(question).data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, question_id: str) -> Response:
		"""Delete an existing question."""
		try:
			question = Question.objects.get(id=question_id)
		except Question.DoesNotExist:
			return Response({"detail": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
		question.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
