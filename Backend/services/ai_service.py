"""
Rule-based AI interpreter — detects legal scenario from free-text input.
No external AI API used; uses keyword matching with weighted scoring.
"""

from typing import Optional, Tuple

# ---------------------------------------------------------------------------
# Keyword sets per scenario — the more keywords matched, the higher the score
# ---------------------------------------------------------------------------
SCENARIO_KEYWORDS: dict[str, list[str]] = {
    "traffic_police": [
        "traffic", "police", "challan", "fine", "stopped", "road",
        "driving", "licence", "license", "vehicle", "bike", "car",
        "speed", "signal", "helmet", "bribe", "officer", "highway",
        "traffic cop", "motor", "PUC", "RC book", "registration",
        # Hindi / transliterated
        "pulis", "chakki", "chaklan", "sadak", "gaadi",
    ],
    "salary_not_paid": [
        "salary", "wage", "payment", "employer", "job", "office",
        "paid", "money", "dues", "arrear", "payslip", "paycheck",
        "fired", "fired", "resign", "resign", "layoff", "terminated",
        "not paid", "pending salary", "unpaid", "company", "boss",
        # Hindi / transliterated
        "tankhwa", "naukri", "mazdoori", "vetan",
    ],
    "cyber_fraud": [
        "cyber", "fraud", "scam", "hack", "otp", "bank",
        "phishing", "online", "account", "money transferred",
        "transaction", "upi", "debit card", "credit card",
        "fake", "impersonation", "loan app", "instagram",
        "whatsapp", "social media", "threat", "morphed",
        "ransom", "screenshot", "blackmail", "email fraud",
        # Hindi
        "dhokha", "thaagi", "loot",
    ],
    "landlord_issue": [
        "landlord", "tenant", "rent", "evict", "eviction",
        "house", "flat", "apartment", "deposit", "lease",
        "agreement", "notice", "lock", "owner", "property",
        "illegal entry", "water cut", "electricity cut",
        # Hindi / Marathi
        "makaan", "kiraya", "maalik", "bhaade",
    ],
    "consumer_complaint": [
        "product", "defective", "consumer", "complaint", "refund",
        "service", "warranty", "company", "amazon", "flipkart",
        "cheated", "quality", "return", "replace", "broken",
        "bad service", "overcharged", "billing", "restaurant",
        "food", "delivery", "app", "subscription",
        # Hindi
        "grahak", "shikayat", "wapsi",
    ],
}


def detect_scenario(text: str) -> Tuple[Optional[str], int, int]:
    """
    Returns (scenario_id, score, total_words_checked).
    Score is the number of keywords matched.
    """
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
