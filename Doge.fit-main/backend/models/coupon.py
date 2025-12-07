from sqlalchemy import Column, String, Integer, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base

class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String, unique=True, nullable=False, index=True)
    discount_percentage = Column(Integer, nullable=False)
    active = Column(Boolean, default=True)
    max_uses = Column(Integer, nullable=True)  # None means unlimited
    used_count = Column(Integer, default=0)
    expires_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Coupon(code={self.code}, discount={self.discount_percentage}%)>"

