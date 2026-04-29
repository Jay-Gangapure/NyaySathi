from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import ask_gemini

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/chat")
async def chat_with_ai(payload: ChatRequest):
    answer = ask_gemini(payload.question)

    return {
        "success": True,
        "answer": answer
    }