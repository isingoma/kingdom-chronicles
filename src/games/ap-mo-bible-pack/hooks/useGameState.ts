import { useState, useCallback, useRef, useEffect } from 'react';
import { BIBLE_VERSES } from '../constants/verses';
import type { BibleVerse, PackType, RoundScore, DifficultyLevel, AnswerFeedback, VerseAttempt } from '../types';

export const useGameState = (initialPackType: PackType, initialDifficulty: DifficultyLevel, initialMaxAttempts: number) => {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse | null>(null);
  const [versesCompleted, setVersesCompleted] = useState(0);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [failedVerses, setFailedVerses] = useState<VerseAttempt[]>([]);
  
  const packTypeRef = useRef(initialPackType);
  const difficultyRef = useRef(initialDifficulty);
  const maxAttemptsRef = useRef(initialMaxAttempts);
  const currentAttemptsRef = useRef(initialMaxAttempts);
  const usedVersesRef = useRef<Set<string>>(new Set());

  const getNextVerse = useCallback(() => {
    const packVerses = BIBLE_VERSES.filter(v => 
      v.packType === packTypeRef.current && 
      !usedVersesRef.current.has(v.verse)
    );

    if (packVerses.length === 0) {
      setCurrentVerse(null);
      return;
    }

    const nextVerse = packVerses[Math.floor(Math.random() * packVerses.length)];
    usedVersesRef.current.add(nextVerse.verse);
    setCurrentVerse(nextVerse);
    currentAttemptsRef.current = maxAttemptsRef.current;
    setFeedback(null);
  }, []);

  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase().replace(/[.,!?]/g, '').trim();
    const s2 = str2.toLowerCase().replace(/[.,!?]/g, '').trim();
    
    const words1 = s1.split(' ');
    const words2 = s2.split(' ');
    
    const commonWords = words1.filter(word => words2.includes(word));
    return (commonWords.length * 2) / (words1.length + words2.length) * 100;
  };

  const checkAnswer = useCallback((answer: string | null): AnswerFeedback => {
    if (!currentVerse || currentAttemptsRef.current === 0) {
      return {
        isCorrect: false,
        similarity: 0,
        message: 'No more attempts remaining',
        attemptsLeft: 0
      };
    }

    if (answer === null) {
      // Handle skip
      setFailedVerses(prev => [...prev, {
        verse: currentVerse.verse,
        expectedAnswer: currentVerse.text,
        userAnswer: '',
        similarity: 0,
        attempts: maxAttemptsRef.current - currentAttemptsRef.current
      }]);
      getNextVerse();
      return {
        isCorrect: false,
        similarity: 0,
        message: 'Skipped verse',
        attemptsLeft: maxAttemptsRef.current
      };
    }

    const correctAnswer = difficultyRef.current === 'hard' 
      ? currentVerse.text 
      : currentVerse.text;
    
    const isCorrect = answer.toLowerCase().replace(/[.,!?]/g, '').trim() === 
                     correctAnswer.toLowerCase().replace(/[.,!?]/g, '').trim();
    
    const similarity = calculateSimilarity(answer, correctAnswer);
    currentAttemptsRef.current--;

    const feedback: AnswerFeedback = {
      isCorrect,
      similarity,
      message: isCorrect 
        ? 'Perfect! Well done!' 
        : currentAttemptsRef.current > 0
          ? `Try again! ${currentAttemptsRef.current} ${
              currentAttemptsRef.current === 1 ? 'attempt' : 'attempts'
            } remaining`
          : 'No more attempts remaining',
      attemptsLeft: currentAttemptsRef.current
    };

    if (!isCorrect && currentAttemptsRef.current === 0) {
      setFailedVerses(prev => [...prev, {
        verse: currentVerse.verse,
        expectedAnswer: currentVerse.text,
        userAnswer: answer,
        similarity,
        attempts: maxAttemptsRef.current
      }]);
      getNextVerse();
    }

    setFeedback(feedback);
    return feedback;
  }, [currentVerse, getNextVerse]);

  const calculateScore = useCallback((timeLeft: number): RoundScore => ({
    points: versesCompleted * 100 + Math.floor(timeLeft * 0.5),
    versesCompleted,
    timeBonus: Math.floor(timeLeft * 0.5),
    failedVerses
  }), [versesCompleted, failedVerses]);

  const initializeGame = useCallback((packType: PackType, difficulty: DifficultyLevel, maxAttempts: number) => {
    packTypeRef.current = packType;
    difficultyRef.current = difficulty;
    maxAttemptsRef.current = maxAttempts;
    currentAttemptsRef.current = maxAttempts;
    usedVersesRef.current.clear();
    setVersesCompleted(0);
    setFailedVerses([]);
    setFeedback(null);
    getNextVerse();
  }, [getNextVerse]);

  const resetGame = useCallback(() => {
    initializeGame(packTypeRef.current, difficultyRef.current, maxAttemptsRef.current);
  }, [initializeGame]);

  useEffect(() => {
    if (!currentVerse) {
      getNextVerse();
    }
  }, [currentVerse, getNextVerse]);

  return {
    currentVerse,
    versesCompleted,
    feedback,
    failedVerses,
    checkAnswer,
    getNextVerse,
    calculateScore,
    resetGame,
    initializeGame,
    incrementVersesCompleted: useCallback(() => {
      setVersesCompleted(prev => prev + 1);
    }, [])
  };
};