import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from './section-label';
import { EDUCATION, type EducationStage } from '../../lib/content';

function EducationCard({
  stage,
  isReached,
  isActive,
  prefersReducedMotion,
}: {
  stage: EducationStage;
  isReached: boolean;
  isActive: boolean;
  prefersReducedMotion: boolean;
}) {
  const cardStyle: React.CSSProperties = {
    opacity: prefersReducedMotion ? 1 : isReached ? 1 : 0.7,
    transform: prefersReducedMotion
      ? 'none'
      : isActive
      ? 'translateY(0) scale(1.015)'
      : isReached
      ? 'translateY(0)'
      : 'translateY(12px)',
    borderColor: isActive
      ? 'color-mix(in srgb, var(--accent) 60%, transparent)'
      : stage.current
      ? 'color-mix(in srgb, var(--accent) 50%, transparent)'
      : 'var(--line)',
    boxShadow:
      isActive && !prefersReducedMotion
        ? '0 12px 32px -12px rgb(var(--shadow) / 0.12)'
        : '0 0 0 0 transparent',
    transition: prefersReducedMotion
      ? 'none'
      : 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1), border-color 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return (
    <div
      style={cardStyle}
      className="w-full bg-card border rounded-2xl p-4 flex flex-col justify-between text-left"
    >
      <div>
        {/* Stage label */}
        <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent mb-1.5 leading-none">
          {stage.stage}
        </div>

        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--ink)',
              lineHeight: 1.3,
            }}
          >
            {stage.institution}
          </h3>
          {stage.current && (
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex-shrink-0"
              style={{
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
              }}
            >
              Present
            </span>
          )}
        </div>

        {stage.qualification && (
          <div className="text-[14px] text-body mb-1 font-medium">
            {stage.qualification}
          </div>
        )}

        {(stage.period || stage.location) && (
          <div className="flex flex-wrap items-center gap-1.5 text-[12px] text-muted mb-2.5">
            {stage.period && <time>{stage.period}</time>}
            {stage.period && stage.location && <span>·</span>}
            {stage.location && <span>{stage.location}</span>}
          </div>
        )}

        {stage.highlights && stage.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5 my-2.5">
            {stage.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[13px] text-body leading-snug"
              >
                <span
                  className="text-accent text-[10px] leading-tight flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  ◆
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {stage.tags && stage.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-line/60">
          {stage.tags.map((tag) => (
            <span
              key={tag}
              className="text-[12px] text-body bg-chip border border-line px-2.5 py-1 rounded-[4px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function Education() {
  const olRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Initial render: default to all stages reached
  const [activeIndex, setActiveIndex] = useState<number>(EDUCATION.length - 1);
  const [hasMeasured, setHasMeasured] = useState(false);

  const activeIndexRef = useRef<number>(EDUCATION.length - 1);
  const hasMeasuredRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
  }, []);

  useEffect(() => {
    const ol = olRef.current;
    if (!ol) return;

    if (prefersReducedMotion) {
      ol.style.setProperty('--progress', '1');
      activeIndexRef.current = EDUCATION.length - 1;
      setActiveIndex(EDUCATION.length - 1);
      hasMeasuredRef.current = true;
      setHasMeasured(true);
      return;
    }

    let rafId: number | null = null;

    const measure = () => {
      if (!olRef.current) return;
      const currentOl = olRef.current;
      const triggerLineY = window.innerHeight * 0.6;
      const olRect = currentOl.getBoundingClientRect();
      const olTop = olRect.top;
      const olHeight = olRect.height;

      const rawProgress = olHeight > 0 ? (triggerLineY - olTop) / olHeight : 0;
      const progress = Math.min(1, Math.max(0, rawProgress));
      currentOl.style.setProperty('--progress', progress.toFixed(4));

      let lastReached = -1;
      cardRefs.current.forEach((cardEl, idx) => {
        if (cardEl) {
          const cardRect = cardEl.getBoundingClientRect();
          if (cardRect.top <= triggerLineY) {
            lastReached = idx;
          }
        }
      });

      if (!hasMeasuredRef.current) {
        hasMeasuredRef.current = true;
        activeIndexRef.current = lastReached;
        setHasMeasured(true);
        setActiveIndex(lastReached);
      } else if (lastReached !== activeIndexRef.current) {
        activeIndexRef.current = lastReached;
        setActiveIndex(lastReached);
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        measure();
      });
    };

    measure();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="education"
      className="py-12 md:py-14 px-6 md:px-8"
      style={{
        backgroundColor: 'var(--canvas)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div>
        <SectionLabel>[ 02 — EDUCATION ]</SectionLabel>

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
          The roadmap.
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
          From school to university.
        </p>

        {/* ── Vertical Zigzag Timeline ── */}
        <ol
          ref={olRef}
          aria-label="Education timeline"
          className="relative overflow-x-clip"
          style={{
            ['--progress' as string]: prefersReducedMotion || !hasMeasured ? '1' : '0',
          }}
        >
          {/* Vertical track line (2px, var(--line)) running down middle on desktop and left on mobile */}
          <div
            aria-hidden="true"
            className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-line pointer-events-none"
          >
            {/* Accent progress line */}
            <div
              className="w-full bg-accent origin-top pointer-events-none"
              style={{
                height: 'calc(var(--progress, 0) * 100%)',
                transition: prefersReducedMotion ? 'none' : 'height 120ms ease-out',
              }}
            />
          </div>

          {EDUCATION.map((stage, index) => {
            // Before JS measurement, all stages are in reached state
            const isReached =
              prefersReducedMotion || !hasMeasured ? true : index <= activeIndex;
            const isActive =
              prefersReducedMotion
                ? index === EDUCATION.length - 1
                : hasMeasured
                ? index === activeIndex
                : false;
            const isLeft = index % 2 === 0;

            return (
              <li
                key={stage.id}
                aria-current={isActive ? 'step' : undefined}
                className="relative mb-7 last:mb-0 md:grid md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] md:items-start"
              >
                {/* ── Left Slot: Card if even, empty spacer if odd (desktop) ── */}
                {isLeft ? (
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="col-start-1 pl-[36px] md:pl-0 w-full"
                  >
                    <EducationCard
                      stage={stage}
                      isReached={isReached}
                      isActive={isActive}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className="hidden md:block col-start-1"
                  />
                )}

                {/* ── Middle Slot: Node + Connector ── */}
                <div className="absolute md:relative md:col-start-2 left-0 top-0 md:left-auto md:top-auto w-[24px] md:w-[56px] h-[44px] md:h-full flex items-start justify-center pointer-events-none">
                  {/* Center anchor vertically aligned with card's stage label (about 22px from card top) */}
                  <div className="relative w-full flex items-center justify-center top-[22px] -translate-y-1/2">
                    {/* Short horizontal connector (2px, 20px long, hidden on mobile) */}
                    {isLeft ? (
                      <div
                        aria-hidden="true"
                        className="hidden md:block absolute left-0 w-[21px] h-[2px]"
                        style={{
                          backgroundColor: isReached
                            ? 'var(--accent)'
                            : 'var(--line)',
                          transition: prefersReducedMotion
                            ? 'none'
                            : 'background-color 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="hidden md:block absolute right-0 w-[21px] h-[2px]"
                        style={{
                          backgroundColor: isReached
                            ? 'var(--accent)'
                            : 'var(--line)',
                          transition: prefersReducedMotion
                            ? 'none'
                            : 'background-color 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    )}

                    {/* 14px circle Node */}
                    <div
                      aria-hidden="true"
                      className={`w-[14px] h-[14px] rounded-full z-10 ${
                        isActive && !prefersReducedMotion ? 'animate-pulse' : ''
                      }`}
                      style={{
                        backgroundColor: isReached
                          ? 'var(--accent-solid)'
                          : 'var(--card)',
                        border: isReached
                          ? '2px solid var(--accent-solid)'
                          : '2px solid var(--line)',
                        boxShadow:
                          isActive && !prefersReducedMotion
                            ? '0 0 0 4px color-mix(in srgb, var(--accent) 25%, transparent)'
                            : '0 0 0 0 transparent',
                        transition: prefersReducedMotion
                          ? 'none'
                          : 'background-color 350ms cubic-bezier(0.16, 1, 0.3, 1), border-color 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>

                {/* ── Right Slot: Card if odd, empty spacer if even (desktop) ── */}
                {!isLeft ? (
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="col-start-3 pl-[36px] md:pl-0 w-full"
                  >
                    <EducationCard
                      stage={stage}
                      isReached={isReached}
                      isActive={isActive}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className="hidden md:block col-start-3"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
