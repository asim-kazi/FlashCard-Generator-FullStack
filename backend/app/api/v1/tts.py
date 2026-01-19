"""
TTS API Router
Handles text-to-speech conversion
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.schemas.tts import TTSRequest, TTSResponse
from app.services.tts_service import tts_service
import uuid

router = APIRouter()

@router.post("/generate", response_model=TTSResponse)
async def generate_speech(request: TTSRequest):
    """
    Generate speech audio from text
    
    - **text**: Text to convert to speech
    
    Returns audio file path
    """
    try:
        filename = f"{uuid.uuid4()}.mp3"
        audio_path = tts_service.text_to_speech(request.text, filename)
        
        return TTSResponse(
            audio_file=audio_path,
            success=True
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating speech: {str(e)}")

@router.post("/generate-and-download")
async def generate_and_download_speech(request: TTSRequest):
    """
    Generate speech and return audio file for download
    
    - **text**: Text to convert to speech
    
    Returns audio file
    """
    try:
        filename = f"{uuid.uuid4()}.mp3"
        audio_path = tts_service.text_to_speech(request.text, filename)
        
        return FileResponse(
            audio_path,
            media_type="audio/mpeg",
            filename="flashcard.mp3"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")