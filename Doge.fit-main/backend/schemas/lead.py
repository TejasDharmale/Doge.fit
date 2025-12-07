from pydantic import BaseModel, EmailStr

class LeadCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr

