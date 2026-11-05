import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { SectionLabel } from './section-label';
import { SKILL_CATEGORIES } from '../../lib/content';

function SkillRow({
  category,
  index,
}: {
  category: (typeof SKILL_CATEGORIES)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15, delay: index * 80 });
  const labelId = `skill-category-${index}`;

  return (
    <div
      ref={ref}
      className={`skill-row ${isVisible ? 'is-visible' : ''}`}
      role="listitem"
      aria-labelledby={labelId}
    >
      <div id={labelId} className="skill-category">{category.category}</div>
      <ul className="skill-items" aria-label={`${category.category} skills`}>
        {category.skills.map((skill) => {
          const skillEntry = skill as unknown as string | { name: string; isPrimary?: boolean };
          const name = typeof skillEntry === 'string' ? skillEntry : skillEntry.name;
          const isPrimary = typeof skillEntry !== 'string' && skillEntry.isPrimary;
          return (
            <li key={name} className={isPrimary ? 'is-primary' : undefined}>
              {isPrimary && <span className="skill-primary-marker" aria-hidden="true">◆</span>}
              <span className="skill-name">{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="py-14 md:py-20 w-full relative"
    >
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

      <div className="section-pad skills-list" role="list">
        {SKILL_CATEGORIES.map((category, index) => (
          <SkillRow key={category.category} category={category} index={index} />
        ))}
      </div>
      <style>{`
        .skills-list {
          display: flex;
          flex-direction: column;
        }
        .skill-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          padding: 20px 0;
          border-top: 1px solid var(--line);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 500ms ease-out, transform 500ms ease-out;
        }
        .skill-row:last-child {
          border-bottom: 1px solid var(--line);
        }
        .skill-row.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .skill-category {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted);
          font-weight: 600;
        }
        .skill-items {
          display: flex;
          flex-wrap: wrap;
          column-gap: 0;
          row-gap: 4px;
          margin: 0;
          padding: 0;
          list-style: none;
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.8;
          font-weight: 500;
          color: var(--body);
        }
        .skill-items li {
          white-space: nowrap;
          padding-inline: 6px;
        }
        .skill-items li:not(:last-child)::after {
          content: ' / ';
          color: var(--line);
          padding-left: 6px;
          pointer-events: none;
        }
        .skill-name {
          transition: color 200ms ease, text-decoration-color 200ms ease;
        }
        .skill-items li:hover .skill-name {
          color: var(--accent);
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 4px;
        }
        .skill-items li.is-primary {
          color: var(--ink);
          font-weight: 600;
        }
        .skill-primary-marker {
          color: var(--accent);
          font-size: 11px;
          margin-right: 6px;
        }
        @media (min-width: 768px) {
          .skill-row {
            grid-template-columns: 180px minmax(0, 1fr);
            column-gap: 32px;
            align-items: baseline;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .skill-row {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
