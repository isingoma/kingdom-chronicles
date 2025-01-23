import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CrownIcon, Trophy } from 'lucide-react';
import { UserMenu } from '../auth/UserMenu';
import { useThemeStore } from '../../store/useThemeStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme } = useThemeStore();
  const isGameRoute = location.pathname.startsWith('/games/');

  const getNavbarClass = () => {
    if (theme === 'night') {
      return 'bg-gray-800';
    }
    return 'bg-white';
  };

  return (
    <nav className={`${getNavbarClass()} shadow-md sticky top-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 hover-pulse">
              <CrownIcon className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-theme-primary">Kingdom Chronicles</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/games" 
                className="text-theme-secondary hover:text-theme-primary px-3 py-2 rounded-md transition-all duration-300 hover:bg-indigo-50"
              >
                Games
              </Link>
              <Link 
                to="/leaderboard" 
                className="flex items-center text-theme-secondary hover:text-theme-primary px-3 py-2 rounded-md transition-all duration-300 hover:bg-indigo-50"
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