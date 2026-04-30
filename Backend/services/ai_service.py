"""
AI Service Module

1. Rule-based scenario detection
2. Gemini-based document analysis
"""

from typing import Optional, Tuple
from utils.config import settings
import google.generativeai as genai


# ---------------------------------------------------------------------------
# Gemini Configuration
# ---------------------------------------------------------------------------
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")


# ---------------------------------------------------------------------------
# Rule-based Scenario Detection
# ---------------------------------------------------------------------------
SCENARIO_KEYWORDS: dict[str, list[str]] = {
    "traffic_police": [
        "traffic", "police", "challan", "fine", "stopped", "road",
        "driving", "licence", "license", "vehicle", "bike", "car",
        "speed", "signal", "helmet", "bribe", "officer", "highway",
        "traffic cop", "motor", "PUC", "RC book", "registration",
        "pulis", "sadak", "gaadi",
    ],
    "salary_not_paid": [
        "salary", "wage", "payment", "employer", "job", "office",
        "paid", "money", "dues", "arrear", "payslip", "paycheck",
        "resign", "layoff", "terminated", "unpaid",
        "tankhwa", "naukri", "mazdoori", "vetan",
    ],
    "cyber_fraud": [
        "cyber", "fraud", "scam", "hack", "otp", "bank",
        "phishing", "online", "account", "transaction",
        "upi", "credit card", "debit card", "blackmail",
        "instagram", "whatsapp", "email fraud",
        "dhokha", "thaagi",
    ],
    "landlord_issue": [
        "landlord", "tenant", "rent", "evict", "eviction",
        "house", "flat", "deposit", "lease",
        "agreement", "notice", "owner", "property",
        "kiraya", "maalik",
    ],
    "consumer_complaint": [
        "product", "defective", "refund", "complaint",
        "warranty", "service", "company",
        "amazon", "flipkart", "return", "replace",
        "billing", "overcharged",
        "grahak", "shikayat",
    ],
}


def detect_scenario(text: str) -> Tuple[Optional[str], int, int]:
    text_lower = text.lower()
    scores: dict[str, int] = {}

    for scenario_id, keywords in SCENARIO_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw in text_lower)
        if score > 0:
            scores[scenario_id] = score

    if not scores:
        return None, 0, len(text.split())

    best_scenario = max(scores, key=lambda k: scores[k])
    return best_scenario, scores[best_scenario], len(text.split())


def score_to_confidence(score: int) -> str:
    if score >= 4:
        return "high"
    elif score >= 2:
        return "medium"
    return "low"


# ---------------------------------------------------------------------------
# Gemini Document Analysis
# ---------------------------------------------------------------------------
def analyze_document(text: str) -> str:
    try:
        prompt = f"""
        You are a legal assistant for Indian law.

        Analyze the document and give:

        1. Summary (max 5 lines)
        2. Key legal points (5 bullets)
        3. Top 3 important clauses
        4. Top 3 risks

        Keep answer short (200-300 words).

        Document:
        {text}
        """

        response = model.generate_content(prompt)

        # ✅ SAFE EXTRACTION
        if response:
            if hasattr(response, "text") and response.text:
                return response.text

            # 🔁 fallback (important)
            if hasattr(response, "candidates"):
                return response.candidates[0].content.parts[0].text

        return "AI could not generate a proper response."

    except Exception as e:
        print("Gemini Error:", str(e))
        return "Error analyzing document using AI."