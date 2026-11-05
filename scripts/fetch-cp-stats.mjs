import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const HANDLES = {
  leetcode: 'modeiji09',
  codechef: 'rishitmodeiji',
  codeforces: 'rishitmodi',
};
const OUTPUT = 'public/data/cp-stats.json';
const USER_AGENT = 'portfolio-stats-bot';

async function request(url, options = {}) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: { 'User-Agent': USER_AGENT, ...(options.headers ?? {}) },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  throw lastError;
}

function numberFrom(value) {
  const number = Number(String(value).replace(/,/g, ''));
  return Number.isFinite(number) ? number : undefined;
}

async function fetchCodeforces() {
  const handle = encodeURIComponent(HANDLES.codeforces);
  const infoResponse = await request(`https://codeforces.com/api/user.info?handles=${handle}`);
  const info = await infoResponse.json();
  if (info.status !== 'OK' || !info.result?.[0]) throw new Error('user.info returned non-OK status');
  const user = info.result[0];
  if (!Number.isFinite(user.rating) || !Number.isFinite(user.maxRating)) throw new Error('invalid rating');

  const ratingResponse = await request(`https://codeforces.com/api/user.rating?handle=${handle}`);
  const rating = await ratingResponse.json();
  if (rating.status !== 'OK' || !Array.isArray(rating.result)) throw new Error('user.rating returned non-OK status');

  let solved = null;
  try {
    const statusResponse = await request(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=100000`);
    const status = await statusResponse.json();
    if (status.status === 'OK' && Array.isArray(status.result)) {
      const solvedProblems = new Set(
        status.result
          .filter((submission) => submission.verdict === 'OK' && submission.problem?.contestId && submission.problem?.index)
          .map((submission) => `${submission.problem.contestId}-${submission.problem.index}`),
      );
      solved = solvedProblems.size;
    }
  } catch {
    solved = null;
  }

  return {
    rating: user.rating,
    maxRating: user.maxRating,
    rank: user.rank,
    maxRank: user.maxRank,
    solved,
    contests: rating.result.length,
    history: rating.result.map((item) => item.newRating).filter(Number.isFinite).slice(-30),
  };
}

async function fetchLeetcode() {
  const query = `
    query($u: String!) {
      matchedUser(username: $u) { submitStatsGlobal { acSubmissionNum { difficulty count } } }
      userContestRanking(username: $u) { rating attendedContestsCount topPercentage badge { name } }
      userContestRankingHistory(username: $u) { attended rating }
    }
  `;
  const response = await request('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query, variables: { u: HANDLES.leetcode } }),
  });
  const payload = await response.json();
  const data = payload.data;
  const ranking = data?.userContestRanking;
  if (!ranking || !Number.isFinite(ranking.rating)) throw new Error('invalid contest ranking');
  const solvedEntry = data.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find((item) => item.difficulty === 'All');
  if (!Number.isFinite(solvedEntry?.count)) throw new Error('invalid solved count');
  const history = Array.isArray(data.userContestRankingHistory)
    ? data.userContestRankingHistory.filter((item) => item.attended && Number.isFinite(item.rating)).map((item) => Math.round(item.rating)).slice(-30)
    : [];
  const currentRating = Math.round(ranking.rating);
  return {
    rating: currentRating,
    maxRating: Math.max(currentRating, ...history),
    badge: ranking.badge?.name ?? null,
    solved: solvedEntry.count,
    contests: ranking.attendedContestsCount,
    topPercentage: Number.isFinite(ranking.topPercentage) ? ranking.topPercentage : null,
    history,
  };
}

// Extract the current rating from the profile's rating-number element.
function codechefRating(html) {
  return numberFrom(html.match(/<div class=["']rating-number["'][^>]*>\s*([\d,]+)/i)?.[1]);
}
// Extract the number following the Highest Rating label.
function codechefMaxRating(html) {
  return numberFrom(html.match(/Highest\s+Rating[^\d]{0,80}([\d,]+)/i)?.[1]);
}
// Extract the leading digit from the star rating label.
function codechefStars(html) {
  const section = html.match(/<div class=["']rating-star["'][^>]*>([\s\S]*?)<\/div>/i)?.[1];
  return section ? (section.match(/&#9733;|★/g)?.length ?? 0) : undefined;
}
// Extract the global rank from its labelled profile statistic.
function codechefGlobalRank(html) {
  return numberFrom(html.match(/<strong>\s*([\d,]+)\s*<\/strong>[\s\S]{0,100}?Global\s+Rank/i)?.[1]);
}
// Extract the country rank from its labelled profile statistic.
function codechefCountryRank(html) {
  return numberFrom(html.match(/<strong>\s*([\d,]+)\s*<\/strong>[\s\S]{0,100}?Country\s+Rank/i)?.[1]);
}
// Extract the total solved count from its labelled profile statistic.
function codechefSolved(html) {
  return numberFrom(html.match(/Total\s+Problems\s+Solved\s*:\s*([\d,]+)/i)?.[1]);
}
// Extract the contests participated count from its labelled profile statistic.
function codechefContests(html) {
  return numberFrom(html.match(/Contests\s*\(([\d,]+)\)/i)?.[1]);
}
// Extract an embedded rating history array when the profile exposes one.
function codechefHistory(html) {
  const match = html.match(/all_rating\s*=\s*(\[[\s\S]*?\])/i);
  if (!match) return undefined;
  try {
    const parsed = JSON.parse(match[1]);
    const values = parsed.map((item) => numberFrom(item?.rating ?? item)).filter(Number.isFinite);
    return values.slice(-30);
  } catch {
    return undefined;
  }
}

async function fetchCodechef() {
  const response = await request(`https://www.codechef.com/users/${HANDLES.codechef}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 portfolio-stats-bot' },
  });
  const html = await response.text();
  const rating = codechefRating(html);
  const maxRating = codechefMaxRating(html);
  if (!Number.isFinite(rating) || !Number.isFinite(maxRating)) throw new Error('rating fields not found');
  return {
    rating,
    maxRating,
    stars: codechefStars(html),
    globalRank: codechefGlobalRank(html),
    countryRank: codechefCountryRank(html),
    solved: codechefSolved(html),
    contests: codechefContests(html),
    history: codechefHistory(html),
  };
}

async function main() {
  const solvedByPlatform = {};
  const output = { generatedAt: new Date().toISOString(), solvedByPlatform };
  const platforms = [
    ['codeforces', fetchCodeforces],
    ['leetcode', fetchLeetcode],
    ['codechef', fetchCodechef],
  ];

  for (const [name, fetcher] of platforms) {
    try {
      const data = await fetcher();
      output[name] = data;
      if (Number.isFinite(data.solved)) solvedByPlatform[name] = data.solved;
      console.log(`[cp-stats] ${name} ok`);
    } catch (error) {
      console.log(`[cp-stats] ${name} failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (Object.keys(solvedByPlatform).length === 0 && !output.leetcode && !output.codechef && !output.codeforces) return;
  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
}

main().catch((error) => {
  console.log(`[cp-stats] failed: ${error instanceof Error ? error.message : String(error)}`);
});
