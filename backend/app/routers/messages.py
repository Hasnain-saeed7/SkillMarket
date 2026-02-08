import logging

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import require_role
from app.models import User
from app.schemas.message import MessageCreate, MessageOut
from app.services.message_service import send_message


logger = logging.getLogger("skillmarket.routers.messages")
router = APIRouter(prefix="/messages", tags=["messages"])


@router.post("", response_model=MessageOut, status_code=status.HTTP_201_CREATED)
def create_message(
    payload: MessageCreate,
    current_user: User = Depends(require_role("buyer")),
    db: Session = Depends(get_db),
):
    msg = send_message(db, buyer=current_user, service_id=payload.service_id, message_text=payload.message_text)
    return MessageOut(
        id=msg.id,
        message_text=msg.message_text,
        created_at=msg.created_at.isoformat() if msg.created_at else None,
        buyer=msg.buyer,
        service_id=msg.service_id,
        seller_id=msg.seller_id,
    )

