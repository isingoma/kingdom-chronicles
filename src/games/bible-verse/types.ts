export interface BibleVerse {
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
  options: string[]; // Array of verse reference options
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
  versesFound: number;
  timeBonus: number;
}