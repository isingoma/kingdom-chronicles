import React from 'react';
import { Heart, Coins, Brain } from 'lucide-react';
import type { PackType } from '../types';

interface PackTypeSelectorProps {
  value: PackType;
  onChange: (value: PackType) => void;
}

export const PackTypeSelector: React.FC<PackTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Bible Pack
      </label>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => onChange('healing')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'healing' 
              ? 'border-pink-500 bg-pink-50' 
              : 'border-gray-200 hover:border-pink-200'
          }`}
        >
          <Heart className="w-8 h-8 text-pink-500 mb-2" />
          <span className="text-sm font-medium">Healing</span>
        </button>

        <button
          onClick={() => onChange('wealth')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'wealth' 
              ? 'border-yellow-500 bg-yellow-50' 
              : 'border-gray-200 hover:border-yellow-200'
          }`}
        >
          <Coins className="w-8 h-8 text-yellow-500 mb-2" />
          <span className="text-sm font-medium">Wealth</span>
        </button>

        <button
          onClick={() => onChange('wisdom')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'wisdom' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <Brain className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-sm font-medium">Wisdom</span>
        </button>
      </div>
    </div>
  );
};