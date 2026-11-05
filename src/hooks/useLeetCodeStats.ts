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
  history?: number[];
  updatedAt: number | string;
}

const FALLBACK: LeetCodeStats = {
  currentRating: '2096',
  maxRating: '2142',
  solved: '693',
  badge: null,
  contests: 0,
  topPercentage: null,
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
      history: source.history,
      updatedAt: data.generatedAt,
    });
  }, [data]);

  return stats;
}
