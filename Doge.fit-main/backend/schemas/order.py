from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class CheckoutItem(BaseModel):
    id: int
    quantity: int

class CheckoutRequest(BaseModel):
    items: List[CheckoutItem]
    coupon_code: Optional[str] = None

class CheckoutResponse(BaseModel):
    order_id: str
    subtotal: float
    discount: float
    final_total: float

class OrderResponse(BaseModel):
    id: str
    user_id: str
    subtotal: float
    discount: float
    total: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

