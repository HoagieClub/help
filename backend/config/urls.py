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

from django.contrib import admin
from django.urls import path
from hoagiehelp.api.answer_views import AnswerDetailView, AnswerListView
from hoagiehelp.api.comment_views import CommentDetailView, CommentListView
from hoagiehelp.api.question_views import QuestionDetailView, QuestionListView
from backend.hoagiehelp.api.study_group_views import StudyGroupDetailView, StudyGroupListView
from hoagiehelp.api.user_views import (
    UserView,
    user_answers,
    user_comments,
    user_questions,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # Questions
    path("questions/", QuestionListView.as_view(), name="question-list"),
    path(
        "questions/<str:question_id>/",
        QuestionDetailView.as_view(),
        name="question-detail",
    ),
    # Answers
    path(
        "questions/<str:question_id>/answers/",
        AnswerListView.as_view(),
        name="answer-list",
    ),
    path("answers/<str:answer_id>/", AnswerDetailView.as_view(), name="answer-detail"),
    # Comments
    path(
        "answers/<str:answer_id>/comments/",
        CommentListView.as_view(),
        name="comment-list",
    ),
    path(
        "comments/<str:comment_id>/", CommentDetailView.as_view(), name="comment-detail"
    ),
    # Study Groups
    path("study-groups/", StudyGroupListView.as_view(), name="studygroup-list"),
    path(
        "study-groups/<str:studygroup_id>/",
        StudyGroupDetailView.as_view(),
        name="studygroup-detail",
    ),
    # Users
    path("users/<str:user_id>/", UserView.as_view(), name="user-detail"),
    path("users/<str:user_id>/questions/", user_questions, name="user-questions"),
    path("users/<str:user_id>/answers/", user_answers, name="user-answers"),
    path("users/<str:user_id>/comments/", user_comments, name="user-comments"),
]
