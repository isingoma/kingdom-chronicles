import React from 'react';
import { ROUND_TIMES } from '../constants/gameSettings';

interface TimeSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Time per Round
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        {ROUND_TIMES.map(({ value: time, label }) => (
          <option key={time} value={time}>{label}</option>
        ))}
      </select>
    </div>
  );
};