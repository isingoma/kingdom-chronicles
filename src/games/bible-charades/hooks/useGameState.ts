import { useState, useEffect } from 'react';
import { BIBLE_STORIES } from '../constants/stories';
import type { GameState, Team, GameSettings, BibleStory } from '../types';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentStory: null,
    teams: [],
    settings: {
      totalRounds: 5,
      timePerRound: 60,
      points: { correct: 100, timeBonus: 10 }
    },
    currentRound: 0,
    timeLeft: 60,
    isPlaying: false,
    roundScore: 0,
    questionsAnswered: 0
  });

  const getNextStory = (usedStories: string[] = []): BibleStory => {
    const availableStories = BIBLE_STORIES.filter(
      story => !usedStories.includes(story.id)
    );
    return availableStories[Math.floor(Math.random() * availableStories.length)];
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState.isPlaying, gameState.timeLeft]);

  const startGame = (teams: Team[], settings: GameSettings) => {
    const firstStory = getNextStory();
    setGameState({
      ...gameState,
      teams,
      settings,
      currentRound: 1,
      timeLeft: settings.timePerRound,
      isPlaying: true,
      currentStory: firstStory,
      roundScore: 0,
      questionsAnswered: 0
    });
  };

  const makeGuess = (guess: string) => {
    if (!gameState.currentStory) return;

    const isCorrect = guess === gameState.currentStory.title;
    if (isCorrect) {
      const timeBonus = Math.floor(gameState.timeLeft * 0.5); // Bonus points based on remaining time
      const newScore = gameState.roundScore + 100 + timeBonus;
      
      // Get next story for the same round
      const nextStory = getNextStory([gameState.currentStory.id]);
      
      setGameState(prev => ({
        ...prev,
        currentStory: nextStory,
        roundScore: newScore,
        questionsAnswered: prev.questionsAnswered + 1
      }));
    }
  };

  const nextRound = () => {
    if (gameState.currentRound >= gameState.settings.totalRounds) {
      setGameState(prev => ({
        ...prev,
        isPlaying: false
      }));
      return;
    }

    // Update team scores with round results
    const updatedTeams = gameState.teams.map(team => ({
      ...team,
      score: team.isActing ? team.score + gameState.roundScore : team.score,
      isActing: !team.isActing
    }));

    // Start new round
    const nextStory = getNextStory();
    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      timeLeft: prev.settings.timePerRound,
      currentStory: nextStory,
      teams: updatedTeams,
      roundScore: 0,
      questionsAnswered: 0
    }));
  };

  return {
    gameState,
    startGame,
    makeGuess,
    nextRound
  };
};