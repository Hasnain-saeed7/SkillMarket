from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
import schemas
import crud

router = APIRouter(prefix="/messages", tags=["messages"])


@router.post("", response_model=schemas.MessageOut, status_code=status.HTTP_201_CREATED)
def create_message(message: schemas.MessageCreate, db: Session = Depends(get_db)):
    """Store contact form message in database"""
    try:
        db_message = crud.create_message(db, message)
        print(f"Message saved: ID={db_message.id}, From={db_message.email}, Subject={db_message.subject}")
        return db_message
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save message: {str(e)}",
        )


@router.get("", response_model=list[schemas.MessageOut])
def list_messages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all messages (admin endpoint)"""
    return crud.get_messages(db, skip=skip, limit=limit)


@router.get("/{message_id}", response_model=schemas.MessageOut)
def get_message(message_id: int, db: Session = Depends(get_db)):
    """Get a specific message by ID"""
    message = crud.get_message_by_id(db, message_id)
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found",
        )
    return message
