from sqlalchemy.orm import Session
from typing import Optional, Dict
from models.coupon import Coupon
from datetime import datetime

def verify_coupon(db: Session, code: str) -> Dict:
    """Verify if a coupon code is valid"""
    coupon = db.query(Coupon).filter(Coupon.code == code.upper()).first()
    
    if not coupon:
        return {"valid": False, "message": "Invalid coupon code"}
    
    if not coupon.active:
        return {"valid": False, "message": "Coupon is inactive"}
    
    if coupon.expires_at and coupon.expires_at < datetime.utcnow():
        return {"valid": False, "message": "Coupon has expired"}
    
    if coupon.max_uses and coupon.used_count >= coupon.max_uses:
        return {"valid": False, "message": "Coupon usage limit reached"}
    
    return {
        "valid": True,
        "discount_percentage": coupon.discount_percentage,
        "message": "Coupon is valid"
    }

def get_all_coupons(db: Session) -> list:
    """Get all coupons"""
    return db.query(Coupon).all()

