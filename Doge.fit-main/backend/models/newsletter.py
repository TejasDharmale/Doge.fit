from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.sql import func
from database import Base
import uuid

class Newsletter(Base):
    __tablename__ = "newsletters"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False, index=True)
    active = Column(Boolean, default=True)
    subscribed_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<Newsletter(id={self.id}, email={self.email})>"

