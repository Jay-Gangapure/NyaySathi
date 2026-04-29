import google.generativeai as genai
from utils.config import settings

genai.configure(api_key=settings.gemini_api_key)

model = genai.GenerativeModel("gemini-1.5-flash")

def ask_gemini(prompt: str):
    response = model.generate_content(prompt)
    return response.text