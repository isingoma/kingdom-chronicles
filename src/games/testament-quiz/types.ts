export type Testament = 'old' | 'new';

export interface BibleBook {
  name: string;
  testament: Testament;
  description: string;
}

export interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  points: {
    correct: number;
    timeBonus: number;
  };
}

export interface RoundScore {
  points: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeBonus: number;
  questions: QuestionHistory[];
}

export interface QuestionHistory {
  bookName: string;
  description: string;
  correctTestament: Testament;
  userAnswer: Testament;
  isCorrect: boolean;
}