import React from 'react';
import { RotateCcw, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { VerseAttempt } from '../types';

interface GameSummaryProps {
  failedVerses: VerseAttempt[];
  onPlayAgain: () => void;
  onExit: () => void;
}

export const GameSummary: React.FC<GameSummaryProps> = ({ 
  failedVerses, 
  onPlayAgain,
  onExit 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Game Summary</h2>
      
      {failedVerses.length > 0 ? (
        <>
          <h3 className="text-lg font-semibold mb-4">Verses to Review:</h3>
          <div className="space-y-6 mb-8">
            {failedVerses.map((attempt, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-gray-900 mb-2">{attempt.verse}</div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Expected: </span>
                    <span className="text-green-600">{attempt.expectedAnswer}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Your answer: </span>
                    <span className="text-red-600">{attempt.userAnswer || '(skipped)'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Similarity: </span>
                    <span>{Math.round(attempt.similarity)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-green-600 font-medium mb-8">
          Perfect! You completed all verses correctly!
        </p>
      )}

      <div className="flex space-x-4">
        <Button onClick={onPlayAgain} className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
        <Button onClick={onExit} variant="outline" className="flex-1">
          <X className="w-4 h-4 mr-2" />
          Exit
        </Button>
      </div>
    </div>
  );
};