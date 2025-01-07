// Add to existing types
export type GameDifficulty = 'easy' | 'medium' | 'hard';

export interface StoryImage {
  url: string;
  alt: string;
}

export interface BibleStory {
  id: string;
  title: string;
  description: string;
  scripture: string;
  difficulty: string;
  images: StoryImage[];
  fallbackDescription: string;
  options: string[];
  devotional: string;
}

export interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  storyMode: StoryGenerationMode;
  difficulty: GameDifficulty;
  points: {
    correct: number;
    timeBonus: number;
  }
}