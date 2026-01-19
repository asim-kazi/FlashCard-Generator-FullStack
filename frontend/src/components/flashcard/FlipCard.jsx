import { memo, useState, useCallback } from 'react';
import { RotateCw } from 'lucide-react';

const FlipCard = memo(({ question, answer, index, total }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Progress Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-400 min-w-[4rem] text-right">
          {index + 1} / {total}
        </span>
      </div>

      {/* Flip Card Container */}
      <div
        className="relative h-80 cursor-pointer group"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
      >
        {/* Card */}
        <div
          className={`
            relative w-full h-full transition-transform duration-700 ease-out
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
          `}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center
                       bg-gradient-to-br from-blue-600 to-blue-800
                       border-2 border-blue-400/30 shadow-2xl shadow-blue-500/20
                       group-hover:shadow-blue-500/40 transition-shadow duration-300"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center space-y-4">
              <div className="inline-flex px-4 py-1.5 rounded-full bg-blue-500/30 text-blue-200 text-sm font-medium">
                Question
              </div>
              <h3 className="text-3xl font-bold text-white leading-tight">
                {question}
              </h3>
              <div className="flex items-center gap-2 text-blue-200 text-sm mt-6 opacity-70">
                <RotateCw className="w-4 h-4" />
                <span>Click to reveal answer</span>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-center
                       bg-gradient-to-br from-purple-600 to-purple-800
                       border-2 border-purple-400/30 shadow-2xl shadow-purple-500/20
                       group-hover:shadow-purple-500/40 transition-shadow duration-300"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="space-y-4 overflow-y-auto max-h-full custom-scrollbar">
              <div className="inline-flex px-4 py-1.5 rounded-full bg-purple-500/30 text-purple-200 text-sm font-medium">
                Answer
              </div>
              <p className="text-lg text-white leading-relaxed">{answer}</p>
              <div className="flex items-center gap-2 text-purple-200 text-sm mt-6 opacity-70">
                <RotateCw className="w-4 h-4" />
                <span>Click to flip back</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flip Indicator */}
      <div className="text-center">
        <button
          onClick={handleFlip}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-gray-800 hover:bg-gray-700 text-gray-300
                     transition-colors duration-200"
        >
          <RotateCw className="w-4 h-4" />
          <span className="text-sm font-medium">Flip Card</span>
        </button>
      </div>
    </div>
  );
});

FlipCard.displayName = 'FlipCard';

export default FlipCard;
