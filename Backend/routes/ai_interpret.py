"""
AI Interpretation route.

POST /ai/interpret
  Input : { "text": "user free text describing their legal problem" }
  Output: detected scenario + full structured guidance
PROTECTED (JWT required).
"""

from fastapi import APIRouter, HTTPException, Query, status, Depends
from pydantic import BaseModel

from auth.jwt_handler import get_current_user_id
from services.ai_service import detect_scenario, score_to_confidence
from services.legal_data import SITUATIONS_BY_LANG, ALL_SCENARIO_IDS
from utils.responses import success_response

router = APIRouter()

VALID_LANGUAGES = {"en", "hi", "mr"}


class InterpretRequest(BaseModel):
    text: str
    lang: str = "en"


# ---------------------------------------------------------------------------
# POST /ai/interpret
# ---------------------------------------------------------------------------
@router.post("/interpret")
async def interpret_legal_situation(
    payload: InterpretRequest,
    _: str = Depends(get_current_user_id),
):
    """
    Analyse the user's free-text description and return the most relevant
    legal scenario and its structured guidance.

    Uses rule-based keyword matching (no external AI API).
    """
    text = payload.text.strip()
    if not text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="'text' field cannot be empty.",
        )
    if len(text) < 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please describe your situation in more detail (at least 5 characters).",
        )

    lang = payload.lang.lower() if payload.lang else "en"
    if lang not in VALID_LANGUAGES:
        lang = "en"

    # --- Rule-based detection ---
    detected_id, score, word_count = detect_scenario(text)
    confidence = score_to_confidence(score) if detected_id else "none"

    if not detected_id:
        return success_response(
            data={
                "detected_scenario": None,
                "confidence": "none",
                "score": 0,
                "scenario_data": None,
                "suggestions": ALL_SCENARIO_IDS,
                "message": (
                    "We could not detect a specific legal scenario from your description. "
                    "Please try rephrasing, or browse the available situations directly."
                ),
            }
        )

    scenario_data = SITUATIONS_BY_LANG[lang][detected_id]

    return success_response(
        data={
            "detected_scenario": detected_id,
            "confidence": confidence,
            "score": score,
            "keywords_matched": score,
            "lang": lang,
            "scenario_data": scenario_data,
            "message": (
                f"We detected that your situation is related to: "
                f"'{scenario_data['title']}'. "
                f"Here is the relevant legal guidance."
            ),
        }
    )


# ---------------------------------------------------------------------------
# GET /ai/scenarios — helper: list supported scenario IDs
# ---------------------------------------------------------------------------
@router.get("/scenarios")
async def list_supported_scenarios(_: str = Depends(get_current_user_id)):
    """Returns all scenario IDs the AI interpreter can detect."""
    return success_response(
        data={
            "supported_scenarios": ALL_SCENARIO_IDS,
            "tip": "Describe your situation in plain language and POST to /ai/interpret.",
        }
    )
