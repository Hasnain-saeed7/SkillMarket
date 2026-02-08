"""
Entrypoint for running the backend with:

    cd backend
    uvicorn main:app --reload

We keep this file thin and delegate to `app.main` (clean architecture).
"""

from app.main import app  # noqa: F401
