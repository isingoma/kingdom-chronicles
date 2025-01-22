import { useState, useEffect } from 'react';
import type { Theme } from '../components/ui/ThemeSelector';

export const useTheme = (page?: 'home' | 'games') => {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    // Only apply theme changes if we're on the home or games pages
    if (page === 'home' || page === 'games') {
      const root = document.documentElement;
      root.classList.remove('theme-night', 'theme-classic');
      
      if (theme === 'night') {
        root.classList.add('theme-night');
      } else if (theme === 'classic') {
        root.classList.add('theme-classic');
      }
    }
  }, [theme, page]);

  return { theme, setTheme };
};