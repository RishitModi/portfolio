import { useEffect, useState } from 'react';
import { LEETCODE_FALLBACK_UPDATED_AT } from '../lib/content';
import { useCpData } from './useCpData';

export interface LeetCodeStats {
  currentRating: string;
  maxRating: string;
  solved: string;
  badge: string | null;
  contests: number;
  topPercentage: number | null;
  history: number[];
  updatedAt: number | string;
}

// Snapshot of 2026-11-05; the deploy-time stats job overrides these when it succeeds.
const FALLBACK: LeetCodeStats = {
  currentRating: '2096',
  maxRating: '2142',
  solved: '722',
  badge: null,
  contests: 35,
  topPercentage: 1.61,
  history: [],
  updatedAt: LEETCODE_FALLBACK_UPDATED_AT,
};

export function useLeetCodeStats(): LeetCodeStats {
  const { data } = useCpData();
  const [stats, setStats] = useState(FALLBACK);

  useEffect(() => {
    const source = data?.leetcode;
    if (!source) return;
    setStats({
      currentRating: source.rating.toString(),
      maxRating: source.maxRating.toString(),
      solved: source.solved.toString(),
      badge: source.badge,
      contests: source.contests,
      topPercentage: source.topPercentage,
      history: Array.isArray(source.history) && source.history.every(Number.isFinite)
        ? source.history.slice(-30)
        : [],
      updatedAt: data.generatedAt,
    });
  }, [data]);

  return stats;
}
