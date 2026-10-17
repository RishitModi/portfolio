import { SectionLabel } from './section-label';
import { SKILL_CATEGORIES } from '../../lib/content';

const SPEEDS = [90, 110, 100, 120, 95];

export function About() {
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
      </div>

      {/* Full-bleed Stack Marquee Bands */}
      <div className="w-full flex flex-col border-t border-[var(--line)]">
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
          color: transparent;
          -webkit-text-stroke: 1.25px color-mix(in srgb, var(--muted) 65%, transparent);
          transition: color 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      -webkit-text-stroke 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      text-shadow 0.25s ease;
          user-select: none;
          cursor: default;
        }

        @media (max-width: 768px) {
          .marquee-skill {
            font-size: clamp(1.1rem, 3.8vw, 1.4rem);
            -webkit-text-stroke: 1px color-mix(in srgb, var(--muted) 70%, transparent);
          }
        }

        .marquee-skill:hover {
          color: var(--accent);
          -webkit-text-stroke: 1.25px var(--accent);
          text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 35%, transparent);
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
