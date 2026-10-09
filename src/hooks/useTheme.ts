import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof document !== 'undefined') {
    const fromAttr = document.documentElement.dataset.theme;
    if (fromAttr === 'dark' || fromAttr === 'light') {
      return fromAttr;
    }
  }
  return 'light';
}

function updateMetaThemeColor(theme: Theme) {
  if (typeof document === 'undefined') return;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#0b1220' : '#f4f6fa');
  }
}

let currentTheme: Theme = getInitialTheme();
let hasManualPreference = false;

try {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      hasManualPreference = true;
    }
  }
} catch {
  // Ignore localStorage errors
}

const listeners = new Set<(theme: Theme) => void>();

function setTheme(newTheme: Theme, isManual = true) {
  currentTheme = newTheme;
  if (isManual) {
    hasManualPreference = true;
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // Ignore localStorage errors
    }
  }
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = newTheme;
    updateMetaThemeColor(newTheme);
  }
  listeners.forEach((listener) => listener(newTheme));
}

if (typeof window !== 'undefined' && window.matchMedia) {
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const handleMediaChange = (e: MediaQueryListEvent) => {
    if (!hasManualPreference) {
      setTheme(e.matches ? 'dark' : 'light', false);
    }
  };
  mql.addEventListener('change', handleMediaChange);
}

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setLocalTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    listeners.add(setLocalTheme);
    if (currentTheme !== theme) {
      setLocalTheme(currentTheme);
    }
    return () => {
      listeners.delete(setLocalTheme);
    };
  }, [theme]);

  const toggle = () => {
    const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme, true);
  };

  return { theme, toggle };
}
