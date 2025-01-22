import React from 'react';
import { Trophy, RotateCcw, X, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { RoundScore } from '../types';

interface GameOverProps {
  scores: RoundScore[];
  onPlayAgain: () => void;
  onExit: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ scores, onPlayAgain, onExit }) => {
  const totalScore = scores.reduce((sum, score) => sum + score.points, 0);
  const totalCorrect = scores.reduce((sum, score) => sum + score.correctAnswers, 0);
  const totalWrong = scores.reduce((sum, score) => sum + score.wrongAnswers, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <div className="flex justify-center mb-6">
        <Trophy className="w-16 h-16 text-yellow-500" />
      </div>

      <h2 className="text-3xl font-bold text-center mb-6">Game Complete!</h2>

      <div className="space-y-6 mb-8">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Final Score: {totalScore}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-green-600">Correct: {totalCorrect}</p>
              <p className="text-red-600">Wrong: {totalWrong}</p>
            </div>
            <div>
              <p className="text-gray-600">Accuracy: {Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100)}%</p>
            </div>
          </div>
        </div>

        {scores.map((score, roundIndex) => (
          <div key={roundIndex} className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-medium text-lg mb-4">Round {roundIndex + 1}</h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p>Score: {score.points}</p>
                <p className="text-green-600">Correct: {score.correctAnswers}</p>
                <p className="text-red-600">Wrong: {score.wrongAnswers}</p>
                <p className="text-indigo-600">Time Bonus: {score.timeBonus}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-medium">Questions:</h5>
              {score.questions.map((question, qIndex) => (
                <div 
                  key={qIndex}
                  className={`p-4 rounded-lg ${
                    question.isCorrect ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="flex items-start">
                    {question.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-1 mr-2 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium">{question.bookName}</p>
                      <p className="text-sm text-gray-600">{question.description}</p>
                      <div className="mt-2 text-sm">
                        <p>
                          <span className="font-medium">Correct Testament:</span>{' '}
                          <span className="text-green-600 capitalize">{question.correctTestament}</span>
                        </p>
                        <p>
                          <span className="font-medium">Your Answer:</span>{' '}
                          <span className={`capitalize ${
                            question.isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {question.userAnswer}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <Button onClick={onPlayAgain} className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
        <Button onClick={onExit} variant="outline" className="flex-1">
          <X className="w-4 h-4 mr-2" />
          Exit
        </Button>
      </div>
    </div>
  );
};