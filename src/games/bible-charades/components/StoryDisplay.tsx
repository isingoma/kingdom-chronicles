import React from 'react';
import { Book } from 'lucide-react';
import type { BibleStory } from '../types';

interface StoryDisplayProps {
  story: BibleStory;
  onGuess?: (guess: string) => void;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onGuess }) => {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        {story.images && story.images.length > 0 ? (
          <img 
            src={story.images[0].url} 
            alt={story.images[0].alt}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg mb-4">
            <p className="text-theme-primary text-lg text-center leading-relaxed">
              {story.fallbackDescription}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-center bg-indigo-50 p-4 rounded-lg">
          <Book className="w-6 h-6 text-indigo-600 mr-2" />
          <p className="text-lg font-semibold text-indigo-900">
            Scripture: {story.scripture}
          </p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-bold text-center mb-6 text-theme-primary">Select Your Answer</h3>
        <div className="space-y-3">
          {story.options.map((option) => (
            <button
              key={option}
              onClick={() => onGuess?.(option)}
              className="w-full p-4 text-left rounded-lg border-2 transition-all text-theme-primary hover:bg-indigo-50 hover:border-indigo-300"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};