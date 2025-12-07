from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base
import uuid

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    items = Column(JSON, nullable=False)  # Store order items as JSON
    subtotal = Column(Float, nullable=False)
    discount = Column(Float, default=0.0)
    total = Column(Float, nullable=False)
    coupon_code = Column(String, nullable=True)
    status = Column(String, default="pending")  # pending, confirmed, shipped, delivered, cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", backref="orders")

    def __repr__(self):
        return f"<Order(id={self.id}, user_id={self.user_id}, total={self.total})>"

