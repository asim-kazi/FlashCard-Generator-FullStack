import { memo, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import FlipCard from '../components/flashcard/FlipCard';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import AudioButton from '../components/flashcard/AudioButton';

const Result = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const flashcardsData = location.state?.flashcardsData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(flashcards.length - 1, prev + 1));
  }, []);

  if (!flashcardsData?.flashcards) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card variant="glass" className="text-center max-w-md">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            No Flashcards Found
          </h2>
          <p className="text-gray-400 mb-6">
            Let's create some flashcards first!
          </p>
          <Button onClick={() => navigate('/generator')}>
            Generate Flashcards
          </Button>
        </Card>
      </div>
    );
  }

  const flashcards = Object.entries(flashcardsData.flashcards);
  const [question, answer] = flashcards[currentIndex];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            icon={Home}
            onClick={() => navigate('/')}
          >
            Home
          </Button>

          <h1 className="text-2xl font-bold text-white">Your Flashcards</h1>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" icon={Share2}>
              Share
            </Button>
            <Button variant="outline" size="sm" icon={Download}>
              Export
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card variant="glass" className="text-center">
            <div className="text-3xl font-bold text-blue-400">
              {flashcardsData.count}
            </div>
            <div className="text-sm text-gray-400 mt-1">Total Cards</div>
          </Card>
          <Card variant="glass" className="text-center">
            <div className="text-3xl font-bold text-purple-400">
              {flashcardsData.text_word_count}
            </div>
            <div className="text-sm text-gray-400 mt-1">Input Words</div>
          </Card>
          <Card variant="glass" className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {Math.round(
                (flashcardsData.flashcard_word_count /
                  flashcardsData.text_word_count) *
                  100,
              )}
              %
            </div>
            <div className="text-sm text-gray-400 mt-1">Compression</div>
          </Card>
        </div>

        {/* Flashcard */}
        <FlipCard
          question={question}
          answer={answer}
          index={currentIndex}
          total={flashcards.length}
        />

        {/* Navigation */}
        <Card variant="glass">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              icon={ChevronLeft}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>

            <AudioButton text={answer} />

            <Button
              variant="outline"
              icon={ChevronRight}
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
              className="flex-row-reverse"
            >
              Next
            </Button>
          </div>
        </Card>

        {/* Card Grid Preview */}
        <Card variant="glass">
          <h3 className="text-lg font-semibold text-white mb-4">All Cards</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {flashcards.map(([q], idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  idx === currentIndex
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
});

Result.displayName = 'Result';

export default Result;
