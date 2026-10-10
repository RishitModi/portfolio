import { useEffect, useState } from 'react';
import { SectionLabel } from './section-label';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { scrollToId } from '../../lib/scroll';
import {
  EXPERIENCE_PROFESSIONAL,
  EXPERIENCE_COLLEGE,
  type ExperienceEntry,
} from '../../lib/content';

function ExperienceCard({
  entry,
  isAnimated,
  staggerIndex,
  prefersReducedMotion,
}: {
  entry: ExperienceEntry;
  isAnimated: boolean;
  staggerIndex: number;
  prefersReducedMotion: boolean;
}) {
  const cardStyle = {
    opacity: prefersReducedMotion || isAnimated ? 1 : 0,
    transform:
      prefersReducedMotion || isAnimated ? 'translateY(0)' : 'translateY(16px)',
    transition: prefersReducedMotion
      ? 'none'
      : `opacity 500ms ease-out ${staggerIndex * 100}ms, transform 500ms ease-out ${staggerIndex * 100}ms`,
  };

  return (
    <div
      style={cardStyle}
      className="w-full bg-card border border-line rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 motion-safe:hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--accent)_50%,transparent)] shadow-sm"
    >
      <div>
        {/* Header row: role · org [type] on left, period on right */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 mb-2">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span
              style={{
                fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                color: 'var(--ink)',
              }}
            >
              {entry.role}
            </span>
            <span className="text-muted font-medium">·</span>
            {entry.link ? (
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-accent font-semibold hover:underline"
              >
                {entry.org}
              </a>
            ) : (
              <span className="text-[14px] text-body font-medium">{entry.org}</span>
            )}
            {entry.type && (
              <span
                className="text-[12px] font-medium rounded px-2 py-0.5 ml-1"
                style={{
                  backgroundColor: 'var(--accent-soft)',
                  color: 'var(--accent)',
                }}
              >
                {entry.type}
              </span>
            )}
          </div>
          {entry.period && (
            <span className="text-[12px] text-muted whitespace-nowrap">
              {entry.period}
            </span>
          )}
        </div>

        {/* Bullet points */}
        {entry.points && entry.points.length > 0 && (
          <ul className="flex flex-col gap-1.5 my-2.5">
            {entry.points.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[14px] text-body leading-[1.7]"
              >
                <span
                  className="text-accent text-[10px] leading-relaxed flex-shrink-0 mt-1"
                  aria-hidden="true"
                >
                  ◆
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tags chips */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-line/60">
          {entry.tags.map((tag) => (
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

function ExperienceGroup({
  title,
  entries,
  emptyMessage,
  emptyAction,
  isAnimated,
  startIndex,
  prefersReducedMotion,
}: {
  title: string;
  entries: ExperienceEntry[];
  emptyMessage: string;
  emptyAction?: { label: string; onClick: () => void };
  isAnimated: boolean;
  startIndex: number;
  prefersReducedMotion: boolean;
}) {
  return (
    <div>
      <h3 className="text-[14px] font-bold uppercase tracking-[0.12em] text-ink flex items-center gap-2 mb-4">
        <span>{title}</span>
        <span className="text-muted font-semibold text-[13px]">
          ({entries.length})
        </span>
      </h3>

      {entries.length === 0 ? (
        <div className="border border-dashed border-line rounded-2xl p-5 bg-card/60">
          <p className="text-[14px] text-body">{emptyMessage}</p>
          {emptyAction && (
            <button
              type="button"
              onClick={emptyAction.onClick}
              className="text-accent hover:underline font-semibold text-[13px] inline-flex items-center gap-1 mt-2.5 cursor-pointer"
            >
              {emptyAction.label}
            </button>
          )}
        </div>
      ) : (
        <div className="relative pl-6">
          {/* 2px left rail */}
          <div
            aria-hidden="true"
            className="absolute left-[4px] top-3.5 bottom-3.5 w-[2px] bg-line pointer-events-none"
          />

          <ul className="flex flex-col gap-3">
            {entries.map((entry, idx) => (
              <li key={entry.id} className="relative">
                {/* 10px node on the rail */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[24px] top-4 w-2.5 h-2.5 rounded-full bg-accent-solid"
                />
                <ExperienceCard
                  entry={entry}
                  isAnimated={isAnimated}
                  staggerIndex={startIndex + idx}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Experience() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
  }, []);

  const isAnimated = prefersReducedMotion || isVisible;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-12 md:py-14 px-6 md:px-8"
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div>
        <SectionLabel>[ 03 — EXPERIENCE ]</SectionLabel>

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
          Where I've worked.
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
          Professional roles and campus experience.
        </p>

        {/* Stacked Groups */}
        <div className="flex flex-col gap-8">
          <ExperienceGroup
            title="Professional"
            entries={EXPERIENCE_PROFESSIONAL}
            emptyMessage="No full-time roles yet — I'm open to internships and research collaborations."
            emptyAction={{
              label: 'Get in touch →',
              onClick: () => scrollToId('contact'),
            }}
            isAnimated={isAnimated}
            startIndex={0}
            prefersReducedMotion={prefersReducedMotion}
          />

          <ExperienceGroup
            title="College"
            entries={EXPERIENCE_COLLEGE}
            emptyMessage="More coming soon."
            isAnimated={isAnimated}
            startIndex={EXPERIENCE_PROFESSIONAL.length}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
