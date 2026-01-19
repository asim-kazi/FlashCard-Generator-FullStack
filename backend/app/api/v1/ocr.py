"""
OCR API Router
Handles image upload and text extraction
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.ocr import OCRResponse
from app.schemas.flashcard import FlashcardResponse
from app.services.ocr_service import ocr_service
from app.services.flashcard_service import flashcard_service
from app.services.stats_service import stats_service
import os
import uuid

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/extract", response_model=OCRResponse)
async def extract_text_from_image(file: UploadFile = File(...)):
    """
    Extract text from uploaded image using OCR
    
    - **file**: Image file (PNG, JPG, JPEG)
    
    Returns extracted text
    """
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Save uploaded file
        file_ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # Extract text
        extracted_text = ocr_service.extract_text(file_path)
        
        # Clean up
        os.remove(file_path)
        
        if not extracted_text:
            raise HTTPException(status_code=400, detail="No text could be extracted from image")
        
        # Update stats
        stats_service.increment_images()
        
        return OCRResponse(
            extracted_text=extracted_text,
            word_count=len(extracted_text.split()),
            success=True
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@router.post("/extract-and-generate", response_model=FlashcardResponse)
async def extract_and_generate_flashcards(file: UploadFile = File(...)):
    """
    Extract text from image and generate flashcards in one step
    
    - **file**: Image file (PNG, JPG, JPEG)
    
    Returns generated flashcards
    """
    try:
        # Extract text (reuse logic)
        ocr_response = await extract_text_from_image(file)
        
        # Generate flashcards
        flashcards, text_word_count, flashcard_word_count = flashcard_service.generate_flashcards(
            ocr_response.extracted_text
        )
        
        if not flashcards:
            raise HTTPException(status_code=400, detail="Failed to generate flashcards from extracted text")
        
        # Update stats
        stats_service.increment_flashcards(len(flashcards))
        stats_service.increment_texts()
        
        return FlashcardResponse(
            flashcards=flashcards,
            count=len(flashcards),
            text_word_count=text_word_count,
            flashcard_word_count=flashcard_word_count
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")