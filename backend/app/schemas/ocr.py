"""
Pydantic schemas for OCR endpoints
"""

from pydantic import BaseModel, Field

class OCRResponse(BaseModel):
    """Response for OCR text extraction"""
    extracted_text: str = Field(..., description="Text extracted from image")
    word_count: int = Field(..., description="Word count of extracted text")
    success: bool = Field(default=True, description="Extraction success status")
    
    class Config:
        json_schema_extra = {
            "example": {
                "extracted_text": "This is extracted text from image",
                "word_count": 6,
                "success": True
            }
        }