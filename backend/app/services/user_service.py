from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password
from app.models import User, UserRole


def register_user(db: Session, *, name: str, email: str, password: str, role: UserRole) -> User:
    user = User(
        name=name,
        email=email,
        hashed_password=hash_password(password),
        role=role.value if hasattr(role, "value") else str(role),
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    db.refresh(user)
    return user


def authenticate(db: Session, *, email: str, password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    return user

