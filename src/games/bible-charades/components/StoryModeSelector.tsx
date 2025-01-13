import React from 'react';
import type { StoryGenerationMode } from '../types';

interface StoryModeSelectorProps {
  value: StoryGenerationMode;
  onChange: (mode: StoryGenerationMode) => void;
}

export const StoryModeSelector: React.FC<StoryModeSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Story Generation Mode
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as StoryGenerationMode)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="static">Static Stories</option>
        <option value="bedrock">Amazon Bedrock AI</option>
        <option value="chatgpt">ChatGPT</option>
      </select>
      <p className="mt-1 text-sm text-gray-500">
        {value === 'static' && 'Use pre-defined Bible stories'}
        {value === 'bedrock' && 'Generate dynamic stories using Amazon Bedrock AI'}
        {value === 'chatgpt' && 'Generate dynamic stories using ChatGPT'}
      </p>
    </div>
  );
};