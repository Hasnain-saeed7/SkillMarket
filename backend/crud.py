from sqlalchemy.orm import Session
import models
import schemas
from auth import get_password_hash


# ----- Users -----
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed = get_password_hash(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed,
        role=user.role or "seller",
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


# ----- Gigs -----
def get_gigs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Gig).offset(skip).limit(limit).all()


def get_gig_by_id(db: Session, gig_id: int):
    return db.query(models.Gig).filter(models.Gig.id == gig_id).first()


def create_gig(db: Session, gig: schemas.GigCreate, seller_id: int | None = None):
    db_gig = models.Gig(
        title=gig.title,
        price=gig.price,
        seller=gig.seller,
        category=gig.category,
        image_url=gig.image_url,
        seller_id=seller_id,
    )
    db.add(db_gig)
    db.commit()
    db.refresh(db_gig)
    return db_gig


def update_gig(db: Session, gig_id: int, gig_update: schemas.GigUpdate):
    db_gig = get_gig_by_id(db, gig_id)
    if not db_gig:
        return None
    data = gig_update.model_dump(exclude_unset=True)
    for k, v in data.items():
        setattr(db_gig, k, v)
    db.commit()
    db.refresh(db_gig)
    return db_gig


def delete_gig(db: Session, gig_id: int) -> bool:
    db_gig = get_gig_by_id(db, gig_id)
    if not db_gig:
        return False
    db.delete(db_gig)
    db.commit()
    return True


# ----- Messages -----
def create_message(db: Session, message: schemas.MessageCreate):
    from datetime import datetime
    db_message = models.Message(
        name=message.name,
        email=message.email,
        subject=message.subject,
        message=message.message,
        created_at=datetime.utcnow().isoformat(),
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


def get_messages(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Message).order_by(models.Message.id.desc()).offset(skip).limit(limit).all()


def get_message_by_id(db: Session, message_id: int):
    return db.query(models.Message).filter(models.Message.id == message_id).first()
