from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token
from app.db.session import get_db
from app.schemas.auth import LoginRequest, TokenResponse
from app.schemas.user import UserCreate, UserOut
from app.services.user_service import authenticate, register_user


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    user = register_user(
        db,
        name=payload.name,
        email=payload.email,
        password=payload.password,
        role=payload.role,
    )
    token = create_access_token(user_id=user.id, role=user.role)
    return TokenResponse(
        access_token=token,
        user_id=user.id,
        role=user.role,
        user=UserOut.model_validate(user),
    )


# Backwards-compatible alias for older frontend clients
@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: UserCreate, db: Session = Depends(get_db)):
    return register(payload, db)


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate(db, email=payload.email, password=payload.password)
    token = create_access_token(user_id=user.id, role=user.role)
    return TokenResponse(
        access_token=token,
        user_id=user.id,
        role=user.role,
        user=UserOut.model_validate(user),
    )

