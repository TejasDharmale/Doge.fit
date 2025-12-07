from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from controllers.product_controller import get_products, get_product
from schemas.product import ProductResponse

router = APIRouter(prefix="/api", tags=["products"])

@router.get("/products", response_model=List[ProductResponse])
def list_products(
    category: Optional[str] = Query(None, description="Filter by category"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    products = get_products(db, category=category, skip=skip, limit=limit)
    return products

@router.get("/products/{product_id}", response_model=ProductResponse)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

