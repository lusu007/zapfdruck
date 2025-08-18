export type Theme = 'light' | 'dark';

export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('theme') as Theme;
};

export const setStoredTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
};

export const applyTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;
  const body = document.body;

  if (theme === 'dark') {
    html.classList.add('dark');
    html.setAttribute('data-theme', 'dark');
    body.classList.add('dark');
  } else {
    html.classList.remove('dark');
    html.setAttribute('data-theme', 'light');
    body.classList.remove('dark');
  }
};
