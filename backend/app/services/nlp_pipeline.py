"""
NLP Pipeline Service
Handles sentence preprocessing, embeddings, and PageRank
Converted from your original flashcard.py
"""

import spacy
import numpy as np
import networkx as nx
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv

load_dotenv()

class NLPPipeline:
    """
    NLP processing pipeline for text analysis
    """
    
    def __init__(self):
        """Initialize spaCy and SentenceTransformer models"""
        self.spacy_model = os.getenv("SPACY_MODEL", "en_core_web_sm")
        self.embedding_model_name = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
        
        # Load models
        self.nlp = spacy.load(self.spacy_model)
        self.embedder = SentenceTransformer(self.embedding_model_name)
    
    def preprocess_text(self, text: str) -> list:
        """
        Split text into sentences using spaCy
        
        Args:
            text: Input text string
            
        Returns:
            List of cleaned sentences
        """
        doc = self.nlp(text)
        sentences = [sent.text.strip() for sent in doc.sents if sent.text.strip()]
        return sentences
    
    def generate_embeddings(self, sentences: list) -> np.ndarray:
        """
        Generate sentence embeddings using SentenceTransformer
        
        Args:
            sentences: List of sentence strings
            
        Returns:
            Numpy array of embeddings
        """
        embeddings = self.embedder.encode(sentences)
        return embeddings
    
    def calculate_similarity_matrix(self, embeddings: np.ndarray) -> np.ndarray:
        """
        Calculate cosine similarity between sentence embeddings
        
        Args:
            embeddings: Sentence embeddings
            
        Returns:
            Similarity matrix
        """
        similarity_matrix = cosine_similarity(embeddings)
        return similarity_matrix
    
    def rank_sentences_pagerank(self, similarity_matrix: np.ndarray) -> dict:
        """
        Apply PageRank algorithm to identify important sentences
        
        Args:
            similarity_matrix: Cosine similarity matrix
            
        Returns:
            Dictionary of sentence indices and their PageRank scores
        """
        graph = nx.from_numpy_array(similarity_matrix)
        scores = nx.pagerank(graph)
        return scores
    
    def extract_top_sentences(self, sentences: list, scores: dict, num_sentences: int) -> list:
        """
        Select top-ranked sentences based on PageRank scores
        
        Args:
            sentences: List of all sentences
            scores: PageRank scores
            num_sentences: Number of sentences to extract
            
        Returns:
            List of selected important sentences
        """
        # Rank sentences by score
        ranked_sentences = sorted(
            ((scores[i], s) for i, s in enumerate(sentences)),
            reverse=True
        )
        
        # Select top sentences, avoid duplicates
        selected = []
        used_phrases = set()
        
        for _, sentence in ranked_sentences:
            if len(selected) >= num_sentences:
                break
                
            cleaned = sentence.strip()
            if cleaned and cleaned not in used_phrases:
                # Trim to first 3 sentences if too long
                trimmed = '. '.join(cleaned.split('. ')[:3]).strip()
                if not trimmed.endswith('.'):
                    trimmed += '.'
                    
                selected.append(trimmed)
                used_phrases.add(trimmed)
        
        return selected

# Singleton instance
nlp_pipeline = NLPPipeline()