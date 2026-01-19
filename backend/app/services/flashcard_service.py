"""
Flashcard Service
Main business logic for flashcard generation
Converted from your original flashcard.py
"""

from app.services.nlp_pipeline import nlp_pipeline
from typing import Dict, Tuple

class FlashcardService:
    """
    Service for generating flashcards from text
    """
    
    @staticmethod
    def determine_flashcard_count(text: str) -> int:
        """
        Determine optimal number of flashcards based on text length
        
        Args:
            text: Input text
            
        Returns:
            Number of flashcards to generate
        """
        word_count = len(text.split())
        
        if word_count < 100:
            return 3
        elif 100 <= word_count < 300:
            return 5
        elif 300 <= word_count < 600:
            return 7
        else:
            return 10
    
    @staticmethod
    def generate_flashcards(text: str) -> Tuple[Dict[str, str], int, int]:
        """
        Generate flashcards from input text using NLP pipeline
        
        Args:
            text: Input text for flashcard generation
            
        Returns:
            Tuple of (flashcards dict, text_word_count, flashcard_word_count)
        """
        # Determine number of flashcards
        num_flashcards = FlashcardService.determine_flashcard_count(text)
        
        # Preprocess text into sentences
        sentences = nlp_pipeline.preprocess_text(text)
        
        if not sentences:
            return {}, 0, 0
        
        # Generate embeddings
        embeddings = nlp_pipeline.generate_embeddings(sentences)
        
        # Calculate similarity
        similarity_matrix = nlp_pipeline.calculate_similarity_matrix(embeddings)
        
        # Rank sentences using PageRank
        scores = nlp_pipeline.rank_sentences_pagerank(similarity_matrix)
        
        # Extract top sentences
        selected_sentences = nlp_pipeline.extract_top_sentences(
            sentences, scores, num_flashcards
        )
        
        # Create flashcards dictionary
        flashcards = {
            f"Point {i+1}": sentence 
            for i, sentence in enumerate(selected_sentences)
        }
        
        # Calculate word counts
        text_word_count = len(text.split())
        flashcard_word_count = sum(len(card.split()) for card in flashcards.values())
        
        return flashcards, text_word_count, flashcard_word_count

# Singleton instance
flashcard_service = FlashcardService()