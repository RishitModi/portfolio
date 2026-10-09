import { useState, useEffect } from 'react';
import { LEETCODE_USERNAME } from '../lib/content';

export interface LeetCodeStats {
  currentRating: string;
  maxRating: string;
  solved: string;
}

const FALLBACK: LeetCodeStats = {
  currentRating: '2055',
  maxRating: '2055',
  solved: '600+',
};

const API_URL = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/contest`;
const CACHE_KEY = 'lc-stats-v1';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const TIMEOUT_MS = 6000; // 6 seconds

interface CacheEntry {
  ts: number;
  data: LeetCodeStats;
}

interface ContestParticipationItem {
  rating?: number;
}

interface ApiResponse {
  contestRating?: number;
  contestParticipation?: ContestParticipationItem[];
}

function getValidCachedStats(): LeetCodeStats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: CacheEntry = JSON.parse(raw);
    if (typeof parsed?.ts === 'number' && parsed?.data) {
      if (Date.now() - parsed.ts < CACHE_TTL_MS) {
        return parsed.data;
      }
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

function writeCachedStats(data: LeetCodeStats): void {
  try {
    const entry: CacheEntry = {
      ts: Date.now(),
      data,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Ignore localStorage errors
  }
}

export function useLeetCodeStats(): LeetCodeStats {
  const [stats, setStats] = useState<LeetCodeStats>(() => {
    return getValidCachedStats() ?? FALLBACK;
  });

  useEffect(() => {
    const cached = getValidCachedStats();
    if (cached) {
      return;
    }

    const controller = new AbortController();
    const timerId = setTimeout(() => {
      controller.abort();
    }, TIMEOUT_MS);

    const fetchStats = async () => {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const data: ApiResponse = await res.json();

        if (typeof data.contestRating !== 'number' || !Number.isFinite(data.contestRating)) {
          throw new Error('Invalid contestRating');
        }

        const current = Math.round(data.contestRating);
        const participationRatings: number[] = [];
        if (Array.isArray(data.contestParticipation)) {
          for (const item of data.contestParticipation) {
            if (typeof item.rating === 'number' && Number.isFinite(item.rating)) {
              participationRatings.push(item.rating);
            }
          }
        }

        const max = Math.round(Math.max(current, ...participationRatings));

        const newStats: LeetCodeStats = {
          currentRating: current.toString(),
          maxRating: max.toString(),
          solved: FALLBACK.solved,
        };

        setStats(newStats);
        writeCachedStats(newStats);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (import.meta.env.DEV) {
          console.warn('Failed to fetch LeetCode stats:', err);
        }
      } finally {
        clearTimeout(timerId);
      }
    };

    fetchStats();

    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, []);

  return stats;
}
