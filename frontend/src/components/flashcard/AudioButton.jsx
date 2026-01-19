import { useState } from 'react';
import { Volume2, Loader } from 'lucide-react';
import { generateAudio } from '../../api/flashcards';

const AudioButton = ({ text }) => {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handlePlayAudio = async () => {
    try {
      setLoading(true);

      // Generate audio from backend
      const url = await generateAudio(text);
      setAudioUrl(url);

      // Play audio
      const audio = new Audio(url);
      audio.play();

      // Cleanup URL after playing
      audio.onended = () => {
        URL.revokeObjectURL(url);
        setAudioUrl(null);
      };
    } catch (error) {
      console.error('Failed to play audio:', error);
      alert('Failed to generate audio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePlayAudio}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
    >
      {loading ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5" />
          <span>Read Aloud</span>
        </>
      )}
    </button>
  );
};

export default AudioButton;
