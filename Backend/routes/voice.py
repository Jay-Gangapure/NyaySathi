from fastapi import APIRouter
from services.voice_service import generate_voice
from services.ai_service import model  # your Gemini model

router = APIRouter()

@router.post("/translate")
async def translate(data: dict):
    text = data["text"]
    lang = data["lang"]

    prompt = f"Translate this into {lang}:\n{text}"
    response = model.generate_content(prompt)

    return {"translated": response.text}


@router.post("/voice")
async def voice(data: dict):
    text = data["text"]
    lang = data["lang"]

    filepath = generate_voice(text, lang)

    return {"audio_url": filepath}