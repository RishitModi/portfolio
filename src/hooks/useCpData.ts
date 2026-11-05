import { useEffect, useState } from 'react';
import type { CpFile } from '../lib/cp';

let dataPromise: Promise<CpFile | null> | null = null;

function finite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function validatePlatform(platform: unknown): boolean {
  if (!platform || typeof platform !== 'object') return false;
  const record = platform as Record<string, unknown>;
  if (!finite(record.rating) || !finite(record.maxRating)) return false;
  for (const key of ['solved', 'contests', 'stars', 'globalRank', 'countryRank', 'topPercentage']) {
    if (record[key] !== undefined && record[key] !== null && !finite(record[key])) return false;
  }
  if (record.history !== undefined) {
    if (!Array.isArray(record.history) || !record.history.every(finite)) return false;
  }
  return true;
}

function validateData(value: unknown): CpFile | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (typeof record.generatedAt !== 'string') return null;
  if (record.solvedByPlatform && typeof record.solvedByPlatform === 'object') {
    const solvedByPlatform = record.solvedByPlatform as Record<string, unknown>;
    if (!Object.values(solvedByPlatform).every(finite)) return null;
  }

  if (record.leetcode && validatePlatform(record.leetcode)) {
    const leetcode = record.leetcode as Record<string, unknown>;
    if (!finite(leetcode.solved) || !finite(leetcode.contests)) return null;
  } else if (record.leetcode) {
    return null;
  }
  if (record.codechef && !validatePlatform(record.codechef)) return null;
  if (record.codeforces && !validatePlatform(record.codeforces)) return null;
  return value as CpFile;
}

function loadCpData(): Promise<CpFile | null> {
  if (!dataPromise) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 6000);
    dataPromise = fetch(`${import.meta.env.BASE_URL}data/cp-stats.json`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() as Promise<unknown> : null)
      .then(validateData)
      .catch(() => null)
      .finally(() => window.clearTimeout(timeoutId));
  }
  return dataPromise;
}

export function useCpData(): { data: CpFile | null; ready: boolean } {
  const [data, setData] = useState<CpFile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    loadCpData().then((result) => {
      if (active) {
        setData(result);
        setReady(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { data, ready };
}
