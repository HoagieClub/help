"""Tests for the question endpoints: the worked example to copy for new tests.

Run every test:      cd backend && uv run python manage.py test hoagiehelp
Run only this file:  cd backend && uv run python manage.py test hoagiehelp.tests.test_question_views

How a test works:
1. setUp runs before every test and creates fresh data. Each test starts from an
   empty test database, so tests never depend on each other.
2. The test sends a request with self.client, like the frontend would.
3. The test checks the response with self.assertEqual and similar methods.

These tests describe how the endpoints behave today. When a rule changes (for
example, only the author may edit a question), the task that changes it also
updates the matching test here.
"""

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from hoagiehelp.models import CustomUser
from hoagiehelp.models.question import Question


class QuestionViewsTests(APITestCase):
	def setUp(self):
		# Two users, so tests can tell "my question" apart from someone else's.
		self.alice = CustomUser.objects.create_user(
			username="alice",
			net_id="alice",
			class_year=2028,
			first_name="Alice",
			last_name="Lee",
		)
		self.bob = CustomUser.objects.create_user(
			username="bob",
			net_id="bob",
			class_year=2027,
			first_name="Bob",
			last_name="Kim",
		)

		# force_authenticate signs the test client in as Alice without Auth0,
		# so no token is needed. Switch users by calling it again with another user.
		self.client.force_authenticate(user=self.alice)

		# One existing question by Alice, used by the detail, edit and delete tests.
		self.question = Question.objects.create(
			user=self.alice,
			title="Best way to study for COS 226?",
			details="My midterm is in two weeks.",
			course="COS 226",
		)

		# reverse() builds a URL from its name in config/urls.py, so tests keep
		# working if a path changes.
		self.list_url = reverse("question-list")
		self.detail_url = reverse("question-detail", args=[self.question.id])

	def test_list_returns_questions(self):
		response = self.client.get(self.list_url)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), 1)
		self.assertEqual(response.data[0]["title"], "Best way to study for COS 226?")
		# The list counts answers in the query; this question has none.
		self.assertEqual(response.data[0]["answer_count"], 0)

	def test_list_needs_login(self):
		# Sign out: a visitor is refused.
		self.client.force_authenticate(user=None)

		response = self.client.get(self.list_url)

		# Today this is 403, not 401: Auth0JWTAuthentication (hoagiehelp/auth/auth.py)
		# has no authenticate_header method, so Django REST Framework answers 403.
		# If that method is added, change this to HTTP_401_UNAUTHORIZED.
		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

	def test_create_question(self):
		payload = {
			"title": "Is ORF 245 curved?",
			"details": "Wondering before I add it.",
			"course": "ORF 245",
			"user_is_anonymous": False,
		}

		response = self.client.post(self.list_url, payload, format="json")

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		# The new question is saved, and its author is the signed-in user,
		# never a user the client sends.
		created = Question.objects.get(id=response.data["id"])
		self.assertEqual(created.title, "Is ORF 245 curved?")
		self.assertEqual(created.user, self.alice)

	def test_create_question_without_title_fails(self):
		response = self.client.post(self.list_url, {"details": "No title here."}, format="json")

		# A missing required field returns 400 with the field's error.
		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertIn("title", response.data)

	def test_get_one_question(self):
		response = self.client.get(self.detail_url)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data["id"], self.question.id)

	def test_edit_own_question(self):
		payload = {
			"title": "Best way to study for COS 226 finals?",
			"details": "Updated details.",
			"course": "COS 226",
		}

		response = self.client.put(self.detail_url, payload, format="json")

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		# refresh_from_db reloads the row, so we check what was really saved.
		self.question.refresh_from_db()
		self.assertEqual(self.question.title, "Best way to study for COS 226 finals?")

	def test_delete_own_question(self):
		response = self.client.delete(self.detail_url)

		self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
		self.assertFalse(Question.objects.filter(id=self.question.id).exists())

	def test_missing_question_returns_404(self):
		missing_url = reverse("question-detail", args=[999999])

		response = self.client.get(missing_url)

		self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
