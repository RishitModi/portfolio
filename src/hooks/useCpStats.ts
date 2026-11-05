import { useEffect, useState } from 'react';
import { CODECHEF_STATS, CP_FALLBACK } from '../lib/content';
import { useCpData } from './useCpData';

export interface CodeforcesData {
  rating: number;
  maxRating: number;
  rank: string;
  maxRank?: string;
  solved: number | null;
  contests: number;
  history?: number[];
}

export interface CodechefData {
  rating: number;
  maxRating: number;
  stars: number;
  globalRank: number;
  countryRank?: number;
  solved: number;
  contests: number;
  history?: number[];
}

export function useCodeforcesStats(): { data: CodeforcesData; updatedAt: number | string } {
  const { data } = useCpData();
  const [state, setState] = useState<{ data: CodeforcesData; updatedAt: number | string }>({
    data: CP_FALLBACK.codeforces,
    updatedAt: CP_FALLBACK.codeforces.updatedAt,
  });

  useEffect(() => {
    const source = data?.codeforces;
    if (!source) return;
    setState({
      data: {
        rating: source.rating,
        maxRating: source.maxRating,
        rank: source.rank ?? CP_FALLBACK.codeforces.rank,
        maxRank: source.maxRank ?? CP_FALLBACK.codeforces.maxRank,
        solved: source.solved ?? null,
        contests: source.contests ?? CP_FALLBACK.codeforces.contests,
        history: source.history,
      },
      updatedAt: data.generatedAt,
    });
  }, [data]);

  return state;
}

export function useCodechefStats(): { data: CodechefData; updatedAt: number | string } {
  const { data } = useCpData();
  const [state, setState] = useState<{ data: CodechefData; updatedAt: number | string }>({
    data: CODECHEF_STATS,
    updatedAt: CODECHEF_STATS.updatedAt,
  });

  useEffect(() => {
    const source = data?.codechef;
    if (!source) return;
    setState({
      data: {
        rating: source.rating,
        maxRating: source.maxRating,
        stars: source.stars ?? CODECHEF_STATS.stars,
        globalRank: source.globalRank ?? CODECHEF_STATS.globalRank,
        countryRank: source.countryRank,
        solved: source.solved ?? CODECHEF_STATS.solved,
        contests: source.contests ?? CODECHEF_STATS.contests,
        history: source.history,
      },
      updatedAt: data.generatedAt,
    });
  }, [data]);

  return state;
}
