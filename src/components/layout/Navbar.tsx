import React from 'react';
import { Link } from 'react-router-dom';
import { CrownIcon, Trophy } from 'lucide-react';
import { UserMenu } from '../auth/UserMenu';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <CrownIcon className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Kingdom Chronicles</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/games" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                Games
              </Link>
              <Link 
                to="/leaderboard" 
                className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                <Trophy className="w-4 h-4 mr-1" />
                Leaderboard
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};