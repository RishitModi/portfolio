import { useState, useEffect } from 'react';

export function useLeetCodeStats() {
  const [stats, setStats] = useState({
    rating: '1839',
    solved: '250+'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contestRes, solvedRes] = await Promise.all([
          fetch('https://alfa-leetcode-api.onrender.com/modeiji09/contest'),
          fetch('https://alfa-leetcode-api.onrender.com/modeiji09/solved')
        ]);
        
        if (contestRes.ok && solvedRes.ok) {
          const contestData = await contestRes.json();
          const solvedData = await solvedRes.json();
          
          setStats({
            rating: Math.round(contestData.contestRating).toString() || '1839',
            solved: solvedData.solvedProblem ? `${solvedData.solvedProblem}+` : '250+'
          });
        }
      } catch (error) {
        console.error('Failed to fetch LeetCode stats:', error);
      }
    };

    fetchStats();
  }, []);

  return stats;
}
