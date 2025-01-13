import { useState, useCallback, useEffect } from 'react';
import { BIBLE_VERSES } from '../constants/verses';
import type { BibleVerse, RoundScore } from '../types';

export const useGameState = () => {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse>(BIBLE_VERSES[0]);
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
  const [versesFound, setVersesFound] = useState(0);

  // Get next random verse
  const getNextVerse = useCallback(() => {
    const currentIndex = BIBLE_VERSES.findIndex(v => v.reference === currentVerse.reference);
    const remainingVerses = BIBLE_VERSES.filter((_, index) => index !== currentIndex);
    const nextVerse = remainingVerses[Math.floor(Math.random() * remainingVerses.length)];
    setCurrentVerse(nextVerse);
  }, [currentVerse]);

  // Check verse and update state when selected
  useEffect(() => {
    if (selectedVerse) {
      if (selectedVerse === currentVerse.reference) {
        setVersesFound(prev => prev + 1);
      }
      // Wait a moment before switching to next verse
      setTimeout(() => {
        getNextVerse();
        setSelectedVerse(null);
      }, 1500);
    }
  }, [selectedVerse, currentVerse, getNextVerse]);

  const calculateScore = useCallback((timeLeft: number): RoundScore => {
    const basePoints = versesFound * 100;
    const timeBonus = Math.floor(timeLeft * 0.5);
    
    return {
      points: basePoints + timeBonus,
      versesFound,
      timeBonus
    };
  }, [versesFound]);

  const resetGame = useCallback(() => {
    const randomVerse = BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
    setCurrentVerse(randomVerse);
    setSelectedVerse(null);
    setVersesFound(0);
  }, []);

  return {
    currentVerse,
    selectedVerse,
    setSelectedVerse,
    calculateScore,
    resetGame,
    versesFound
  };
};