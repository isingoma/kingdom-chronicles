import React, { useEffect, useState } from 'react';
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable';
import { scoreService } from '../services/scores/scoreService';
import type { LeaderboardEntry } from '../services/scores/types';

export const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await scoreService.getLeaderboard();
        setEntries(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Global Leaderboard</h1>
      <LeaderboardTable entries={entries} isLoading={isLoading} />
    </div>
  );
};