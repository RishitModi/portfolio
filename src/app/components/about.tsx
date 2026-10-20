import { useEffect, useState } from 'react';
import { SectionLabel } from './section-label';
import { SKILL_CATEGORIES } from '../../lib/content';

const SPEEDS = [90, 110, 100, 120, 95];

export function About() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    } else if (mql.addListener) {
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, []);

  return (
    <section
      id="about"
      className="py-6 md:py-8 overflow-hidden w-full relative"
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      {/* Section Header */}
      <div className="section-pad mb-3 md:mb-4">
        <SectionLabel className="!mb-1">[ 01 — ABOUT ]</SectionLabel>

        <div className="flex items-center justify-between gap-4">
          <h2
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(22px, 2.5vw, 30px)',
              letterSpacing: '-0.5px',
              lineHeight: 1.1,
              color: 'var(--ink)',
            }}
          >
            THE STACK
          </h2>

          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-pressed={isPaused}
              aria-label={isPaused ? 'Play skills animation' : 'Pause skills animation'}
              className="min-w-[40px] min-h-[40px] h-10 px-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--line)',
                color: 'var(--ink)',
                fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {isPaused ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              )}
              <span className="hidden sm:inline">
                {isPaused ? 'Play' : 'Pause'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Full-bleed Stack Marquee Bands */}
      <div className={`w-full flex flex-col border-t border-[var(--line)] ${isPaused ? 'marquee-paused' : ''}`}>
        {SKILL_CATEGORIES.map((category, idx) => {
          const isReverse = idx % 2 === 1;
          const speed = SPEEDS[idx % SPEEDS.length];
          // Multiply list so one half is comfortably wider than viewport
          const repeatCount = category.skills.length < 5 ? 3 : 2;
          const skillGroup = Array.from({ length: repeatCount }, () => category.skills).flat();

          return (
            <div
              key={category.category}
              className="w-full border-b border-[var(--line)] py-2 md:py-2.5"
            >
              {/* Category label: Prominent, accent green, sitting directly above band with ~8px gap */}
              <div className="section-pad mb-1.5 md:mb-2">
                <span
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: 'clamp(1rem, 1.5vw, 1.4rem)',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    display: 'inline-block',
                  }}
                >
                  {category.category}
                </span>
              </div>

              {/* Edge-to-edge Marquee Band with soft fade masks */}
              <div className="marquee-band relative w-full overflow-hidden py-0.5">
                <div
                  className={`marquee-track ${isReverse ? 'marquee-right' : 'marquee-left'}`}
                  style={{
                    ['--marquee-speed' as string]: `${speed}s`,
                    animationDuration: `${speed}s`,
                  }}
                >
                  {/* Primary sequence */}
                  <div className="flex items-center shrink-0">
                    {skillGroup.map((skill, sIdx) => (
                      <span key={sIdx} className="inline-flex items-center">
                        <span className="marquee-skill">{skill}</span>
                        <span className="marquee-sep select-none font-light" aria-hidden="true">
                          /
                        </span>
                      </span>
                    ))}
                  </div>

                  {/* Duplicate sequence for seamless infinite loop */}
                  <div className="marquee-track-duplicate flex items-center shrink-0" aria-hidden="true">
                    {skillGroup.map((skill, sIdx) => (
                      <span key={`dup-${sIdx}`} className="inline-flex items-center">
                        <span className="marquee-skill">{skill}</span>
                        <span className="marquee-sep select-none font-light" aria-hidden="true">
                          /
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .marquee-band {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
        }

        @media (max-width: 768px) {
          .marquee-band {
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 4%,
              black 96%,
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 4%,
              black 96%,
              transparent 100%
            );
          }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }

        .marquee-paused .marquee-track {
          animation-play-state: paused !important;
        }

        .marquee-band:hover .marquee-track,
        .marquee-band:focus-within .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .marquee-left {
          animation: marquee-left linear infinite;
        }

        .marquee-right {
          animation: marquee-right linear infinite;
        }

        @media (max-width: 768px) {
          .marquee-track {
            animation-duration: calc(var(--marquee-speed, 100s) * 1.15) !important;
          }
        }

        .marquee-skill {
          font-family: 'Inter Variable', Inter, system-ui, sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
          font-size: clamp(1.25rem, 2.4vw, 2rem);
          line-height: 1.2;
          white-space: nowrap;
          color: var(--body);
          transition: color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
          cursor: default;
        }

        @media (max-width: 768px) {
          .marquee-skill {
            font-size: clamp(1.1rem, 3.8vw, 1.4rem);
          }
        }

        .marquee-skill:hover {
          color: var(--accent);
        }

        .marquee-sep {
          color: var(--muted);
          opacity: 0.45;
          font-size: clamp(1rem, 1.8vw, 1.5rem);
          margin-inline: clamp(0.5rem, 1.2vw, 1rem);
          user-select: none;
          display: inline-block;
          line-height: 1;
          font-weight: 300;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-band {
            mask-image: none !important;
            -webkit-mask-image: none !important;
            overflow: visible !important;
            padding-inline: max(1.5rem, calc((100% - 1280px) / 2)) !important;
          }
          .marquee-track {
            animation: none !important;
            transform: none !important;
            width: 100% !important;
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 0.4rem 0.6rem !important;
          }
          .marquee-track-duplicate {
            display: none !important;
          }
          .marquee-skill {
            color: var(--body) !important;
            -webkit-text-stroke: 0 !important;
            font-size: clamp(1rem, 2vw, 1.5rem) !important;
          }
          .marquee-skill:hover {
            color: var(--accent) !important;
          }
          .marquee-sep {
            font-size: clamp(0.9rem, 1.6vw, 1.3rem) !important;
            margin-inline: 0.35rem !important;
          }
        }
      `}</style>
    </section>
  );
}
