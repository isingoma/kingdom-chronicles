import React from 'react';
import type { GameDifficulty } from '../types';

interface DifficultySelectorProps {
  value: GameDifficulty;
  onChange: (difficulty: GameDifficulty) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Game Difficulty
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as GameDifficulty)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="easy">Easy - Basic Bible stories and simple questions</option>
        <option value="medium">Medium - More detailed stories and challenging options</option>
        <option value="hard">Hard - Complex stories and advanced theological concepts</option>
      </select>
      <p className="mt-1 text-sm text-gray-500">
        {value === 'easy' && 'Perfect for beginners and children'}
        {value === 'medium' && 'Great for those familiar with Bible stories'}
        {value === 'hard' && 'Challenging questions for advanced Bible knowledge'}
      </p>
    </div>
  );
};