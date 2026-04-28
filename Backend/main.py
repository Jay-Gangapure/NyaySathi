"""
NyaySathi - Real-Time Legal Emergency Assistant
Main FastAPI Application Entry Point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database.connection import connect_db, disconnect_db
from routes import auth, situations, ai_interpret, documents, directory, users

from routes.ai_chat import router as ai_chat_router
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage startup and shutdown events."""
    await connect_db()
    yield
    await disconnect_db()


app = FastAPI(
    title="NyaySathi API",
    description="Real-Time Legal Emergency Assistant — Situation-based legal guidance for everyone.",
    version="1.0.0",
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# CORS — allow all origins in dev; tighten to your frontend domain in prod
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(auth.router,       prefix="/auth",       tags=["Authentication"])
app.include_router(users.router,      prefix="/users",      tags=["Users"])
app.include_router(situations.router, prefix="/situations", tags=["Situations"])
app.include_router(ai_interpret.router, prefix="/ai",       tags=["AI Interpretation"])
app.include_router(documents.router,  prefix="/documents",  tags=["Documents"])
app.include_router(directory.router,  prefix="/directory",  tags=["Legal Directory"])
app.include_router(ai_chat_router, prefix="/ai", tags=["AI Chat"])

# ---------------------------------------------------------------------------
# Health check — public
# ---------------------------------------------------------------------------
@app.get("/", tags=["Health"])
async def root():
    return {
        "success": True,
        "data": {
            "message": "Welcome to NyaySathi API 🏛️",
            "version": "1.0.0",
            "docs": "/docs",
        },
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {"success": True, "data": {"status": "healthy"}}
