"""
Pydantic schemas for TTS endpoints
"""

from pydantic import BaseModel, Field

class TTSRequest(BaseModel):
    """Request for text-to-speech conversion"""
    text: str = Field(..., min_length=1, description="Text to convert to speech")
    
    class Config:
        json_schema_extra = {
            "example": {
                "text": "Machine learning enhances data analysis"
            }
        }

class TTSResponse(BaseModel):
    """Response for TTS generation"""
    audio_file: str = Field(..., description="Generated audio filename")
    success: bool = Field(default=True, description="Generation success status")