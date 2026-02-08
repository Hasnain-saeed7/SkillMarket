import logging

from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.models import Message, Service, User


logger = logging.getLogger("skillmarket.messages")


def send_message(db: Session, *, buyer: User, service_id: int, message_text: str) -> Message:
    # Validate service exists
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

    # Validate seller exists (FK safety)
    seller = db.query(User).filter(User.id == service.seller_id).first()
    if not seller:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Seller not found")

    msg = Message(
        buyer_id=buyer.id,
        seller_id=seller.id,
        service_id=service.id,
        message_text=message_text,
    )

    db.add(msg)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        logger.exception("Failed to send message")
        # 500 only for unexpected errors
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to send message") from e

    db.refresh(msg)
    return (
        db.query(Message)
        .options(joinedload(Message.buyer))
        .filter(Message.id == msg.id)
        .first()
    )


def seller_inbox(db: Session, *, seller_id: int) -> list[Message]:
    return (
        db.query(Message)
        .options(joinedload(Message.buyer), joinedload(Message.service))
        .filter(Message.seller_id == seller_id)
        .order_by(Message.id.desc())
        .all()
    )

