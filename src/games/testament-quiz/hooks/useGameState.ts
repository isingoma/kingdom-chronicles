import { useState, useCallback } from 'react';
import { BIBLE_BOOKS } from '../constants/books';
import type { BibleBook, Testament, RoundScore } from '../types';

export const useGameState = () => {
  const [currentBook, setCurrentBook] = useState<BibleBook>(() => 
    BIBLE_BOOKS[Math.floor(Math.random() * BIBLE_BOOKS.length)]
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [lastGuessCorrect, setLastGuessCorrect] = useState<boolean | null>(null);

  const getNextBook = useCallback(() => {
    const currentIndex = BIBLE_BOOKS.findIndex(b => b.name === currentBook.name);
    const remainingBooks = BIBLE_BOOKS.filter((_, index) => index !== currentIndex);
    const nextBook = remainingBooks[Math.floor(Math.random() * remainingBooks.length)];
    setCurrentBook(nextBook);
  }, [currentBook]);

  const makeGuess = useCallback((testament: Testament) => {
    if (testament === currentBook.testament) {
      setCorrectAnswers(prev => prev + 1);
      setLastGuessCorrect(true);
    } else {
      setWrongAnswers(prev => prev + 1);
      setLastGuessCorrect(false);
    }
    
    // Switch to next book after a short delay
    setTimeout(() => {
      getNextBook();
      setLastGuessCorrect(null);
    }, 1000);
  }, [currentBook, getNextBook]);

  const calculateScore = useCallback((timeLeft: number): RoundScore => {
    const basePoints = (correctAnswers * 100) - (wrongAnswers * 50);
    const timeBonus = Math.floor(timeLeft * 0.5);
    
    return {
      points: Math.max(0, basePoints + timeBonus),
      correctAnswers,
      wrongAnswers,
      timeBonus
    };
  }, [correctAnswers, wrongAnswers]);

  const resetGame = useCallback(() => {
    setCurrentBook(BIBLE_BOOKS[Math.floor(Math.random() * BIBLE_BOOKS.length)]);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setLastGuessCorrect(null);
  }, []);

  return {
    currentBook,
    makeGuess,
    calculateScore,
    resetGame,
    correctAnswers,
    wrongAnswers,
    lastGuessCorrect
  };
};