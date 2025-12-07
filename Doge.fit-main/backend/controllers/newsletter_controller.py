from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models.newsletter import Newsletter

def subscribe_newsletter(db: Session, email: str) -> Newsletter:
    """Subscribe email to newsletter"""
    # Check if already subscribed
    existing = db.query(Newsletter).filter(Newsletter.email == email).first()
    if existing:
        if not existing.active:
            existing.active = True
            db.commit()
            db.refresh(existing)
        return existing
    
    db_newsletter = Newsletter(email=email)
    try:
        db.add(db_newsletter)
        db.commit()
        db.refresh(db_newsletter)
        return db_newsletter
    except IntegrityError:
        db.rollback()
        existing = db.query(Newsletter).filter(Newsletter.email == email).first()
        return existing

