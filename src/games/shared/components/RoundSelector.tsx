import React from 'react';
import { ROUND_COUNTS } from '../constants/gameSettings';

interface RoundSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const RoundSelector: React.FC<RoundSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Number of Rounds
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        {ROUND_COUNTS.map(count => (
          <option key={count} value={count}>{count} Rounds</option>
        ))}
      </select>
    </div>
  );
};