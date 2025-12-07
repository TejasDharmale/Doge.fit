from sqlalchemy.orm import Session
from models.lead import Lead
from schemas.lead import LeadCreate

def create_lead(db: Session, lead_data: dict) -> Lead:
    """Create a new lead"""
    db_lead = Lead(
        first_name=lead_data["first_name"],
        last_name=lead_data["last_name"],
        email=lead_data["email"]
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

