import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from './Button';
import { analyticsService } from '../../services/analytics/analyticsService';

export type Theme = 'default' | 'night' | 'classic';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const handleThemeChange = () => {
    const themes: Theme[] = ['default', 'night', 'classic'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    // Track theme change in analytics
    analyticsService.trackEvent({
      category: 'Theme',
      action: 'change_theme',
      label: nextTheme,
      value: 1
    });

    onThemeChange(nextTheme);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleThemeChange}
          className="flex items-center space-x-2"
        >
          <Palette className="w-4 h-4" />
          <span>Change Theme</span>
        </Button>
      </div>
    </div>
  );
};