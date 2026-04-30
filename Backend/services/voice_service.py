from gtts import gTTS
import uuid
import os

def generate_voice(text, lang="en"):
    filename = f"audio_{uuid.uuid4()}.mp3"
    filepath = f"static/{filename}"

    tts = gTTS(text=text, lang=lang)
    tts.save(filepath)

    return filepath