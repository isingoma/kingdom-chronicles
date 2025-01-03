import { useState, useCallback } from 'react';
import { storyService } from '../services/storyService';
import type { GameState, Team, GameSettings, BibleStory } from '../types';
import { analyticsService } from '../../../services/analytics/analyticsService';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentStory: null,
    teams: [],
    settings: {
      totalRounds: 5,
      timePerRound: 60,
      storyMode: 'static',
      points: { correct: 100, timeBonus: 10 }
    },
    currentRound: 0,
    timeLeft: 60,
    isPlaying: false,
    roundScore: 0,
    questionsAnswered: 0
  });

  const startGame = useCallback(async (teams: Team[], settings: GameSettings) => {
    // Track game start
    analyticsService.trackGameStart('bible-charades', settings);
    setGameState(prev => ({
      ...prev,
      teams,
      settings,
      currentRound: 1,
      timeLeft: settings.timePerRound,
      isPlaying: true,
      roundScore: 0,
      questionsAnswered: 0
    }));

    try {
      const firstStory = await storyService.getNextStory(
        settings.storyMode,
        'general',
        'easy'
      );
      if (firstStory) {
        setGameState(prev => ({ ...prev, currentStory: firstStory }));
      }
    } catch (error) {
      console.error('Error getting first story:', error);
    }
  }, []);

  const makeGuess = useCallback(async (guess: string) => {
    if (!gameState.currentStory) return;

    const isCorrect = guess === gameState.currentStory.options[0];
    const points = isCorrect ? gameState.settings.points.correct : 0;
    const timeBonus = Math.floor(gameState.timeLeft * gameState.settings.points.timeBonus);

    setGameState(prev => ({
      ...prev,
      roundScore: prev.roundScore + points + timeBonus,
      questionsAnswered: prev.questionsAnswered + 1,
      teams: prev.teams.map(team => ({
        ...team,
        score: team.isActing ? team.score + points + timeBonus : team.score
      }))
    }));

    try {
      const nextStory = await storyService.getNextStory(
        gameState.settings.storyMode,
        'general',
        gameState.currentRound <= 2 ? 'easy' : gameState.currentRound <= 4 ? 'medium' : 'hard'
      );
      if (nextStory) {
        setGameState(prev => ({ ...prev, currentStory: nextStory }));
      }
    } catch (error) {
      console.error('Error getting next story:', error);
    }
  }, [gameState]);

  const nextRound = useCallback(async () => {

    // Track round end
    const duration = gameState.settings?.timePerRound 
      ? gameState.settings.timePerRound - gameState.timeLeft 
      : 0;
    
    analyticsService.trackGameEvent('round_end', 'bible-charades', {
      round: gameState.currentRound,
      score: gameState.roundScore,
      duration
    });

    
    if (gameState.currentRound >= gameState.settings.totalRounds) {

      // Track game end
      analyticsService.trackGameEnd(
        'bible-charades', 
        gameState.roundScore,
        duration
      );
      
      setGameState(prev => ({ ...prev, isPlaying: false }));
      return;
    }

    try {
      const nextStory = await storyService.getNextStory(
        gameState.settings.storyMode,
        'general',
        gameState.currentRound <= 2 ? 'easy' : gameState.currentRound <= 4 ? 'medium' : 'hard'
      );
      if (nextStory) {
        setGameState(prev => ({
          ...prev,
          currentRound: prev.currentRound + 1,
          timeLeft: prev.settings.timePerRound,
          currentStory: nextStory,
          roundScore: 0,
          questionsAnswered: 0,
          teams: prev.teams.map(team => ({ ...team, isActing: !team.isActing }))
        }));
      }
    } catch (error) {
      console.error('Error getting next story:', error);
    }
  }, [gameState]);

  const decrementTime = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      timeLeft: Math.max(0, prev.timeLeft - 1)
    }));
  }, []);

  return {
    gameState,
    startGame,
    makeGuess,
    nextRound,
    decrementTime
  };
};