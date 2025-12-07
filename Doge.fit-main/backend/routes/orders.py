from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from controllers.order_controller import create_order, get_user_orders, calculate_order_total
from schemas.order import CheckoutRequest, CheckoutResponse
from .auth import get_current_user

router = APIRouter(prefix="/api", tags=["orders"])

@router.post("/checkout", response_model=CheckoutResponse)
async def checkout(
    checkout_request: CheckoutRequest,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        items_dict = [{"id": item.id, "quantity": item.quantity} for item in checkout_request.items]
        totals = calculate_order_total(items_dict, checkout_request.coupon_code, db)
        
        # Create order
        order = create_order(db, current_user.id, checkout_request)
        
        return {
            "order_id": order.id,
            "subtotal": totals["subtotal"],
            "discount": totals["discount"],
            "final_total": totals["final_total"]
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

