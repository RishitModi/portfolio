import { useEffect, useState } from 'react';
import { CP_FALLBACK, HANDLES } from '../lib/content';

// Community-maintained unofficial CodeChef endpoint.
// If this endpoint goes down, changes shape, or rate-limits, CP_FALLBACK.codechef is used automatically.
const CODECHEF_API_URL = 'https://codechef-api.vercel.app/handle';

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const TIMEOUT_MS = 6000; // 6 seconds

const CF_CACHE_KEY = 'cf-stats-v1';
const CC_CACHE_KEY = 'cc-stats-v1';

export interface CodeforcesData {
  rating: number;
  maxRating: number;
  rank: string;
  solved: number | null;
  contests: number;
  history?: number[];
}

export interface CodechefData {
  rating: number;
  maxRating: number;
  stars: number;
  globalRank: number;
  solved: number;
  contests: number;
  history?: number[];
}

interface CacheEntry<T> {
  ts: number;
  data: T;
}

function getCached<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed: CacheEntry<T> = JSON.parse(raw);
    if (typeof parsed?.ts === 'number' && parsed.data) {
      if (Date.now() - parsed.ts < CACHE_TTL_MS) {
        return parsed;
      }
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

function setCached<T>(key: string, data: T, ts: number = Date.now()): void {
  try {
    const entry: CacheEntry<T> = {
      ts,
      data,
    };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Ignore localStorage errors
  }
}

// ─── Codeforces Response Interfaces ──────────────────────────────────────────

interface CfUserItem {
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
}

interface CfUserInfoResponse {
  status: string;
  result?: CfUserItem[];
}

interface CfRatingItem {
  newRating?: number;
  ratingUpdateTimeSeconds?: number;
  contestName?: string;
}

interface CfUserRatingResponse {
  status: string;
  result?: CfRatingItem[];
}

interface CfProblemItem {
  contestId?: number;
  index?: string;
}

interface CfSubmissionItem {
  verdict?: string;
  problem?: CfProblemItem;
}

interface CfUserStatusResponse {
  status: string;
  result?: CfSubmissionItem[];
}

// ─── CodeChef Response Interfaces ────────────────────────────────────────────

interface CcRatingHistoryItem {
  rating?: number | string;
}

interface CcApiResponse {
  currentRating?: number | string;
  highestRating?: number | string;
  stars?: string | number;
  globalRank?: number | string;
  countryRank?: number | string;
  ratingData?: CcRatingHistoryItem[];
  fullySolved?: { count?: number | string };
  solved?: number | string;
  contests?: number | string;
}

// ─── Hook: useCodeforcesStats ────────────────────────────────────────────────

export function useCodeforcesStats(): {
  data: CodeforcesData;
  updatedAt: number | string;
} {
  const [state, setState] = useState<{
    data: CodeforcesData;
    updatedAt: number | string;
  }>(() => {
    const cached = getCached<CodeforcesData>(CF_CACHE_KEY);
    if (cached) {
      return { data: cached.data, updatedAt: cached.ts };
    }
    return { data: CP_FALLBACK.codeforces, updatedAt: CP_FALLBACK.codeforces.updatedAt };
  });

  useEffect(() => {
    if (getCached<CodeforcesData>(CF_CACHE_KEY)) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, TIMEOUT_MS);

    const fetchStats = async () => {
      try {
        const handle = HANDLES.codeforces;
        const [infoResult, ratingResult, statusResult] = await Promise.allSettled([
          fetch(`https://codeforces.com/api/user.info?handles=${handle}`, { signal: controller.signal }),
          fetch(`https://codeforces.com/api/user.rating?handle=${handle}`, { signal: controller.signal }),
          fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`, { signal: controller.signal }),
        ]);

        if (infoResult.status !== 'fulfilled' || !infoResult.value.ok) {
          throw new Error('Codeforces user.info request failed');
        }

        const infoJson: CfUserInfoResponse = await infoResult.value.json();
        if (infoJson.status !== 'OK' || !Array.isArray(infoJson.result) || infoJson.result.length === 0) {
          throw new Error('Codeforces user.info returned non-OK status');
        }

        const user = infoJson.result[0];
        if (typeof user.rating !== 'number' || !Number.isFinite(user.rating)) {
          throw new Error('Codeforces rating is invalid');
        }

        const rating = user.rating;
        const maxRating =
          typeof user.maxRating === 'number' && Number.isFinite(user.maxRating)
            ? user.maxRating
            : rating;
        const rank = typeof user.rank === 'string' && user.rank ? user.rank : CP_FALLBACK.codeforces.rank;

        let contests = CP_FALLBACK.codeforces.contests;
        let history: number[] | undefined;

        if (ratingResult.status === 'fulfilled' && ratingResult.value.ok) {
          try {
            const ratingJson: CfUserRatingResponse = await ratingResult.value.json();
            if (ratingJson.status === 'OK' && Array.isArray(ratingJson.result)) {
              contests = ratingJson.result.length;
              const points = ratingJson.result
                .map((r) => r.newRating)
                .filter((r): r is number => typeof r === 'number' && Number.isFinite(r))
                .slice(-30);
              if (points.length > 0) {
                history = points;
              }
            }
          } catch {
            // Optional endpoint error ignored
          }
        }

        let solved: number | null = null;
        if (statusResult.status === 'fulfilled' && statusResult.value.ok) {
          try {
            const statusJson: CfUserStatusResponse = await statusResult.value.json();
            if (statusJson.status === 'OK' && Array.isArray(statusJson.result)) {
              const solvedSet = new Set<string>();
              for (const sub of statusJson.result) {
                if (sub.verdict === 'OK' && sub.problem?.contestId && sub.problem.index) {
                  solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
                }
              }
              solved = solvedSet.size;
            }
          } catch {
            solved = null;
          }
        }

        const parsedData: CodeforcesData = {
          rating,
          maxRating,
          rank,
          solved,
          contests,
          ...(history && history.length > 0 ? { history } : {}),
        };

        const now = Date.now();
        setState({ data: parsedData, updatedAt: now });
        setCached(CF_CACHE_KEY, parsedData, now);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (import.meta.env.DEV) {
          console.warn('Failed to fetch Codeforces stats:', err);
        }
        setState({ data: CP_FALLBACK.codeforces, updatedAt: CP_FALLBACK.codeforces.updatedAt });
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchStats();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return state;
}

// ─── Hook: useCodechefStats ──────────────────────────────────────────────────

export function useCodechefStats(): {
  data: CodechefData;
  updatedAt: number | string;
} {
  const [state, setState] = useState<{
    data: CodechefData;
    updatedAt: number | string;
  }>(() => {
    const cached = getCached<CodechefData>(CC_CACHE_KEY);
    if (cached) {
      return { data: cached.data, updatedAt: cached.ts };
    }
    return { data: CP_FALLBACK.codechef, updatedAt: CP_FALLBACK.codechef.updatedAt };
  });

  useEffect(() => {
    if (getCached<CodechefData>(CC_CACHE_KEY)) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, TIMEOUT_MS);

    const fetchStats = async () => {
      try {
        const handle = HANDLES.codechef;
        const res = await fetch(`${CODECHEF_API_URL}/${handle}`, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`CodeChef request failed with HTTP ${res.status}`);
        }

        const json: CcApiResponse = await res.json();

        const currentNum =
          typeof json.currentRating === 'number'
            ? json.currentRating
            : Number(json.currentRating);

        if (!Number.isFinite(currentNum)) {
          throw new Error('CodeChef response missing valid currentRating');
        }

        const rating = Math.round(currentNum);

        const highestNum =
          typeof json.highestRating === 'number'
            ? json.highestRating
            : Number(json.highestRating);
        const maxRating = Number.isFinite(highestNum) ? Math.round(highestNum) : rating;

        let stars = CP_FALLBACK.codechef.stars;
        if (typeof json.stars === 'number' && Number.isFinite(json.stars)) {
          stars = json.stars;
        } else if (typeof json.stars === 'string') {
          const match = json.stars.match(/\d+/);
          if (match) {
            const parsedStars = parseInt(match[0], 10);
            if (Number.isFinite(parsedStars)) stars = parsedStars;
          }
        }

        const globalRankNum =
          typeof json.globalRank === 'number'
            ? json.globalRank
            : Number(json.globalRank);
        const globalRank = Number.isFinite(globalRankNum)
          ? Math.round(globalRankNum)
          : CP_FALLBACK.codechef.globalRank;

        let solved = CP_FALLBACK.codechef.solved;
        const fullySolvedCount = Number(json.fullySolved?.count ?? json.solved);
        if (Number.isFinite(fullySolvedCount) && fullySolvedCount > 0) {
          solved = Math.round(fullySolvedCount);
        }

        let contests = CP_FALLBACK.codechef.contests;
        const contestsNum = Number(json.contests);
        if (Number.isFinite(contestsNum) && contestsNum > 0) {
          contests = Math.round(contestsNum);
        } else if (Array.isArray(json.ratingData) && json.ratingData.length > 0) {
          contests = json.ratingData.length;
        }

        let history: number[] | undefined;
        if (Array.isArray(json.ratingData)) {
          const points = json.ratingData
            .map((item) => Number(item.rating))
            .filter((val): val is number => Number.isFinite(val))
            .slice(-30);
          if (points.length > 0) {
            history = points;
          }
        }

        const parsedData: CodechefData = {
          rating,
          maxRating,
          stars,
          globalRank,
          solved,
          contests,
          ...(history && history.length > 0 ? { history } : {}),
        };

        const now = Date.now();
        setState({ data: parsedData, updatedAt: now });
        setCached(CC_CACHE_KEY, parsedData, now);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (import.meta.env.DEV) {
          console.warn('Failed to fetch CodeChef stats:', err);
        }
        setState({ data: CP_FALLBACK.codechef, updatedAt: CP_FALLBACK.codechef.updatedAt });
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchStats();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return state;
}
