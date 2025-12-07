from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional
from database import get_db
from controllers.coupon_controller import verify_coupon
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["coupons"])

class CouponRequest(BaseModel):
    code: str

class CouponResponse(BaseModel):
    valid: bool
    discount_percentage: Optional[int] = None
    message: str

@router.post("/verify-coupon", response_model=CouponResponse)
def verify_coupon_code(coupon: CouponRequest, db: Session = Depends(get_db)):
    result = verify_coupon(db, coupon.code)
    return result

