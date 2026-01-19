"""
OCR Service
Image text extraction using OpenCV and Tesseract
Converted from your original image_processing.py
"""

import cv2
import pytesseract
import numpy as np
import os
from dotenv import load_dotenv

load_dotenv()

class OCRService:
    """
    Service for extracting text from images
    """
    
    def __init__(self):
        """Initialize OCR with Tesseract path"""
        tesseract_cmd = os.getenv("TESSERACT_CMD")
        if tesseract_cmd:
            pytesseract.pytesseract.tesseract_cmd = tesseract_cmd
    
    def preprocess_image(self, image_path: str) -> np.ndarray:
        """
        Preprocess image for better OCR accuracy
        
        Args:
            image_path: Path to image file
            
        Returns:
            Preprocessed image as numpy array
        """
        try:
            # Load image
            img = cv2.imread(image_path)
            if img is None:
                raise FileNotFoundError(f"Unable to load image: {image_path}")
            
            # Convert to grayscale
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Apply Gaussian blur
            blurred = cv2.GaussianBlur(gray, (5, 5), 0)
            
            # Adaptive thresholding
            processed = cv2.adaptiveThreshold(
                blurred, 255, 
                cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                cv2.THRESH_BINARY, 11, 2
            )
            
            return processed
            
        except Exception as e:
            print(f"Error preprocessing image: {e}")
            return None
    
    def extract_text(self, image_path: str) -> str:
        """
        Extract text from image using Tesseract OCR
        
        Args:
            image_path: Path to image file
            
        Returns:
            Extracted text string
        """
        processed_img = self.preprocess_image(image_path)
        
        if processed_img is None:
            return ""
        
        # Run OCR
        text = pytesseract.image_to_string(
            processed_img, 
            config="--psm 6 --oem 3"
        )
        
        return text.strip()

# Singleton instance
ocr_service = OCRService()