"""
Situation-based legal guidance routes.

GET /situations              → list all available scenario IDs
GET /situations/{scenario_id}?lang=en|hi|mr  → full structured guidance
All routes are PROTECTED (JWT required).
"""

from fastapi import APIRouter, HTTPException, Query, status, Depends

from auth.jwt_handler import get_current_user_id
from services.legal_data import SITUATIONS_BY_LANG, ALL_SCENARIO_IDS
from utils.responses import success_response

router = APIRouter()

VALID_LANGUAGES = {"en", "hi", "mr"}
LANGUAGE_LABELS = {"en": "English", "hi": "Hindi", "mr": "Marathi"}


# ---------------------------------------------------------------------------
# GET /situations — list all scenario IDs with titles
# ---------------------------------------------------------------------------
@router.get("")
async def list_situations(
    lang: str = Query(default="en", description="Language: en | hi | mr"),
    _: str = Depends(get_current_user_id),
):
    """Return all available scenario IDs and their titles in the requested language."""
    lang = lang.lower()
    if lang not in VALID_LANGUAGES:
        lang = "en"

    situations = SITUATIONS_BY_LANG[lang]
    overview = [
        {"scenario_id": sid, "title": data["title"]}
        for sid, data in situations.items()
    ]

    return success_response(
        data={
            "language": LANGUAGE_LABELS[lang],
            "lang_code": lang,
            "total": len(overview),
            "scenarios": overview,
        }
    )


# ---------------------------------------------------------------------------
# GET /situations/{scenario_id}
# ---------------------------------------------------------------------------
@router.get("/{scenario_id}")
async def get_situation(
    scenario_id: str,
    lang: str = Query(default="en", description="Language: en | hi | mr"),
    _: str = Depends(get_current_user_id),
):
    """
    Return full structured legal guidance for a specific scenario.

    Supported scenario_id values:
      traffic_police | salary_not_paid | cyber_fraud | landlord_issue | consumer_complaint
    """
    scenario_id = scenario_id.lower().strip()
    lang = lang.lower().strip()

    # Validate language — fall back to English silently
    if lang not in VALID_LANGUAGES:
        lang = "en"

    # Validate scenario
    if scenario_id not in ALL_SCENARIO_IDS:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=(
                f"Scenario '{scenario_id}' not found. "
                f"Available: {', '.join(ALL_SCENARIO_IDS)}"
            ),
        )

    data = SITUATIONS_BY_LANG[lang][scenario_id]

    return success_response(
        data={
            "language": LANGUAGE_LABELS[lang],
            "lang_code": lang,
            **data,
        }
    )
