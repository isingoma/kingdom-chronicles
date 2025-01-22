import React from 'react';
import { Scroll, BookOpen } from 'lucide-react';
import type { Testament } from '../types';

interface TestamentSelectorProps {
  onSelect: (testament: Testament) => void;
  lastGuessCorrect: boolean | null;
  disabled?: boolean;
}

export const TestamentSelector: React.FC<TestamentSelectorProps> = ({ 
  onSelect, 
  lastGuessCorrect,
  disabled 
}) => {
  return (
    <div className="space-y-4">
      {lastGuessCorrect !== null && (
        <div className={`text-center p-4 rounded-lg mb-4 ${
          lastGuessCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {lastGuessCorrect ? 'Correct!' : 'Wrong! -50 points'}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelect('old')}
          disabled={disabled}
          className={`flex flex-col items-center p-6 rounded-lg border-2 transition-colors ${
            disabled 
              ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
              : 'bg-amber-50 border-amber-200 hover:bg-amber-100'
          }`}
        >
          <Scroll className="w-12 h-12 text-amber-600 mb-2" />
          <span className="text-lg font-semibold">Old Testament</span>
        </button>

        <button
          onClick={() => onSelect('new')}
          disabled={disabled}
          className={`flex flex-col items-center p-6 rounded-lg border-2 transition-colors ${
            disabled 
              ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
              : 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
          }`}
        >
          <BookOpen className="w-12 h-12 text-indigo-600 mb-2" />
          <span className="text-lg font-semibold">New Testament</span>
        </button>
      </div>
    </div>
  );
};