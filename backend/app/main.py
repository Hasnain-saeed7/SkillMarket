import os
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

# Import paths from your project structure
from app.core.config import CORS_ORIGINS
from app.core.logging import setup_logging
from app.db.session import engine
from app.models import Base  # Ensure correct import path for Base
from routes import auth_routes, gig_routes, message_routes

# 1. Initialize Logging
setup_logging()

# 2. Create Database Tables
Base.metadata.create_all(bind=engine) 

app = FastAPI(title="SkillMarket API", version="2.0.0")

# 3. CORS MIDDLEWARE 
# FIXED: Removed trailing slash from Vercel URL and added local dev origins
origins = [
    "https://skillmarket-chi.vercel.app",  # No trailing slash
    "http://localhost:5173",               # Standard Vite local port
    "http://127.0.0.1:5173",               # Alternative local address
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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