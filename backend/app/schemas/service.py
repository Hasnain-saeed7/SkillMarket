from decimal import Decimal
from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import UserOut


class ServiceImageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    image_url: str  # full URL in responses


class ServiceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    price: Decimal
    category: str
    created_at: str | None = None
    seller: UserOut
    images: list[ServiceImageOut]


class ServiceListOut(BaseModel):
    """Smaller payload for listing."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    price: Decimal
    category: str
    seller: UserOut
    images: list[ServiceImageOut]

