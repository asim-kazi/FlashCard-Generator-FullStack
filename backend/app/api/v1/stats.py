"""
Stats API Router
Handles usage statistics
"""

from fastapi import APIRouter
from app.schemas.stats import StatsResponse
from app.services.stats_service import stats_service

router = APIRouter()

@router.get("/", response_model=StatsResponse)
async def get_statistics():
    """
    Get current usage statistics
    
    Returns total flashcards, texts, and images processed
    """
    stats = stats_service.get_stats()
    return StatsResponse(**stats)

@router.post("/reset")
async def reset_statistics():
    """
    Reset all statistics to zero
    
    Returns success message
    """
    stats_service.reset_stats()
    return {"message": "Statistics reset successfully"}