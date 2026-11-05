import { useSyncExternalStore } from 'react';

let selectedSkill: string | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): string | null {
  return selectedSkill;
}

export function set(name: string | null): void {
  if (selectedSkill === name) return;
  selectedSkill = name;
  listeners.forEach((listener) => listener());
}

export const setSkillFocus = set;

export function useSkillFocus(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
