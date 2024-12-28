import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from './components/Timer';
import { GameSetup } from './components/GameSetup';
import { StoryDisplay } from './components/StoryDisplay';
import { TeamScores } from './components/TeamScores';
import { GameOver } from './components/GameOver';
import { useGameState } from './hooks/useGameState';

export const BibleCharades: React.FC = () => {
  const { 
    gameState, 
    startGame, 
    makeGuess, 
    nextRound,
    decrementTime 
  } = useGameState();

  const { 
    currentStory, 
    teams, 
    currentRound, 
    timeLeft, 
    isPlaying, 
    roundScore,
    settings,
    questionsAnswered
  } = gameState;

  // Timer effect
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, decrementTime]);

  // Handle round end
  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      nextRound();
    }
  }, [isPlaying, timeLeft, nextRound]);

  if (!isPlaying) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Bible Charades</h1>
        {currentRound === 0 ? (
          <GameSetup onGameStart={startGame} />
        ) : (
          <GameOver teams={teams} onPlayAgain={() => window.location.reload()} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Round {currentRound} of {settings.totalRounds}</h2>
        <div className="mt-2 space-y-1">
          <p className="text-green-600">Questions Answered: {questionsAnswered}</p>
          <p className="text-indigo-600">Round Score: {roundScore}</p>
        </div>
      </div>

      <TeamScores teams={teams} />

      <div className="mb-8">
        <Timer timeLeft={timeLeft} />
      </div>

      <AnimatePresence mode="wait">
        {currentStory && timeLeft > 0 && (
          <motion.div
            key={currentStory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <StoryDisplay 
              story={currentStory}
              onGuess={makeGuess}
            />
          </motion.div>
        )}

        {timeLeft === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-bold mb-4">Time's Up!</h3>
            <div className="mb-6">
              <p className="text-lg mb-2">Round Summary:</p>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="font-semibold">Questions Answered: {questionsAnswered}</p>
                <p className="font-semibold">Total Score: {roundScore}</p>
              </div>
            </div>
            <button
              onClick={nextRound}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              {currentRound < settings.totalRounds ? 'Next Round' : 'End Game'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};