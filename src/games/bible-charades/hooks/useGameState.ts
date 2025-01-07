import { useState, useCallback, useRef } from 'react';
import { storyService } from '../services/storyService';
import type { GameState, Team, GameSettings, BibleStory } from '../types';
import { analyticsService } from '../../../services/analytics/analyticsService';


interface GameStateType {
  currentStory: BibleStory | null;
  teams: Team[];
  settings: GameSettings;
  currentRound: number;
  timeLeft: number;
  isPlaying: boolean;
  roundScore: number;
  questionsAnswered: number;
  isLoading: boolean;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameStateType>({
    currentStory: null,
    teams: [],
    settings: {
      totalRounds: 5,
      timePerRound: 60,
      storyMode: 'static',
      difficulty: 'medium',
      points: { correct: 100, timeBonus: 10 }
    },
    currentRound: 0,
    timeLeft: 60,
    isPlaying: false,
    roundScore: 0,
    questionsAnswered: 0,
    isLoading: false
  });

  const storiesQueue = useRef<BibleStory[]>([]);
  const isFetchingStories = useRef(false);

  const fetchStoriesBatch = useCallback(async (mode: string, difficulty: string) => {
    if (isFetchingStories.current) return;
    
    isFetchingStories.current = true;
    try {
      const newStories = await storyService.fetchStoriesBatch(mode, 'general', difficulty);
      storiesQueue.current = [...storiesQueue.current, ...newStories];
    } catch (error) {
      console.error('Error fetching stories batch:', error);
    } finally {
      isFetchingStories.current = false;
    }
  }, []);

  const getNextStory = useCallback(async () => {
    if (storiesQueue.current.length < 3) {
      setGameState(prev => ({ ...prev, isLoading: true }));
      await fetchStoriesBatch(
        gameState.settings.storyMode,
        gameState.settings.difficulty
      );
    }

    const nextStory = storiesQueue.current.shift();
    setGameState(prev => ({ ...prev, isLoading: false, currentStory: nextStory || null }));
    return nextStory;
  }, [gameState.settings.storyMode, gameState.settings.difficulty, fetchStoriesBatch]);

  const startGame = useCallback(async (teams: Team[], settings: GameSettings) => {
    analyticsService.trackGameStart('bible-charades', settings);
    setGameState(prev => ({
      ...prev,
      teams,
      settings,
      currentRound: 1,
      timeLeft: settings.timePerRound,
      isPlaying: true,
      roundScore: 0,
      questionsAnswered: 0,
      isLoading: true
    }));

    if (settings.storyMode !== 'static') {
      await fetchStoriesBatch(settings.storyMode, settings.difficulty);
    }

    await getNextStory();
  }, [fetchStoriesBatch, getNextStory]);

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

    await getNextStory();
  }, [gameState, getNextStory]);

  const nextRound = useCallback(async () => {
    if (gameState.currentRound >= gameState.settings.totalRounds) {
      setGameState(prev => ({ ...prev, isPlaying: false }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      timeLeft: prev.settings.timePerRound,
      roundScore: 0,
      questionsAnswered: 0,
      teams: prev.teams.map(team => ({ ...team, isActing: !team.isActing })),
      isLoading: true
    }));

    await getNextStory();
  }, [gameState.currentRound, gameState.settings.totalRounds, getNextStory]);

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