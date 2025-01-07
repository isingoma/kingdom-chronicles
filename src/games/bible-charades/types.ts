// Add to existing types
export type GameDifficulty = 'easy' | 'medium' | 'hard';

export interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  storyMode: StoryGenerationMode;
  difficulty: GameDifficulty;
  points: {
    correct: number;
    timeBonus: number;
  };
}