"""
Initialize database and create all tables
"""
from database import Base, engine
from models import User, Product, Order, Coupon, Lead, Newsletter

def init_database():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_database()

