import enum
from sqlalchemy import Column, DateTime, Integer, String, func
from sqlalchemy.orm import relationship

from app.models.base import Base


class UserRole(str, enum.Enum):
    buyer = "buyer"
    seller = "seller"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # stored as "buyer" / "seller"
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    services = relationship("Service", back_populates="seller", cascade="all, delete-orphan")
    sent_messages = relationship("Message", foreign_keys="Message.buyer_id", back_populates="buyer")
    received_messages = relationship("Message", foreign_keys="Message.seller_id", back_populates="seller")

