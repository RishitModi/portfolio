import { useState, useCallback } from 'react';

export interface LayoutPrefs {
  leftOpen: boolean;
  rightOpen: boolean;
}

const STORAGE_KEY = 'layout-v1';
const DEFAULT_PREFS: LayoutPrefs = {
  leftOpen: true,
  rightOpen: true,
};

function getStoredPrefs(): LayoutPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw);
    return {
      leftOpen: typeof parsed.leftOpen === 'boolean' ? parsed.leftOpen : DEFAULT_PREFS.leftOpen,
      rightOpen: typeof parsed.rightOpen === 'boolean' ? parsed.rightOpen : DEFAULT_PREFS.rightOpen,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function persistPrefs(prefs: LayoutPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore storage quota/access errors
  }
}

export function useLayoutPrefs() {
  const [prefs, setPrefs] = useState<LayoutPrefs>(getStoredPrefs);

  const toggleLeft = useCallback(() => {
    setPrefs((prev) => {
      const next = { ...prev, leftOpen: !prev.leftOpen };
      persistPrefs(next);
      return next;
    });
  }, []);

  const toggleRight = useCallback(() => {
    setPrefs((prev) => {
      const next = { ...prev, rightOpen: !prev.rightOpen };
      persistPrefs(next);
      return next;
    });
  }, []);

  return {
    ...prefs,
    toggleLeft,
    toggleRight,
  };
}
