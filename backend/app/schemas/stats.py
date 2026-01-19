"""
Pydantic schemas for stats endpoints
"""

from pydantic import BaseModel, Field

class StatsResponse(BaseModel):
    """Response for usage statistics"""
    total_flashcards_generated: int = Field(default=0)
    total_texts_processed: int = Field(default=0)
    total_images_processed: int = Field(default=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "total_flashcards_generated": 50,
                "total_texts_processed": 10,
                "total_images_processed": 5
            }
        }