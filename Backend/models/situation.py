"""
Situation / Legal scenario models.
"""

from typing import List, Optional
from pydantic import BaseModel


class SituationResponse(BaseModel):
    scenario_id: str
    title: str
    rights: List[str]
    what_to_do: List[str]
    what_not_to_do: List[str]
    actions: List[str]


class AIInterpretRequest(BaseModel):
    text: str


class AIInterpretResponse(BaseModel):
    detected_scenario: Optional[str]
    confidence: str
    scenario_data: Optional[SituationResponse]
    message: str
