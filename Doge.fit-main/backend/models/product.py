from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base
import uuid

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    sale_price = Column(Float, nullable=True)
    image_url = Column(String, nullable=True)
    category = Column(String, nullable=True)
    is_featured = Column(Boolean, default=False)
    description = Column(String, nullable=True)
    stock = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Product(id={self.id}, name={self.name})>"

