"""
Authentication routes: POST /auth/signup and POST /auth/login
These endpoints are PUBLIC (no JWT required).
"""

from datetime import datetime
from fastapi import APIRouter, HTTPException, status, Depends
from passlib.context import CryptContext

from database.connection import get_db
from models.user import UserSignupRequest, UserLoginRequest, UserPublicResponse, TokenResponse
from auth.jwt_handler import create_access_token
from utils.responses import success_response, error_response

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

VALID_LANGUAGES = {"en", "hi", "mr"}


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def _user_doc_to_public(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc["name"],
        "email": doc["email"],
        "preferred_language": doc.get("preferred_language", "en"),
        "created_at": doc["created_at"],
    }


# ---------------------------------------------------------------------------
# POST /auth/signup
# ---------------------------------------------------------------------------
@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(payload: UserSignupRequest, db=Depends(get_db)):
    """Register a new NyaySathi user."""

    # Validate language
    lang = payload.preferred_language.lower()
    if lang not in VALID_LANGUAGES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"preferred_language must be one of: {', '.join(VALID_LANGUAGES)}",
        )

    # Check duplicate email
    existing = await db.users.find_one({"email": payload.email.lower()})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    # Create user document
    user_doc = {
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "password_hash": hash_password(payload.password),
        "preferred_language": lang,
        "created_at": datetime.utcnow(),
    }

    result = await db.users.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id

    # Generate token
    token = create_access_token({"sub": str(result.inserted_id)})

    return success_response(
        data={
            "access_token": token,
            "token_type": "bearer",
            "user": _user_doc_to_public(user_doc),
        },
        message="Account created successfully.",
    )


# ---------------------------------------------------------------------------
# POST /auth/login
# ---------------------------------------------------------------------------
@router.post("/login")
async def login(payload: UserLoginRequest, db=Depends(get_db)):
    """Authenticate user and return a JWT token."""

    user = await db.users.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    token = create_access_token({"sub": str(user["_id"])})

    return success_response(
        data={
            "access_token": token,
            "token_type": "bearer",
            "user": _user_doc_to_public(user),
        },
        message="Login successful.",
    )
