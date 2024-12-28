import { useState, useCallback, useRef } from 'react';

interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  points: Record<string, number>;
}

interface RoundScore {
  points: number;
  [key: string]: any;
}

export const useRoundManager = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [roundScores, setRoundScores] = useState<RoundScore[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const settingsRef = useRef<GameSettings | null>(null);

  const startGame = useCallback((gameSettings: GameSettings) => {
    settingsRef.current = gameSettings;
    setTimeLeft(gameSettings.timePerRound);
    setCurrentRound(1);
    setIsPlaying(true);
    setRoundScores([]);
  }, []);

  const endRound = useCallback((score: RoundScore) => {
    setRoundScores(prev => [...prev, score]);
    
    if (settingsRef.current && currentRound < settingsRef.current.totalRounds) {
      setCurrentRound(prev => prev + 1);
      setTimeLeft(settingsRef.current.timePerRound);
    } else {
      setIsPlaying(false);
    }
  }, [currentRound]);

  const decrementTime = useCallback(() => {
    setTimeLeft(prev => Math.max(0, prev - 1));
  }, []);

  const getTotalScore = useCallback(() => {
    return roundScores.reduce((total, round) => total + round.points, 0);
  }, [roundScores]);

  return {
    currentRound,
    timeLeft,
    roundScores,
    isPlaying,
    settings: settingsRef.current,
    startGame,
    endRound,
    decrementTime,
    getTotalScore
  };
};