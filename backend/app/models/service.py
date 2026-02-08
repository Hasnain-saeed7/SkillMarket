from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.orm import relationship

from app.models.base import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    category = Column(String, nullable=False)
    seller_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    seller = relationship("User", back_populates="services")
    images = relationship("ServiceImage", back_populates="service", cascade="all, delete-orphan")
    messages = relationship("Message", back_populates="service", cascade="all, delete-orphan")


class ServiceImage(Base):
    __tablename__ = "service_images"

    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("services.id", ondelete="CASCADE"), nullable=False, index=True)
    image_url = Column(String, nullable=False)  # stored as relative path: uploads/services/<file>

    service = relationship("Service", back_populates="images")

