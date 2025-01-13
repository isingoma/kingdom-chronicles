import React from 'react';
import { Book, AlertTriangle } from 'lucide-react';
import type { BibleVerse, AnswerFeedback } from '../types';

interface VerseDisplayProps {
  verse: BibleVerse | null;
  feedback: AnswerFeedback | null;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const VerseDisplay: React.FC<VerseDisplayProps> = ({ verse, feedback, difficulty = 'medium' }) => {
  if (!verse) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-amber-600">No More Verses Available</h2>
        <p className="text-gray-600">
          You have completed all verses in this pack! The game will end shortly.
        </p>
      </div>
    );
  }

  const getDisplayText = () => {
    if (difficulty === 'hard') {
      return 'Type the complete verse';
    }

    const words = verse.text.split(' ');
    if (difficulty === 'easy') {
      return words.slice(0, 4).join(' ') + '...';
    }
    return words.slice(0, 3).join(' ') + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
      <div className="flex justify-center mb-4">
        <Book className="w-12 h-12 text-indigo-600" />
      </div>
      
      {/* Always show scripture reference */}
      <h2 className="text-2xl font-bold mb-4">{verse.verse}</h2>
      
      <div className="bg-indigo-50 p-4 rounded-lg">
        <p className="text-lg text-indigo-900">{getDisplayText()}</p>
      </div>
      
      {feedback && (
        <div className={`mt-4 p-4 rounded-lg transition-all ${
          feedback.isCorrect ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <p className={feedback.isCorrect ? 'text-green-800' : 'text-red-800'}>
            {feedback.message}
          </p>
          {!feedback.isCorrect && feedback.similarity > 0 && (
            <p className="text-sm mt-2">
              Similarity: {Math.round(feedback.similarity)}%
            </p>
          )}
        </div>
      )}
    </div>
  );
};