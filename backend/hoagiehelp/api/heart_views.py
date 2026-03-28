from django.db import transaction
from django.db.models import F
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from hoagiehelp.models.answer import Answer
from hoagiehelp.models.comment import Comment
from hoagiehelp.models.heart import Heart
from hoagiehelp.models.question import Question


class HeartView(APIView):
    @transaction.atomic
    def heart_question(self, request, question_id: int):
        question = get_object_or_404(Question, id=question_id)

        # If already hearted, delete the heart record from the db and decrement the hearts count
        heart = Heart.objects.filter(question=question, user=request.user)
        if heart.exists():
            heart.delete()
            Question.objects.filter(id=question_id).update(hearts=F("hearts") - 1)
            updated_hearts = Question.objects.values_list("hearts", flat=True).get(
                id=question_id
            )
            return Response(
                {"hearts": updated_hearts, "is_hearted": False},
                status=status.HTTP_200_OK,
            )

        # otherwise, create a new heart record and increment the hearts count
        else:
            Heart.objects.create(question=question, user=request.user)
            Question.objects.filter(id=question_id).update(hearts=F("hearts") + 1)
            updated_hearts = Question.objects.values_list("hearts", flat=True).get(
                id=question_id
            )
            return Response(
                {"hearts": updated_hearts, "is_hearted": True},
                status=status.HTTP_201_CREATED,
            )

    @transaction.atomic
    def heart_answer(self, request, answer_id: int):
        answer = get_object_or_404(Answer, id=answer_id)

        heart = Heart.objects.filter(answer=answer, user=request.user)
        if heart.exists():
            heart.delete()
            Answer.objects.filter(id=answer_id).update(hearts=F("hearts") - 1)
            updated_hearts = Answer.objects.values_list("hearts", flat=True).get(
                id=answer_id
            )
            return Response(
                {"hearts": updated_hearts, "is_hearted": False},
                status=status.HTTP_200_OK,
            )
        else:
            Heart.objects.create(answer=answer, user=request.user)
            Answer.objects.filter(id=answer_id).update(hearts=F("hearts") + 1)
            updated_hearts = Answer.objects.values_list("hearts", flat=True).get(
                id=answer_id
            )
            return Response(
                {"hearts": updated_hearts, "is_hearted": True},
                status=status.HTTP_201_CREATED,
            )

    @transaction.atomic
    def heart_comment(self, request, comment_id: int):
        comment = get_object_or_404(Comment, id=comment_id)

        heart = Heart.objects.filter(comment=comment, user=request.user)
        if heart.exists():
            heart.delete()
            Comment.objects.filter(id=comment_id).update(hearts=F("hearts") - 1)
            updated_hearts = Comment.objects.values_list("hearts", flat=True).get(
                id=comment_id
            )
            return Response(
                {"hearts": updated_hearts, "is_hearted": False},
                status=status.HTTP_200_OK,
            )
        else:
            Heart.objects.create(comment=comment, user=request.user)
            Comment.objects.filter(id=comment_id).update(hearts=F("hearts") + 1)
            updated_hearts = Comment.objects.values_list("hearts", flat=True).get(
                id=comment_id
            )
            return Response(
                {"hearts": updated_hearts, "is_hearted": True},
                status=status.HTTP_201_CREATED,
            )
