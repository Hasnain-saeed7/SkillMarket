import os
import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, Depends, File, HTTPException, status, UploadFile
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from auth import get_current_user
import schemas
import crud

router = APIRouter(prefix="/gigs", tags=["gigs"])

# --- CLOUDINARY CONFIGURATION ---
cloudinary.config( 
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"), 
    api_key = os.getenv("CLOUDINARY_API_KEY"), 
    api_secret = os.getenv("CLOUDINARY_API_SECRET"),
    secure = True
)

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}

def require_user(user: dict | None = Depends(get_current_user)):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You must be logged in to manage gigs",
        )
    return user

# --- ROUTES ---

@router.get("", response_model=List[schemas.GigOut])
def list_gigs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Fetches all gigs for the home page."""
    return crud.get_gigs(db, skip=skip, limit=limit)

@router.get("/{gig_id}", response_model=schemas.GigOut)
def get_gig(gig_id: int, db: Session = Depends(get_db)):
    """Fetches details for a single gig."""
    gig = crud.get_gig_by_id(db, gig_id)
    if not gig:
        raise HTTPException(status_code=404, detail="Gig not found")
    return gig

@router.post("/upload-image")
async def upload_gig_image(
    file: UploadFile = File(...),
    current_user: dict = Depends(require_user),
):
    """Uploads image to Cloudinary and returns a permanent HTTPS URL."""
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only JPEG, PNG and WebP images are allowed",
        )

    try:
        upload_result = cloudinary.uploader.upload(file.file, folder="skillmarket/gigs")
        return {"url": upload_result.get("secure_url")}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Cloudinary upload failed: {str(e)}"
        )
    finally:
        await file.close()

@router.post("", response_model=schemas.GigOut, status_code=status.HTTP_201_CREATED)
def create_gig(
    gig: schemas.GigCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_user),
):
    """Creates a new gig linked to the logged-in user."""
    try:
        seller_id = current_user.get("user_id")
        return crud.create_gig(db, gig, seller_id=seller_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(e) or "Validation error",
        )

@router.delete("/{gig_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gig(
    gig_id: int, 
    db: Session = Depends(get_db), 
    current_user: dict = Depends(require_user)
):
    """Only the owner can delete their gig."""
    gig = crud.get_gig_by_id(db, gig_id)
    if not gig:
        raise HTTPException(status_code=404, detail="Gig not found")
    
    if gig.seller_id != current_user.get("user_id"):
        raise HTTPException(status_code=403, detail="Not authorized to delete this gig")

    if not crud.delete_gig(db, gig_id):
        raise HTTPException(status_code=500, detail="Failed to delete gig")
    
    return None