"""
Pydantic schemas for flashcard endpoints
Input validation & response structure
"""

from pydantic import BaseModel, Field
from typing import Dict, List

class FlashcardTextRequest(BaseModel):
    """Request body for text-based flashcard generation"""
    text: str = Field(..., min_length=10, description="Input text for flashcard generation")
    
    class Config:
        json_schema_extra = {
            "example": {
                "text": "Machine learning is a subset of artificial intelligence that focuses on data and algorithms."
            }
        }

class FlashcardResponse(BaseModel):
    """Response structure for generated flashcards"""
    flashcards: Dict[str, str] = Field(..., description="Generated flashcards as key-value pairs")
    count: int = Field(..., description="Total number of flashcards generated")
    text_word_count: int = Field(..., description="Word count of input text")
    flashcard_word_count: int = Field(..., description="Word count of generated flashcards")
    
    class Config:
        json_schema_extra = {
            "example": {
                "flashcards": {
                    "Point 1": "Machine learning is a subset of artificial intelligence.",
                    "Point 2": "It focuses on data and algorithms."
                },
                "count": 2,
                "text_word_count": 15,
                "flashcard_word_count": 12
            }
        }