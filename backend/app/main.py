import os
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

# Note: Ensure these paths match your project structure
from app.core.config import CORS_ORIGINS
from app.core.logging import setup_logging
from app.db.session import engine
import models
from models import Base, User, Gig, Message  # noqa: F401

# 1. Initialize Logging
setup_logging()

# 2. Create Database Tables
Base.metadata.create_all(bind=engine) 

app = FastAPI(title="SkillMarket API", version="2.0.0")

# 3. CORS MIDDLEWARE 
# Updated to ensure Vercel can communicate with Render without 400 errors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://skillmarket-chi.vercel.app/"], # For production, you can replace "*" with your specific Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Global Exception Handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400, 
        content={"detail": exc.errors()}
    )

# 5. Static Files Setup
# User uploads are now handled by Cloudinary, so we only use this for 
# permanent system assets (like logos) stored in a 'static' folder.
STATIC_DIR = "static"
Path(STATIC_DIR).mkdir(parents=True, exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# 6. Include Routers
app.include_router(auth_routes.router, tags=["Authentication"])
app.include_router(gig_routes.router, tags=["Gigs"])
app.include_router(message_routes.router, tags=["Messages"])

# 7. Health Check & Root Routes
@app.get("/")
def read_root():
    return {"message": "SkillMarket API is live!", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok"}