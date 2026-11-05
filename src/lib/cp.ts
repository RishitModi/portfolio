import { TOTAL_SOLVED_FLOOR } from './content';

const LEETCODE_RANKS = ['Knight', 'Guardian'] as const;
const CODEFORCES_RANKS = [
  'Newbie',
  'Pupil',
  'Specialist',
  'Expert',
  'Candidate Master',
  'Master',
  'International Master',
  'Grandmaster',
  'International Grandmaster',
  'Legendary Grandmaster',
] as const;

export function peakLeetcodeCategory(
  maxRating: number,
  apiBadge: string | null | undefined,
  floor: string,
): string {
  const candidates = [floor];
  if (maxRating >= 2150) candidates.push('Guardian');
  else if (maxRating >= 1850) candidates.push('Knight');
  if (apiBadge && LEETCODE_RANKS.includes(apiBadge as (typeof LEETCODE_RANKS)[number])) {
    candidates.push(apiBadge);
  }
  return candidates.reduce((highest, candidate) =>
    LEETCODE_RANKS.indexOf(candidate as (typeof LEETCODE_RANKS)[number]) >
    LEETCODE_RANKS.indexOf(highest as (typeof LEETCODE_RANKS)[number])
      ? candidate
      : highest,
  );
}

export function peakCodechefStars(maxRating: number, floorStars: number): number {
  const stars =
    maxRating < 1400 ? 1 :
      maxRating < 1600 ? 2 :
        maxRating < 1800 ? 3 :
          maxRating < 2000 ? 4 :
            maxRating < 2200 ? 5 :
              maxRating < 2500 ? 6 : 7;
  return Math.max(stars, floorStars);
}

export function codeforcesPeakCategory(maxRank: string | null | undefined, floorCategory: string): string {
  const apiRank = maxRank
    ? maxRank.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())
    : '';
  const floorIndex = CODEFORCES_RANKS.indexOf(floorCategory as (typeof CODEFORCES_RANKS)[number]);
  const apiIndex = CODEFORCES_RANKS.indexOf(apiRank as (typeof CODEFORCES_RANKS)[number]);
  return apiIndex > floorIndex ? apiRank : floorCategory;
}

export function formatSolvedTotal(total: number): string {
  return `${Math.floor(Math.max(total, TOTAL_SOLVED_FLOOR) / 50) * 50}+`;
}

export interface CpFile {
  generatedAt: string;
  solvedByPlatform?: {
    leetcode?: number;
    codechef?: number;
    codeforces?: number;
  };
  leetcode?: {
    rating: number;
    maxRating: number;
    badge: string | null;
    solved: number;
    contests: number;
    topPercentage: number | null;
    history?: number[];
  };
  codechef?: {
    rating: number;
    maxRating: number;
    stars?: number;
    globalRank?: number;
    countryRank?: number;
    solved?: number;
    contests?: number;
    history?: number[];
  };
  codeforces?: {
    rating: number;
    maxRating: number;
    rank?: string;
    maxRank?: string;
    solved?: number | null;
    contests?: number;
    history?: number[];
  };
}
