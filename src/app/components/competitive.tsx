import { SectionLabel } from './section-label';
import { useLeetCodeStats } from '../../hooks/useLeetCodeStats';
import { useCodeforcesStats, useCodechefStats } from '../../hooks/useCpStats';
import { HANDLES, LINKS, CODECHEF_STATS } from '../../lib/content';
import { relativeTime, useNow } from '../../lib/time';

function formatAbsoluteDate(input: number | string | Date): string {
  try {
    let d: Date;
    if (input instanceof Date) {
      d = input;
    } else if (typeof input === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(input)) {
      const [y, m, day] = input.split('-').map(Number);
      d = new Date(y, m - 1, day);
    } else {
      d = new Date(input);
    }
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function Sparkline({ history, contests }: { history: number[]; contests: number }) {
  if (!history || history.length < 2) return null;

  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = max - min || 1;
  const width = 120;
  const height = 36;
  const padY = 4;
  const usableH = height - padY * 2;

  const points = history.map((val, idx) => {
    const x = (idx / (history.length - 1)) * width;
    const y = height - padY - ((val - min) / range) * usableH;
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPoints = `0,${height} ${polylinePoints} ${width},${height}`;
  const lastPoint = points[points.length - 1];

  return (
    <div className="w-full my-2">
      <svg
        viewBox="0 0 120 36"
        preserveAspectRatio="none"
        className="w-full h-9"
        role="img"
        aria-label={`Rating history, ${contests} contests`}
      >
        <polygon points={areaPoints} fill="color-mix(in srgb, var(--accent) 8%, transparent)" />
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={lastPoint.x} cy={lastPoint.y} r="2.5" fill="var(--accent)" />
      </svg>
    </div>
  );
}

export function Competitive() {
  const now = useNow();
  const lcStats = useLeetCodeStats();
  const { data: cfData, updatedAt: cfUpdatedAt } = useCodeforcesStats();
  const { data: ccData } = useCodechefStats();

  return (
    <section
      id="competitive"
      className="py-12 md:py-14 px-6 md:px-8"
      style={{
        backgroundColor: 'var(--canvas)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div>
        <SectionLabel>[ 04 — COMPETITIVE PROGRAMMING ]</SectionLabel>

        <h2
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(26px, 4vw, 38px)',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            color: 'var(--ink)',
          }}
        >
          Competitive programming.
        </h2>

        <p
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '14px',
            color: 'var(--muted)',
            marginTop: '8px',
            marginBottom: '28px',
          }}
        >
          Live ratings from LeetCode, CodeChef and Codeforces.
        </p>

        {/* ── 3 Platform Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* Card 1: LeetCode */}
          <div className="w-full min-w-0 bg-card border border-line rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full transition-all duration-200 motion-safe:hover:-translate-y-[2px] hover:border-accent/50 hover:shadow-md">
            <div>
              {/* Header row */}
              <div className="mb-3">
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                  }}
                >
                  LeetCode
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  @{HANDLES.leetcode}
                </div>
              </div>

              {/* Big Rating */}
              <div className="mb-4">
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '36px',
                    fontWeight: 800,
                    lineHeight: 1,
                    color: 'var(--accent)',
                  }}
                >
                  {lcStats.currentRating}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginTop: '4px',
                    fontWeight: 600,
                  }}
                >
                  RATING
                </div>
              </div>

              {/* 2-column mini stat grid */}
              <div className="grid grid-cols-2 gap-2 text-[13px] pt-3 pb-2 border-t border-line">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-muted">Max Rating</span>
                  <span className="font-semibold text-ink">{lcStats.maxRating}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-muted">Contest Rating</span>
                  <span className="font-semibold text-ink">{lcStats.currentRating}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-muted">Solved</span>
                  <span className="font-semibold text-ink">{lcStats.solved}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-line/60 mt-3 flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[12px] text-muted cursor-default"
                title={formatAbsoluteDate(lcStats.updatedAt)}
              >
                Last updated: {relativeTime(lcStats.updatedAt, now)}
              </span>
              <a
                href={LINKS.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-semibold text-accent hover:underline uppercase tracking-wide inline-flex items-center gap-1 shrink-0"
              >
                View profile ↗
              </a>
            </div>
          </div>

          {/* Card 2: CodeChef */}
          <div className="w-full min-w-0 bg-card border border-line rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full transition-all duration-200 motion-safe:hover:-translate-y-[2px] hover:border-accent/50 hover:shadow-md">
            <div>
              {/* Header row */}
              <div className="mb-3">
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                  }}
                >
                  CodeChef
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  @{HANDLES.codechef}
                </div>
              </div>

              {/* Big Rating */}
              <div className="mb-4">
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '36px',
                    fontWeight: 800,
                    lineHeight: 1,
                    color: 'var(--accent)',
                  }}
                >
                  {ccData.rating}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginTop: '4px',
                    fontWeight: 600,
                  }}
                >
                  RATING
                </div>
              </div>

              {/* Sparkline if history exists */}
              {ccData.history && ccData.history.length >= 2 && (
                <Sparkline history={ccData.history} contests={ccData.contests} />
              )}

              {/* 2-column mini stat grid */}
              <div className="grid grid-cols-2 gap-2 text-[13px] pt-3 pb-2 border-t border-line">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-muted">Max Rating</span>
                  <span className="font-semibold text-ink">{ccData.maxRating}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-muted">Stars</span>
                  <span className="font-semibold text-amber-600">{'★'.repeat(ccData.stars)}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-muted">Global Rank</span>
                  <span className="font-semibold text-ink">#{ccData.globalRank.toLocaleString()}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-muted">Contests</span>
                  <span className="font-semibold text-ink">{ccData.contests}</span>
                </div>
                {Number.isFinite(ccData.solved) && (
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-muted">Solved</span>
                    <span className="font-semibold text-ink">{ccData.solved}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-line/60 mt-3 flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[12px] text-muted cursor-default"
                title={formatAbsoluteDate(CODECHEF_STATS.updatedAt)}
              >
                Last updated: {relativeTime(CODECHEF_STATS.updatedAt, now)}
              </span>
              <a
                href={LINKS.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-semibold text-accent hover:underline uppercase tracking-wide inline-flex items-center gap-1 shrink-0"
              >
                View profile ↗
              </a>
            </div>
          </div>

          {/* Card 3: Codeforces */}
          <div className="w-full min-w-0 bg-card border border-line rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full transition-all duration-200 motion-safe:hover:-translate-y-[2px] hover:border-accent/50 hover:shadow-md">
            <div>
              {/* Header row */}
              <div className="mb-3">
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                  }}
                >
                  Codeforces
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  @{HANDLES.codeforces}
                </div>
              </div>

              {/* Big Rating */}
              <div className="mb-4">
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '36px',
                    fontWeight: 800,
                    lineHeight: 1,
                    color: 'var(--accent)',
                  }}
                >
                  {cfData.rating}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginTop: '4px',
                    fontWeight: 600,
                  }}
                >
                  RATING
                </div>
              </div>

              {/* Sparkline if history exists */}
              {cfData.history && cfData.history.length >= 2 && (
                <Sparkline history={cfData.history} contests={cfData.contests} />
              )}

              {/* 2-column mini stat grid */}
              <div className="grid grid-cols-2 gap-2 text-[13px] pt-3 pb-2 border-t border-line">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-muted">Max Rating</span>
                  <span className="font-semibold text-ink">{cfData.maxRating}</span>
                </div>
                {cfData.rank && (
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-muted">Rank</span>
                    <span className="font-semibold text-ink">
                      {cfData.rank.charAt(0).toUpperCase() + cfData.rank.slice(1)}
                    </span>
                  </div>
                )}
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-muted">Contests</span>
                  <span className="font-semibold text-ink">{cfData.contests}</span>
                </div>
                {cfData.solved !== null && (
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-muted">Solved</span>
                    <span className="font-semibold text-ink">{cfData.solved}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-line/60 mt-3 flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[12px] text-muted cursor-default"
                title={formatAbsoluteDate(cfUpdatedAt)}
              >
                Last updated: {relativeTime(cfUpdatedAt, now)}
              </span>
              <a
                href={LINKS.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-semibold text-accent hover:underline uppercase tracking-wide inline-flex items-center gap-1 shrink-0"
              >
                View profile ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
