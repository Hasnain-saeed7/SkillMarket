from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional


# ----- User -----
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "seller"


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True


# ----- Auth -----
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class LoginRequest(BaseModel):
    email: EmailStr
    password: str




class GigCreate(BaseModel):
    title: str
    price: float
    seller: str
    category: str
    image_url: Optional[str] = None
    seller_id: Optional[int] = None  # Set by backend from current user; do not send from client

class GigUpdate(BaseModel):
    title: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None


class GigOut(BaseModel):
    id: int
    title: str
    price: float
    seller: str
    category: str
    image_url: Optional[str] = None
    seller_id: Optional[int] = None

    class Config:
        from_attributes = True


# ----- Message -----
class MessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class MessageOut(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str 
    created_at: datetime
  

    class Config:
        from_attributes = True
