"""
Stats Service
Track usage statistics (in-memory for now, can be moved to DB later)
"""

class StatsService:
    """
    Service for tracking application statistics
    """
    
    def __init__(self):
        """Initialize stats counters"""
        self.total_flashcards_generated = 0
        self.total_texts_processed = 0
        self.total_images_processed = 0
    
    def increment_flashcards(self, count: int):
        """Increment flashcard generation counter"""
        self.total_flashcards_generated += count
    
    def increment_texts(self):
        """Increment text processing counter"""
        self.total_texts_processed += 1
    
    def increment_images(self):
        """Increment image processing counter"""
        self.total_images_processed += 1
    
    def get_stats(self) -> dict:
        """Get current statistics"""
        return {
            "total_flashcards_generated": self.total_flashcards_generated,
            "total_texts_processed": self.total_texts_processed,
            "total_images_processed": self.total_images_processed
        }
    
    def reset_stats(self):
        """Reset all counters"""
        self.total_flashcards_generated = 0
        self.total_texts_processed = 0
        self.total_images_processed = 0

# Singleton instance
stats_service = StatsService()