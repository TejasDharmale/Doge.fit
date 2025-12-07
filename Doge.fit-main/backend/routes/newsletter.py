from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from controllers.newsletter_controller import subscribe_newsletter
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/api", tags=["newsletter"])

class NewsletterSubscribe(BaseModel):
    email: EmailStr

@router.post("/newsletter")
def subscribe(newsletter: NewsletterSubscribe, db: Session = Depends(get_db)):
    subscribe_newsletter(db, newsletter.email)
    return {"message": "Subscribed to newsletter successfully", "email": newsletter.email}

