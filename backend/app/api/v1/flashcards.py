"""
Flashcard API Router
Handles text-based flashcard generation
"""

from fastapi import APIRouter, HTTPException
from app.schemas.flashcard import FlashcardTextRequest, FlashcardResponse
from app.services.flashcard_service import flashcard_service
from app.services.stats_service import stats_service

router = APIRouter()

@router.post("/text", response_model=FlashcardResponse)
async def generate_flashcards_from_text(request: FlashcardTextRequest):
    """
    Generate flashcards from input text
    
    - **text**: Input text for flashcard generation (minimum 10 characters)
    
    Returns generated flashcards with statistics
    """
    try:
        # Generate flashcards
        flashcards, text_word_count, flashcard_word_count = flashcard_service.generate_flashcards(request.text)
        
        if not flashcards:
            raise HTTPException(status_code=400, detail="Failed to generate flashcards. Text may be too short or invalid.")
        
        # Update stats
        stats_service.increment_flashcards(len(flashcards))
        stats_service.increment_texts()
        
        return FlashcardResponse(
            flashcards=flashcards,
            count=len(flashcards),
            text_word_count=text_word_count,
            flashcard_word_count=flashcard_word_count
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating flashcards: {str(e)}")