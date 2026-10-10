import { useState, useEffect } from 'react';

/**
 * Pure function to format a timestamp into an accurate relative time string.
 * Supports timestamp in ms, ISO/date string, or Date object.
 */
export function relativeTime(input: number | string | Date, now: number = Date.now()): string {
  let time: number;
  if (typeof input === 'number') {
    time = input;
  } else if (typeof input === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      const [y, m, d] = input.split('-').map(Number);
      time = new Date(y, m - 1, d).getTime();
    } else {
      time = new Date(input).getTime();
    }
  } else if (input instanceof Date) {
    time = input.getTime();
  } else {
    return 'just now';
  }

  if (typeof time !== 'number' || Number.isNaN(time) || time > now) {
    return 'just now';
  }

  const diffMs = now - time;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) {
    return 'just now';
  }
  if (diffHours < 1) {
    return `${diffMinutes} min ago`;
  }
  if (diffDays < 1) {
    return `${diffHours} ${diffHours === 1 ? 'hr' : 'hrs'} ago`;
  }
  if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }
  if (diffDays < 30) {
    const weeks = Math.max(1, Math.floor(diffDays / 7));
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  if (diffDays < 365) {
    const months = Math.max(1, Math.floor(diffDays / 30));
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
  const years = Math.max(1, Math.floor(diffDays / 365));
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

export const formatRelativeTime = relativeTime;

/**
 * Returns current timestamp and refreshes on an interval (cleared on unmount),
 * so relative time labels tick forward without requiring a page reload.
 */
export function useNow(intervalMs = 60000): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return now;
}
