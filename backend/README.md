# Hoagie Help Backend

This is the backend directory for Hoagie Help.

## Running the tests

Tests live in `hoagiehelp/tests/`, one file per area (for example `test_question_views.py`).
`test_question_views.py` is the worked example: copy its setup when you add a new file.

Run them against a throwaway local SQLite database, so the test runner never creates a
test database on the shared Neon server:

```bash
cd backend
DATABASE_URL=sqlite:///test.sqlite3 uv run python manage.py test hoagiehelp --noinput
```

Run one file by adding its name, for example `hoagiehelp.tests.test_question_views`.
Then run `uv run ruff check` and `uv run ruff format`.
