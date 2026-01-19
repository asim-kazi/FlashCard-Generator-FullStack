"""
Smart Flashcard Generator - FastAPI Backend
Main application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Import routers (we'll create these next)
from app.api.v1 import flashcards, ocr, tts, stats

# Initialize FastAPI app
app = FastAPI(
    title=os.getenv("APP_NAME", "Smart Flashcard Generator"),
    description="AI-powered flashcard generation with NLP and OCR",
    version="1.0.0",
    debug=os.getenv("DEBUG", "false").lower() == "true"
)

# CORS configuration (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(flashcards.router, prefix="/api/v1/flashcards", tags=["Flashcards"])
app.include_router(ocr.router, prefix="/api/v1/ocr", tags=["OCR"])
app.include_router(tts.router, prefix="/api/v1/tts", tags=["TTS"])
app.include_router(stats.router, prefix="/api/v1/stats", tags=["Stats"])

# Health check endpoint
@app.get("/")
async def root():
    return {
        "message": "Smart Flashcard Generator API",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Run with: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000