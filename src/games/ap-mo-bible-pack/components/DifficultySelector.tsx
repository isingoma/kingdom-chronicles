import React from 'react';
import { Dumbbell } from 'lucide-react';
import type { DifficultyLevel } from '../types';

interface DifficultySelectorProps {
  value: DifficultyLevel;
  onChange: (value: DifficultyLevel) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Difficulty
      </label>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => onChange('easy')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'easy' 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-green-200'
          }`}
        >
          <Dumbbell className="w-8 h-8 text-green-500 mb-2" />
          <span className="text-sm font-medium">Easy</span>
          <span className="text-xs text-gray-500">4 words shown</span>
        </button>

        <button
          onClick={() => onChange('medium')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'medium' 
              ? 'border-yellow-500 bg-yellow-50' 
              : 'border-gray-200 hover:border-yellow-200'
          }`}
        >
          <Dumbbell className="w-8 h-8 text-yellow-500 mb-2" />
          <span className="text-sm font-medium">Medium</span>
          <span className="text-xs text-gray-500">3 words shown</span>
        </button>

        <button
          onClick={() => onChange('hard')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'hard' 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-200 hover:border-red-200'
          }`}
        >
          <Dumbbell className="w-8 h-8 text-red-500 mb-2" />
          <span className="text-sm font-medium">Hard</span>
          <span className="text-xs text-gray-500">No words shown</span>
        </button>
      </div>
    </div>
  );
};