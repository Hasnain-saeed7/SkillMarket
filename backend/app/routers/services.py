import logging
from pathlib import Path
from typing import List

from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, status, UploadFile
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import require_role
from app.models import User
from app.schemas.service import ServiceListOut, ServiceOut, ServiceImageOut
from app.services.service_service import create_service, get_service, list_services
from app.utils.files import ensure_upload_dirs, save_upload_file


logger = logging.getLogger("skillmarket.routers.services")
router = APIRouter(prefix="/services", tags=["services"])


def _full_url(request: Request, rel_path: str) -> str:
    # rel_path: uploads/services/file.jpg  -> /uploads/services/file.jpg
    rel = rel_path.replace("\\", "/")
    if rel.startswith("uploads/"):
        rel = rel.replace("uploads/", "uploads/", 1)
    return str(request.base_url).rstrip("/") + "/" + rel


def _map_images(request: Request, images) -> list[ServiceImageOut]:
    out: list[ServiceImageOut] = []
    for img in images:
        out.append(ServiceImageOut(id=img.id, image_url=_full_url(request, img.image_url)))
    return out


@router.get("", response_model=list[ServiceListOut])
def public_list(request: Request, db: Session = Depends(get_db)):
    services = list_services(db)
    # build full image URLs
    result: list[ServiceListOut] = []
    for s in services:
        result.append(
            ServiceListOut(
                id=s.id,
                title=s.title,
                price=s.price,
                category=s.category,
                seller=s.seller,
                images=_map_images(request, s.images),
            )
        )
    return result


@router.get("/{service_id}", response_model=ServiceOut)
def get_one(service_id: int, request: Request, db: Session = Depends(get_db)):
    s = get_service(db, service_id)
    return ServiceOut(
        id=s.id,
        title=s.title,
        description=s.description,
        price=s.price,
        category=s.category,
        created_at=s.created_at.isoformat() if s.created_at else None,
        seller=s.seller,
        images=_map_images(request, s.images),
    )


@router.post("", response_model=ServiceOut, status_code=status.HTTP_201_CREATED)
async def create(
    request: Request,
    title: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    category: str = Form(...),
    images: List[UploadFile] = File(...),
    current_user: User = Depends(require_role("seller")),
    db: Session = Depends(get_db),
):
    if not images:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="At least one image is required")

    upload_dir = ensure_upload_dirs()
    saved_rel_paths: list[str] = []

    try:
        for f in images:
            rel_path = await save_upload_file(upload_dir, f)
            saved_rel_paths.append(rel_path)

        svc = create_service(
            db,
            seller=current_user,
            title=title,
            description=description,
            price=price,
            category=category,
            image_paths=saved_rel_paths,
        )
    except ValueError as ve:
        # validation errors -> 400
        for rel in saved_rel_paths:
            try:
                Path(rel).unlink(missing_ok=True)
            except Exception:
                pass
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except HTTPException:
        # already mapped
        for rel in saved_rel_paths:
            try:
                Path(rel).unlink(missing_ok=True)
            except Exception:
                pass
        raise
    except Exception as e:
        db.rollback()
        for rel in saved_rel_paths:
            try:
                Path(rel).unlink(missing_ok=True)
            except Exception:
                pass
        logger.exception("Failed to create service")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create service") from e

    return ServiceOut(
        id=svc.id,
        title=svc.title,
        description=svc.description,
        price=svc.price,
        category=svc.category,
        created_at=svc.created_at.isoformat() if svc.created_at else None,
        seller=svc.seller,
        images=_map_images(request, svc.images),
    )


