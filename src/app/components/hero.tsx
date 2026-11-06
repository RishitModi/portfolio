import { useFitText } from '../../hooks/useFitText';
import { useLeetCodeStats } from '../../hooks/useLeetCodeStats';
import { useCodechefStats, useCodeforcesStats } from '../../hooks/useCpStats';
import { EXTRA_SOLVED, HERO_PEAKS, LINKS, PROFILE } from '../../lib/content';
import { codeforcesPeakCategory, formatSolvedTotal, peakCodechefStars, peakLeetcodeCategory } from '../../lib/cp';
import { HeroBackground } from './hero-background';

export function Hero() {
  const lcStats = useLeetCodeStats();
  const { data: ccStats } = useCodechefStats();
  const { data: cfStats } = useCodeforcesStats();
  const { containerRef, textRef } = useFitText({
    min: 40,
    max: () => Math.min(120, Math.round(window.innerHeight * 0.2)),
  });
  const [firstName, lastName] = PROFILE.name.toUpperCase().split(' ');
  const leetcodeCategory = peakLeetcodeCategory(
    Number(lcStats.maxRating),
    lcStats.badge,
    HERO_PEAKS.leetcode.category,
  );
  const codechefStars = peakCodechefStars(ccStats.maxRating, HERO_PEAKS.codechef.stars);
  const codeforcesCategory = codeforcesPeakCategory(cfStats.maxRank, HERO_PEAKS.codeforces.category);

  const stats = [
    { number: '99.97', label: 'MHT-CET %ILE' },
    {
      number: formatSolvedTotal(
        Number(lcStats.solved) + ccStats.solved + (cfStats.solved ?? 0) + EXTRA_SOLVED,
      ),
      label: 'DSA PROBLEMS',
    },
    {
      number: leetcodeCategory,
      label: 'LEETCODE',
      href: LINKS.leetcode,
      detail: `Peak: ${leetcodeCategory} (${lcStats.maxRating}) · Current: ${lcStats.badge ?? HERO_PEAKS.leetcode.currentTier} (${lcStats.currentRating})`,
    },
    {
      number: `${codechefStars}★`,
      label: 'CODECHEF',
      href: LINKS.codechef,
      detail: `Peak: ${codechefStars}★ (${ccStats.maxRating}) · Current: ${ccStats.rating}`,
    },
    {
      number: codeforcesCategory,
      label: 'CODEFORCES',
      href: LINKS.codeforces,
      detail: `Peak: ${codeforcesCategory} (${cfStats.maxRating}) · Current: ${cfStats.rank} (${cfStats.rating})`,
    },
  ];

  return (
    <section
      id="profile"
      className="relative isolate flex min-h-[100vh] min-h-[100dvh] flex-col justify-center pt-[96px] pb-[96px] lg:pt-14 lg:pb-14 section-pad"
      style={{ boxSizing: 'border-box' }}
    >
      <HeroBackground />
      <div className="relative z-10 flex w-full flex-col gap-6 md:gap-8 fade-up">
        {/* 1. Location label */}
        <div
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '12px',
            color: 'var(--muted)',
            letterSpacing: '0.1em',
            fontWeight: 600,
          }}
        >
          [ {PROFILE.location.toUpperCase()} · {PROFILE.year} ]
        </div>

        {/* 2. Name */}
        <div>
          <h1
            ref={containerRef}
            className="hero-name"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 11vw, 160px)',
              lineHeight: 0.95,
              letterSpacing: 0,
              width: '100%',
              margin: 0,
              overflow: 'visible',
            }}
          >
            <span ref={textRef} className="hero-name-text">
              <span className="hero-name-word" style={{ color: 'var(--ink)' }}>
                {firstName}
              </span>{' '}
              <span
                className="hero-name-word"
                style={{
                  WebkitTextStroke: 'max(1.5px, 0.02em) var(--ink)',
                  color: 'transparent',
                }}
              >
                {lastName}
              </span>
            </span>
          </h1>
        </div>

        {/* 3. Subtitle */}
        <p
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '16px',
            color: 'var(--body)',
            fontWeight: 500,
          }}
        >
          AI/ML Enthusiast & Full-Stack Builder
        </p>

        {/* 4. Bio */}
        <p
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '15px',
            color: 'var(--body)',
            lineHeight: 1.7,
            maxWidth: '520px',
          }}
        >
          Third Year CE student at VJTI with Minors in Cybersecurity.
        </p>

        {/* 5. Stats strip */}
        <div className="hero-stats-strip">
          {stats.map((stat, i) => {
            const content = (
              <>
                <div
                  className="hero-stat-value"
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(22px, 2.4vw, 30px)',
                    color: 'var(--accent-2)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.5px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  className="hero-stat-label"
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginTop: '6px',
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                  {stat.href && <span className="hero-stat-arrow" aria-hidden="true">↗</span>}
                </div>
              </>
            );

            const itemClass = `hero-stat-item hero-stat-item-${i} ${stat.href ? 'hero-stat-link' : ''}`;

            return stat.href ? (
              <a
                key={i}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                title={stat.detail}
                className={itemClass}
              >
                {content}
                <span className="sr-only">{stat.detail}</span>
              </a>
            ) : (
              <div key={i} className={itemClass}>
                {content}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-stats-strip {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .hero-stat-item {
          min-width: 0;
          padding: 20px 24px;
          opacity: 0;
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-stat-item:nth-child(n + 3) {
          border-top: 1px solid var(--line);
        }
        .hero-stat-item:nth-child(even) {
          border-left: 1px solid var(--line);
        }
        .hero-stat-item:last-child {
          grid-column: 1 / -1;
        }
        .hero-stat-item-0 { animation-delay: 0.35s; }
        .hero-stat-item-1 { animation-delay: 0.45s; }
        .hero-stat-item-2 { animation-delay: 0.55s; }
        .hero-stat-item-3 { animation-delay: 0.65s; }
        .hero-stat-item-4 { animation-delay: 0.75s; }
        .hero-stat-link {
          color: inherit;
          text-decoration: none;
        }
        .hero-stat-link:hover .hero-stat-label {
          color: var(--ink);
        }
        .hero-stat-arrow {
          color: var(--muted);
          font-size: 12px;
          opacity: 0;
          margin-left: 6px;
          transition: opacity 200ms ease;
        }
        .hero-stat-link:hover .hero-stat-arrow,
        .hero-stat-link:focus-visible .hero-stat-arrow {
          opacity: 1;
        }
        .hero-stat-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        @media (min-width: 768px) {
          .hero-stats-strip {
            display: flex;
          }
          .hero-stat-item,
          .hero-stat-item:nth-child(n + 3) {
            flex: 1 1 0;
            border-top: 0;
            border-left: 1px solid var(--line);
          }
          .hero-stat-item:first-child {
            padding-left: 0;
            border-left: 0;
          }
          .hero-stat-item:last-child {
            grid-column: auto;
          }
        }
        .hero-name-text {
          display: inline-block;
          white-space: nowrap;
          margin-left: -0.04em;
        }
        .hero-name-word {
          letter-spacing: -0.03em;
        }
        @media (max-width: 479px) {
          .hero-name-word {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
