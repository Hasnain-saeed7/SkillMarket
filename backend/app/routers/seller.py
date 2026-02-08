from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import require_role
from app.models import User
from app.schemas.message import MessageOut
from app.services.message_service import seller_inbox
from app.schemas.service import ServiceImageOut, ServiceListOut
from app.services.service_service import list_seller_services


router = APIRouter(prefix="/seller", tags=["seller"])


@router.get("/messages", response_model=list[MessageOut])
def inbox(current_user: User = Depends(require_role("seller")), db: Session = Depends(get_db)):
    msgs = seller_inbox(db, seller_id=current_user.id)
    # include buyer info + service_id
    return [
        MessageOut(
            id=m.id,
            message_text=m.message_text,
            created_at=m.created_at.isoformat() if m.created_at else None,
            buyer=m.buyer,
            service_id=m.service_id,
            seller_id=m.seller_id,
        )
        for m in msgs
    ]


def _full_url(request: Request, rel_path: str) -> str:
    rel = rel_path.replace("\\", "/")
    return str(request.base_url).rstrip("/") + "/" + rel


@router.get("/services", response_model=list[ServiceListOut])
def my_services(request: Request, current_user: User = Depends(require_role("seller")), db: Session = Depends(get_db)):
    services = list_seller_services(db, seller_id=current_user.id)
    result: list[ServiceListOut] = []
    for s in services:
        result.append(
            ServiceListOut(
                id=s.id,
                title=s.title,
                price=s.price,
                category=s.category,
                seller=s.seller,
                images=[ServiceImageOut(id=img.id, image_url=_full_url(request, img.image_url)) for img in s.images],
            )
        )
    return result

