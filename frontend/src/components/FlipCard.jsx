import React, { useState } from 'react';

const FlipCard = ({ question, answer, index, total }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2 text-right">
          Card {index + 1} of {total}
        </p>
      </div>

      {/* Flip card */}
      <div
        className="relative h-64 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-600 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-blue-500/30 p-8 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">
                {question}
              </h3>
              <p className="text-sm text-gray-400 mt-4">Click to flip</p>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-900 to-gray-900 rounded-2xl shadow-2xl border border-blue-400/30 p-8 flex items-center justify-center rotate-y-180">
            <div className="text-center overflow-y-auto max-h-full">
              <p className="text-lg text-gray-100 leading-relaxed">{answer}</p>
              <p className="text-sm text-gray-400 mt-4">Click to flip back</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flip hint */}
      <p className="text-center text-sm text-gray-500 mt-4">
        💡 Click card to flip
      </p>
    </div>
  );
};

export default FlipCard;
