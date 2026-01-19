import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import FlipCard from '../components/FlipCard';
import AudioButton from '../components/AudioButton';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flashcardsData = location.state?.flashcardsData;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle no data
  if (!flashcardsData || !flashcardsData.flashcards) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-400 mb-4">No flashcards found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const flashcards = Object.entries(flashcardsData.flashcards);
  const totalCards = flashcards.length;
  const [question, answer] = flashcards[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <h1 className="text-3xl font-bold text-blue-400">
            Generated Flashcards
          </h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">
              {flashcardsData.count}
            </div>
            <div className="text-sm text-gray-400">Total Cards</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">
              {flashcardsData.text_word_count}
            </div>
            <div className="text-sm text-gray-400">Input Words</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">
              {flashcardsData.flashcard_word_count}
            </div>
            <div className="text-sm text-gray-400">Card Words</div>
          </div>
        </div>

        {/* Flashcard Display */}
        <FlipCard
          question={question}
          answer={answer}
          index={currentIndex}
          total={totalCards}
        />

        {/* Navigation & Audio */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <AudioButton text={answer} />

          <button
            onClick={handleNext}
            disabled={currentIndex === totalCards - 1}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
