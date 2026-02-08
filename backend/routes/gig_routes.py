import os
import uuid
from fastapi import APIRouter, Depends, File, HTTPException, status, UploadFile
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
import schemas
import crud

router = APIRouter(prefix="/gigs", tags=["gigs"])

# Upload directory (must match static mount path)
UPLOAD_DIR = os.path.abspath(os.getenv("UPLOAD_DIR", "uploads"))
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_IMAGE_BYTES = 5 * 1024 * 1024  # 5MB


def require_user(user: dict | None = Depends(get_current_user)):
    """Require a logged-in user; raise 401 if not authenticated."""
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You must be logged in to post a new gig",
        )
    return user


@router.get("", response_model=list[schemas.GigOut])
def list_gigs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    gigs = crud.get_gigs(db, skip=skip, limit=limit)
    return gigs


@router.get("/{gig_id}", response_model=schemas.GigOut)
def get_gig(gig_id: int, db: Session = Depends(get_db)):
    gig = crud.get_gig_by_id(db, gig_id)
    if not gig:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gig not found",
        )
    return gig


@router.post("/upload-image")
async def upload_gig_image(
    file: UploadFile = File(...),
    current_user: dict = Depends(require_user),
):
    """Upload an image from gallery; returns URL to use as gig image_url."""
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only JPEG, PNG and WebP images are allowed",
        )
    ext = "jpg" if file.content_type == "image/jpeg" else file.content_type.split("/")[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    path = os.path.join(UPLOAD_DIR, filename)
    size = 0
    try:
        with open(path, "wb") as out:
            while True:
                chunk = await file.read(1024 * 1024)
                if not chunk:
                    break
                size += len(chunk)
                if size > MAX_IMAGE_BYTES:
                    if os.path.exists(path):
                        os.remove(path)
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Image too large (max 5MB)",
                    )
                out.write(chunk)
    finally:
        await file.close()
    return {"url": f"/uploads/{filename}"}


@router.post("", response_model=schemas.GigOut, status_code=status.HTTP_201_CREATED)
def create_gig(
    gig: schemas.GigCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_user),
):
    """Only logged-in users can post a new gig."""
    try:
        seller_id = current_user.get("user_id")
        return crud.create_gig(db, gig, seller_id=seller_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(e) or "Validation error",
        )


@router.put("/{gig_id}", response_model=schemas.GigOut)
def update_gig(gig_id: int, gig: schemas.GigUpdate, db: Session = Depends(get_db)):
    updated = crud.update_gig(db, gig_id, gig)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gig not found",
        )
    return updated


@router.delete("/{gig_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gig(
    gig_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_user),
):
    """Only the gig owner (logged-in user who created it) can delete."""
    gig = crud.get_gig_by_id(db, gig_id)
    if not gig:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gig not found",
        )
    if gig.seller_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This gig cannot be deleted (no owner).",
        )
    if gig.seller_id != current_user.get("user_id"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own products.",
        )
    if not crud.delete_gig(db, gig_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gig not found",
        )
