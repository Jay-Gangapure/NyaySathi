from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # MongoDB
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB_NAME: str = "nyaysathi"

    # JWT
    SECRET_KEY: str = "nyaysathi-super-secret-jwt-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # =========================
    # Gemini AI (✅ ADD THIS)
    # =========================
    GEMINI_API_KEY: str

    # =========================
    # Azure AI / Document Intelligence (keep if needed)
    # =========================
    AZURE_ENDPOINT: str = ""
    AZURE_API_KEY: str = ""
    AZURE_MODEL_NAME: str = "prebuilt-document"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()