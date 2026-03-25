from django.db import transaction
from django.db.models import F
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from hoagiehelp.models.heart import Heart
from hoagiehelp.models.question import Question
from hoagiehelp.models.answer import Answer
from hoagiehelp.models.comment import Comment
from hoagiehelp.models.user import CustomUser


class HeartView(APIView):

    @transaction.atomic
    def heart_question(self, request, question_id: int):
        net_id = request.user.net_id
        user_obj = get_object_or_404(CustomUser, net_id=net_id)
        question = get_object_or_404(Question, id=question_id)

        if Heart.objects.filter(question=question, user=user_obj).exists():
            return Response({"detail": "User has already hearted this question."}, status=status.HTTP_400_BAD_REQUEST)
        
        Heart.objects.create(question=question, user=user_obj)

        question.hearts = F('hearts') + 1
        question.save()
        question.refresh_from_db()
        return Response({"hearts": question.hearts}, status=status.HTTP_201_CREATED)

    @transaction.atomic
    def heart_answer(self, request, answer_id: int):
        net_id = request.user.net_id
        user_obj = get_object_or_404(CustomUser, net_id=net_id)
        answer = get_object_or_404(Answer, id=answer_id)

        if Heart.objects.filter(answer=answer, user=user_obj).exists():
            return Response({"detail": "User has already hearted this answer."}, status=status.HTTP_400_BAD_REQUEST)
        
        Heart.objects.create(answer=answer, user=user_obj)

        answer.hearts = F('hearts') + 1
        answer.save()
        answer.refresh_from_db()
        return Response({"hearts": answer.hearts}, status=status.HTTP_201_CREATED)

    @transaction.atomic
    def heart_response(self, request, comment_id: int):
        net_id = request.user.net_id
        user_obj = get_object_or_404(CustomUser, net_id=net_id)
        comment = get_object_or_404(Comment, id=comment_id)

        if Heart.objects.filter(comment=comment, user=user_obj).exists():
            return Response({"detail": "User has already hearted this comment."}, status=status.HTTP_400_BAD_REQUEST)

        Heart.objects.create(comment=comment, user=user_obj)

        comment.hearts = F('hearts') + 1
        comment.save()
        comment.refresh_from_db()
        return Response({"hearts": comment.hearts}, status=status.HTTP_201_CREATED)