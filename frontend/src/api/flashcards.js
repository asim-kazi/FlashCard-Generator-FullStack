import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions

/**
 * Generate flashcards from text
 */
export const generateFlashcardsFromText = async (text) => {
  try {
    const response = await api.post('/flashcards/text', { text });
    return response.data;
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
};

/**
 * Extract text from image (OCR)
 */
export const extractTextFromImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await api.post('/ocr/extract', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error extracting text:', error);
    throw error;
  }
};

/**
 * Extract text and generate flashcards in one step
 */
export const extractAndGenerateFlashcards = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await api.post('/ocr/extract-and-generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

/**
 * Generate audio from text
 */
export const generateAudio = async (text) => {
  try {
    const response = await api.post(
      '/tts/generate-and-download',
      { text },
      {
        responseType: 'blob', // Important for audio files
      }
    );

    // Create audio URL from blob
    const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    return audioUrl;
  } catch (error) {
    console.error('Error generating audio:', error);
    throw error;
  }
};

/**
 * Get usage statistics
 */
export const getStatistics = async () => {
  try {
    const response = await api.get('/stats/');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

export default api;
