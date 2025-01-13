import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { TimeSelector } from '../../shared/components/TimeSelector';
import { RoundSelector } from '../../shared/components/RoundSelector';
import { PackTypeSelector } from './PackTypeSelector';
import { DifficultySelector } from './DifficultySelector';
import { DEFAULT_SETTINGS } from '../../shared/constants/gameSettings';
import type { GameSettings, PackType, DifficultyLevel } from '../types';

interface GameSetupProps {
  onGameStart: (settings: GameSettings) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onGameStart }) => {
  const [rounds, setRounds] = useState(DEFAULT_SETTINGS.rounds);
  const [timePerRound, setTimePerRound] = useState(DEFAULT_SETTINGS.timePerRound);
  const [packType, setPackType] = useState<PackType>('healing');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [maxAttempts, setMaxAttempts] = useState(3);

  const handleStartGame = () => {
    const settings: GameSettings = {
      totalRounds: rounds,
      timePerRound,
      packType,
      difficulty,
      maxAttempts,
      points: {
        correct: 100,
        timeBonus: 0.5
      }
    };
    onGameStart(settings);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <Settings className="w-12 h-12 text-indigo-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">Game Setup</h2>
      
      <div className="space-y-4 mb-6">
        <PackTypeSelector value={packType} onChange={setPackType} />
        <DifficultySelector value={difficulty} onChange={setDifficulty} />
        <RoundSelector value={rounds} onChange={setRounds} />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time per Round
          </label>
          <select
            value={timePerRound}
            onChange={(e) => setTimePerRound(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={60}>1 Minute</option>
            <option value={180}>3 Minutes</option>
            <option value={300}>5 Minutes</option>
            <option value={420}>7 Minutes</option>
            <option value={600}>10 Minutes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attempts per Question
          </label>
          <select
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Attempt' : 'Attempts'}</option>
            ))}
          </select>
        </div>
      </div>

      <Button onClick={handleStartGame} className="w-full">
        Start Game
      </Button>
    </div>
  );
};