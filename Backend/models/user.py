"""
User Pydantic models — request bodies and DB representations.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


# ---------------------------------------------------------------------------
# Request / Response schemas
# ---------------------------------------------------------------------------

class UserSignupRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, example="Priya Sharma")
    email: EmailStr = Field(..., example="priya@example.com")
    password: str = Field(..., min_length=6, example="secret123")
    preferred_language: str = Field(default="en", example="hi",
                                    description="en | hi | mr")


class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., example="priya@example.com")
    password: str = Field(..., example="secret123")


class UserPublicResponse(BaseModel):
    id: str
    name: str
    email: str
    preferred_language: str
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublicResponse


# ---------------------------------------------------------------------------
# Internal DB document shape (not exposed directly to clients)
# ---------------------------------------------------------------------------

class UserInDB(BaseModel):
    name: str
    email: str
    password_hash: str
    preferred_language: str = "en"
    created_at: datetime = Field(default_factory=datetime.utcnow)
