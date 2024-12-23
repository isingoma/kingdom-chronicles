import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FeatureCard } from '../components/features/FeatureCard';
import { GameIcon, UsersIcon, TrophyIcon } from '../components/icons';

const features = [
  {
    icon: GameIcon,
    title: 'Exciting Mini-Games',
    description: 'Experience Bible stories through interactive challenges and adventures'
  },
  {
    icon: UsersIcon,
    title: 'Multiplayer Fun',
    description: 'Team up with friends and compete in exciting challenges together'
  },
  {
    icon: TrophyIcon,
    title: 'Earn Rewards',
    description: 'Collect points, unlock achievements, and climb the leaderboards'
  }
];

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Kingdom Chronicles
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join an epic journey through Bible-inspired mini-games. Build your kingdom, 
            compete with friends, and discover timeless wisdom along the way.
          </p>
          
          <div className="flex justify-center space-x-4 mb-16">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/games">
              <Button variant="outline" size="lg">Browse Games</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};