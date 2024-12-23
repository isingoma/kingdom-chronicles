export interface BibleStory {
  id: string;
  title: string;
  description: string;
  scripture: string;
  imageUrl: string;
  options: string[];
  devotional: string;
}

export interface Team {
  id: string;
  name: string;
  score: number;
  isActing: boolean;
}

export interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  points: {
    correct: number;
    timeBonus: number;
  };
}

export interface GameState {
  currentStory: BibleStory | null;
  teams: Team[];
  settings: GameSettings;
  currentRound: number;
  timeLeft: number;
  isPlaying: boolean;
  roundScore: number;
  questionsAnswered: number;
}