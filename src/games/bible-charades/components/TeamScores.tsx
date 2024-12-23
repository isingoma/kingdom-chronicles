import React from 'react';
import { Trophy } from 'lucide-react';
import type { Team } from '../types';

interface TeamScoresProps {
  teams: Team[];
}

export const TeamScores: React.FC<TeamScoresProps> = ({ teams }) => {
  return (
    <div className="flex justify-center space-x-8 mb-8">
      {teams.map(team => (
        <div
          key={team.id}
          className={`bg-white rounded-lg shadow-md p-4 flex items-center space-x-3 ${
            team.isActing ? 'ring-2 ring-indigo-500' : ''
          }`}
        >
          <Trophy className={`w-5 h-5 ${team.isActing ? 'text-indigo-500' : 'text-gray-400'}`} />
          <div>
            <div className="font-semibold">{team.name}</div>
            <div className="text-sm text-gray-500">Score: {team.score}</div>
          </div>
        </div>
      ))}
    </div>
  );
};