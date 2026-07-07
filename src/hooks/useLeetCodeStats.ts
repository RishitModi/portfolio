import { useState, useEffect } from 'react';

interface LeetCodeStats {
  currentRating: string;
  maxRating: string;
  solved: string;
}

const FALLBACK: LeetCodeStats = {
  currentRating: '1995',
  maxRating: '1995',
  solved: '600+',
};

export function useLeetCodeStats(): LeetCodeStats {
  const [stats, setStats] = useState<LeetCodeStats>(FALLBACK);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          'https://alfa-leetcode-api.onrender.com/modeiji09/contest'
        );

        if (res.ok) {
          const data = await res.json();
          const current = Math.round(data.contestRating);
          const max = Math.round(
            data.contestTopPercentage !== undefined
              ? Math.max(current, ...((data.contestParticipation ?? []) as { rating: number }[]).map((c: { rating: number }) => c.rating))
              : current
          );

          setStats({
            currentRating: current ? current.toString() : FALLBACK.currentRating,
            maxRating: max ? max.toString() : FALLBACK.maxRating,
            solved: FALLBACK.solved, // always static
          });
        }
      } catch (error) {
        console.error('Failed to fetch LeetCode stats:', error);
        // fallback values already set via initial state
      }
    };

    fetchStats();
  }, []);

  return stats;
}
