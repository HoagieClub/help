from django.db import transaction
from django.db.models import F
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from hoagiehelp.models.answer import Answer
from hoagiehelp.models.comment import Comment
from hoagiehelp.models.heart import Heart
from hoagiehelp.models.question import Question


def _toggle_heart(request, model_class, obj_id: int, heart_field: str) -> Response:
	# Lock the post to prevent race conditions
	obj = get_object_or_404(model_class.objects.select_for_update(), id=obj_id)

	# Find the heart associated with the post and user, and delete it if it exists
	deleted, _ = Heart.objects.filter(**{heart_field: obj, "user": request.user}).delete()

	# Decrement heart count
	if deleted:
		model_class.objects.filter(id=obj_id).update(hearts=F("hearts") - 1)
		obj.refresh_from_db(fields=["hearts"])
		return Response(
			{"hearts": obj.hearts, "is_hearted": False},
			status=status.HTTP_200_OK,
		)

	# Otherwise, create a new heart and increment heart count
	Heart.objects.create(**{heart_field: obj, "user": request.user})
	model_class.objects.filter(id=obj_id).update(hearts=F("hearts") + 1)
	obj.refresh_from_db(fields=["hearts"])
	return Response(
		{"hearts": obj.hearts, "is_hearted": True},
		status=status.HTTP_200_OK,
	)


@api_view(["POST"])
@transaction.atomic
def heart_question(request, question_id: int):
	return _toggle_heart(request, Question, question_id, "question")


@api_view(["POST"])
@transaction.atomic
def heart_answer(request, answer_id: int):
	return _toggle_heart(request, Answer, answer_id, "answer")


@api_view(["POST"])
@transaction.atomic
def heart_comment(request, comment_id: int):
	return _toggle_heart(request, Comment, comment_id, "comment")
