from sqlalchemy.orm import Session
from typing import List, Optional, Dict
from models.order import Order
from models.product import Product
from models.coupon import Coupon
from schemas.order import CheckoutRequest
from datetime import datetime

def calculate_order_total(items: List[Dict], coupon_code: Optional[str], db: Session) -> Dict:
    """Calculate order total including discounts"""
    subtotal = 0
    discount = 0
    
    for item in items:
        product = db.query(Product).filter(Product.id == item["id"]).first()
        if not product:
            raise ValueError(f"Product {item['id']} not found")
        
        price = product.sale_price or product.price
        subtotal += price * item["quantity"]
    
    # Apply coupon if provided
    if coupon_code:
        coupon = db.query(Coupon).filter(Coupon.code == coupon_code.upper()).first()
        if coupon and coupon.active:
            if coupon.expires_at and coupon.expires_at < datetime.utcnow():
                pass  # Coupon expired
            elif coupon.max_uses and coupon.used_count >= coupon.max_uses:
                pass  # Coupon max uses reached
            else:
                discount = subtotal * (coupon.discount_percentage / 100)
    
    final_total = subtotal - discount
    
    return {
        "subtotal": subtotal,
        "discount": discount,
        "final_total": final_total
    }

def create_order(db: Session, user_id: str, checkout_data: CheckoutRequest) -> Order:
    """Create a new order"""
    items_dict = [{"id": item.id, "quantity": item.quantity} for item in checkout_data.items]
    totals = calculate_order_total(items_dict, checkout_data.coupon_code, db)
    
    # Update coupon usage if applicable
    if checkout_data.coupon_code:
        coupon = db.query(Coupon).filter(Coupon.code == checkout_data.coupon_code.upper()).first()
        if coupon:
            coupon.used_count += 1
            db.commit()
    
    db_order = Order(
        user_id=user_id,
        items=items_dict,
        subtotal=totals["subtotal"],
        discount=totals["discount"],
        total=totals["final_total"],
        coupon_code=checkout_data.coupon_code,
        status="pending"
    )
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_user_orders(db: Session, user_id: str) -> List[Order]:
    """Get all orders for a user"""
    return db.query(Order).filter(Order.user_id == user_id).order_by(Order.created_at.desc()).all()

def get_order(db: Session, order_id: str) -> Optional[Order]:
    """Get order by ID"""
    return db.query(Order).filter(Order.id == order_id).first()

