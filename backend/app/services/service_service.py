import logging
from pathlib import Path
from typing import Sequence

from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.models import Service, ServiceImage, User


logger = logging.getLogger("skillmarket.services")


def list_services(db: Session) -> Sequence[Service]:
    return (
        db.query(Service)
        .options(joinedload(Service.seller), joinedload(Service.images))
        .order_by(Service.id.desc())
        .all()
    )


def get_service(db: Session, service_id: int) -> Service:
    svc = (
        db.query(Service)
        .options(joinedload(Service.seller), joinedload(Service.images))
        .filter(Service.id == service_id)
        .first()
    )
    if not svc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return svc


def list_seller_services(db: Session, seller_id: int) -> Sequence[Service]:
    return (
        db.query(Service)
        .options(joinedload(Service.seller), joinedload(Service.images))
        .filter(Service.seller_id == seller_id)
        .order_by(Service.id.desc())
        .all()
    )


def create_service(
    db: Session,
    *,
    seller: User,
    title: str,
    description: str,
    price: float,
    category: str,
    image_paths: list[str],
) -> Service:
    svc = Service(
        title=title,
        description=description,
        price=price,
        category=category,
        seller_id=seller.id,
    )
    db.add(svc)
    db.flush()  # get svc.id without committing

    for rel_path in image_paths:
        db.add(ServiceImage(service_id=svc.id, image_url=rel_path))

    db.commit()
    db.refresh(svc)
    return (
        db.query(Service)
        .options(joinedload(Service.seller), joinedload(Service.images))
        .filter(Service.id == svc.id)
        .first()
    )

