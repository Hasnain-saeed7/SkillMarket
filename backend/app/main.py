import os
from pathlib import Path 
from database import Base, engine

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.core.config import CORS_ORIGINS, UPLOAD_DIR
from app.core.logging import setup_logging
from app.db.session import engine
from app.models import Base 
# Fixed imports to match your file names in the 'routes' folder
from routes import auth_routes, gig_routes, message_routes

setup_logging()

Base.metadata.create_all(bind=engine) 

app = FastAPI(title="SkillMarket API", version="2.0.0")

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=400, content={"detail": exc.errors()})

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://skill-market-theta.vercel.app",
        "https://skill-market-1kyjhhre4-hasnain-saeed7s-projects.vercel.app",
        "http://localhost:5173",
    "],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
)

# Static uploads
Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# FIX: Use the names you actually imported above
app.include_router(auth_routes.router)
app.include_router(gig_routes.router)     # This handles your "Launch Service" (/gigs)
app.include_router(message_routes.router) # This handles your contact form (/messages)

@app.get("/health")
def health():
    return {"status": "ok"} 

@app.on_event("startup")
async def startup():
     Base.metadata.create_all(bind=engine)
