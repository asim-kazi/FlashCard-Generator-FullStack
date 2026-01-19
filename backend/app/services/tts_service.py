"""
TTS Service
Text-to-speech audio generation
Converted from your original text_to_speech.py
"""

from gtts import gTTS
import os
from dotenv import load_dotenv

load_dotenv()

class TTSService:
    """
    Service for converting text to speech
    """
    
    def __init__(self):
        """Initialize TTS service with audio directory"""
        self.audio_dir = os.getenv("AUDIO_DIR", "audio")
        os.makedirs(self.audio_dir, exist_ok=True)
    
    def text_to_speech(self, text: str, filename: str = None) -> str:
        """
        Convert text to speech and save as MP3
        
        Args:
            text: Text to convert
            filename: Optional custom filename
            
        Returns:
            Path to generated audio file
        """
        if not text.strip():
            raise ValueError("No text provided for speech synthesis")
        
        # Generate filename
        if not filename:
            filename = "flashcard.mp3"
        
        filepath = os.path.join(self.audio_dir, filename)
        
        # Generate speech
        tts = gTTS(text=text, lang="en")
        tts.save(filepath)
        
        return filepath

# Singleton instance
tts_service = TTSService()