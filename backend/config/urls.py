"""
URL configuration for hoagiehelp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from api.answer_view import AnswerView, CreateAnswerView
from api.comment_view import CommentView, CreateCommentView
from api.question_list_view import QuestionListView
from api.question_view import QuestionView
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path("admin/", admin.site.urls),
    # Question
    path("question/", QuestionListView.as_view(), name="question-list"),
    path("question/<str:question_id>/", QuestionView.as_view(), name="question"),
    # Answer
    path(
        "question/<str:question_id>/answer/",
        CreateAnswerView.as_view(),
        name="create-answer",
    ),
    path("answer/<str:answer_id>/", AnswerView.as_view(), name="answer"),
    # Comment
    path(
        "answer/<str:answer_id>/comment/",
        CreateCommentView.as_view(),
        name="create-comment",
    ),
    path("comment/<str:comment_id>/", CommentView.as_view(), name="comment"),
]
