import { useState, useEffect } from 'react';
import {
  Theme,
  getSystemTheme,
  getStoredTheme,
  setStoredTheme,
  applyTheme,
} from '@/utils/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = getStoredTheme();
    const systemTheme = getSystemTheme();
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setStoredTheme(newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
    mounted,
  };
};
