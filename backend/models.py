from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, Float, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum

 
created_at = Column(DateTime, default=datetime.utcnow)

class UserRole(str, enum.Enum):
    seller = "seller"
    buyer = "buyer"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default=UserRole.seller.value, nullable=False)


class Gig(Base):
    __tablename__ = "gigs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    seller = Column(String, nullable=False)  # seller name for display
    category = Column(String, nullable=False)
    image_url = Column(String, nullable=True)  # Category-specific or uploaded image URL
    seller_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # owner for delete check


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(String, nullable=True)  # ISO timestamp string
