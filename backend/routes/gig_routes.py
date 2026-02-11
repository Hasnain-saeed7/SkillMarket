import os
import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, Depends, File, HTTPException, status, UploadFile
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
import schemas
import crud

router = APIRouter(prefix="/gigs", tags=["gigs"])

# --- CLOUDINARY CONFIGURATION ---
# These should be set in your Render/Railway Environment Variables
cloudinary.config( 
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"), 
    api_key = os.getenv("CLOUDINARY_API_KEY"), 
    api_secret = os.getenv("CLOUDINARY_API_SECRET"),
    secure = True
)

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_IMAGE_BYTES = 5 * 1024 * 1024  # 5MB

def require_user(user: dict | None = Depends(get_current_user)):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You must be logged in to post a new gig",
        )
    return user


@router.post("/upload-image")
async def upload_gig_image(
    file: UploadFile = File(...),
    current_user: dict = Depends(require_user),
):
    """Uploads image to Cloudinary and returns a permanent HTTPS URL."""
    # 1. Validate File Type
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only JPEG, PNG and WebP images are allowed",
        )

    try:
        # 2. Upload directly to Cloudinary using the file stream
        upload_result = cloudinary.uploader.upload(
            file.file, 
            folder="skillmarket/gigs"
        )
        
        # 3. Get the permanent URL
        permanent_url = upload_result.get("secure_url")
        
        return {"url": permanent_url}

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
    # 1. Fetch the gig from the database
    gig = crud.get_gig_by_id(db, gig_id)
    if not gig:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Gig not found"
        )
    
    # 2. Check if the current user ID matches the seller ID
    if gig.seller_id != current_user.get("user_id"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="You are not authorized to delete this gig"
        )

    # 3. Proceed with deletion
    if not crud.delete_gig(db, gig_id):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Failed to delete gig"
        )
    
    return None


@router.get("/{gig_id}", response_model=schemas.GigOut)
def get_gig(gig_id: int, db: Session = Depends(get_db)):
    gig = crud.get_gig_by_id(db, gig_id)
    if not gig:
        raise HTTPException(status_code=404, detail="Gig not found")
    return gig 



# ... (Keep your existing GET /{id}, PUT, and DELETE routes)