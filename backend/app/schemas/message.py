from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import UserOut


class MessageCreate(BaseModel):
    service_id: int
    message_text: str = Field(min_length=1, max_length=5000)


class MessageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    message_text: str
    created_at: str | None = None
    buyer: UserOut
    service_id: int
    seller_id: int

