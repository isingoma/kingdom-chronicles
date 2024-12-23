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
      {/* Story Image and Scripture Hint */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <img 
          src={story.imageUrl} 
          alt="Story Scene"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        
        <div className="flex items-center justify-center bg-indigo-50 p-4 rounded-lg">
          <Book className="w-6 h-6 text-indigo-600 mr-2" />
          <p className="text-lg font-semibold text-indigo-900">Hint: {story.scripture}</p>
        </div>
      </div>

      {/* Answer Options - Always shown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-center mb-6">Select Your Answer</h3>
        <div className="space-y-3">
          {story.options.map((option) => (
            <button
              key={option}
              onClick={() => onGuess?.(option)}
              className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 flex items-center space-x-3"
            >
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0" />
              <span className="text-lg">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};