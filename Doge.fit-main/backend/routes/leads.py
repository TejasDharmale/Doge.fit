from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from controllers.lead_controller import create_lead
from schemas.lead import LeadCreate
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["leads"])

@router.post("/leads")
def submit_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    lead_data = create_lead(db, lead.dict())
    return {"message": "Lead created successfully", "lead_id": lead_data.id}

