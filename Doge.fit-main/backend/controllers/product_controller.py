from sqlalchemy.orm import Session
from typing import List, Optional
from models.product import Product
from schemas.product import ProductCreate

def get_products(db: Session, category: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[Product]:
    """Get all products, optionally filtered by category"""
    query = db.query(Product)
    if category:
        query = query.filter(Product.category == category)
    return query.offset(skip).limit(limit).all()

def get_product(db: Session, product_id: int) -> Optional[Product]:
    """Get product by ID"""
    return db.query(Product).filter(Product.id == product_id).first()

def create_product(db: Session, product_data: ProductCreate) -> Product:
    """Create a new product"""
    db_product = Product(**product_data.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_featured_products(db: Session) -> List[Product]:
    """Get featured products"""
    return db.query(Product).filter(Product.is_featured == True).all()

