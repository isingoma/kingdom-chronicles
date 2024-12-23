import React, { useEffect, useCallback } from 'react';
import { Ship } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import { useRoundManager } from '../shared/hooks/useRoundManager';
import { useGameScore } from '../../hooks/useGameScore';
import { RoundTimer } from '../../components/game/RoundTimer';
import { ArkGameSetup } from './components/ArkGameSetup';
import { ResourceList } from './components/ResourceList';
import type { GameSettings } from './types';

export const ArkEscape: React.FC = () => {
  const {
    resources,
    collectResource,
    calculateScore,
    resetGame
  } = useGameState();

  const {
    currentRound,
    timeLeft,
    isPlaying,
    settings,
    startGame,
    endRound,
    decrementTime,
    getTotalScore
  } = useRoundManager();

  const { handleScoreUpdate } = useGameScore('ark-escape');

  const handleRoundEnd = useCallback(() => {
    const score = calculateScore(timeLeft);
    handleScoreUpdate(score.points);
    endRound(score);
    resetGame();
  }, [calculateScore, handleScoreUpdate, endRound, resetGame, timeLeft]);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(decrementTime, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, decrementTime]);

  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      handleRoundEnd();
    }
  }, [isPlaying, timeLeft, handleRoundEnd]);

  const handleGameStart = useCallback((gameSettings: GameSettings) => {
    resetGame();
    startGame(gameSettings);
  }, [resetGame, startGame]);

  if (!isPlaying || !settings) {
    return <ArkGameSetup onGameStart={handleGameStart} />;
  }

  const isRoundComplete = resources.every(r => r.collected >= r.required);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Round {currentRound} of {settings.totalRounds}</h2>
        <RoundTimer timeLeft={timeLeft} />
        <div className="mt-2">
          <span className="font-semibold">Total Score: </span>
          <span className="text-indigo-600">{getTotalScore()}</span>
        </div>
      </div>

      <ResourceList
        resources={resources}
        onCollect={collectResource}
        disabled={timeLeft === 0}
      />

      {isRoundComplete && (
        <div className="mt-8 text-center bg-green-100 p-6 rounded-lg">
          <Ship className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Round Complete!</h2>
          <p className="text-green-700">
            You've gathered all the resources needed for this round!
          </p>
        </div>
      )}
    </div>
  );
};