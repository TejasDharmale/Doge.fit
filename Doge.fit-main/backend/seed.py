"""
Database seeding script to populate initial data
Run this once after creating the database tables
"""
from database import SessionLocal, engine
from models import Product, Coupon
from database import Base

# Create tables
Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()
    
    try:
        # Check if products already exist
        existing_products = db.query(Product).count()
        if existing_products > 0:
            print("Products already exist. Skipping seed.")
            return
        
        # Seed Products
        products = [
            Product(
                id=1,
                name="Transformer Tshirt",
                price=2499.00,
                sale_price=2099.00,
                image_url="/images/transformer-tshirt.jpg",
                category="Jerseys",
                is_featured=True,
                description="High-performance athletic t-shirt perfect for intense workouts",
                stock=100
            ),
            Product(
                id=2,
                name="Water Bottle",
                price=1699.00,
                sale_price=None,
                image_url="/images/bottle.jpg",
                category="Gear",
                is_featured=True,
                description="Durable shaker bottle with leak-proof design",
                stock=150
            ),
            Product(
                id=3,
                name="Knitted Golf Sweater",
                price=4199.00,
                sale_price=3499.00,
                image_url="/images/sweater.jpg",
                category="Jerseys",
                is_featured=False,
                description="Premium knitted sweater for casual wear",
                stock=50
            ),
        ]
        
        for product in products:
            db.add(product)
        
        # Seed Coupons
        coupons = [
            Coupon(
                code="SUMMER25",
                discount_percentage=25,
                active=True,
                max_uses=None,  # Unlimited
                used_count=0
            ),
            Coupon(
                code="WELCOME10",
                discount_percentage=10,
                active=True,
                max_uses=None,  # Unlimited
                used_count=0
            ),
        ]
        
        for coupon in coupons:
            db.add(coupon)
        
        db.commit()
        print("Database seeded successfully!")
        print(f"Created {len(products)} products and {len(coupons)} coupons")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

