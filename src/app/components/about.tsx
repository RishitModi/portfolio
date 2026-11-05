import { useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { SectionLabel } from './section-label';
import { SKILL_CATEGORIES } from '../../lib/content';
import { getSkillExtras, getSkillProjects } from '../../lib/skills';
import { set, useSkillFocus } from '../../lib/skillFocus';
import { scrollToId } from '../../lib/scroll';

function SkillRow({
  category,
  index,
}: {
  category: (typeof SKILL_CATEGORIES)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15, delay: index * 80 });
  const labelId = `skill-category-${index}`;
  const selectedSkill = useSkillFocus();
  const selectedSkillInCategory = selectedSkill && category.skills.some((skill) => (
    (typeof skill === 'string' ? skill : skill.name) === selectedSkill
  ));

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
          const projects = getSkillProjects(name);
          const extras = getSkillExtras(name);
          const isInteractive = projects.length > 0 || extras.length > 0;
          const isSelected = selectedSkill === name;
          const content = (
            <>
              {isPrimary && <span className="skill-primary-marker" aria-hidden="true">◆</span>}
              <span className="skill-name">{name}</span>
              {isInteractive && (
                <span className="skill-count" aria-hidden="true">
                  {projects.length > 0 ? projects.length : '•'}
                </span>
              )}
            </>
          );
          return (
            <li key={name} className={isPrimary ? 'is-primary' : undefined}>
              {isInteractive ? (
                <button
                  type="button"
                  className={`skill-button ${isSelected ? 'is-selected' : ''}`}
                  aria-label={projects.length > 0
                    ? `${name}, used in ${projects.length} project${projects.length === 1 ? '' : 's'}`
                    : `${name}, used in ${extras.map((extra) => extra.label).join(', ')}`}
                  aria-expanded={isSelected}
                  onClick={() => set(isSelected ? null : name)}
                >
                  {content}
                </button>
              ) : content}
            </li>
          );
        })}
      </ul>
      {selectedSkillInCategory && selectedSkill && (() => {
        const projects = getSkillProjects(selectedSkill);
        const extras = getSkillExtras(selectedSkill);
        if (projects.length === 0 && extras.length === 0) return null;
        const links = [
          ...projects.map((project) => ({
            label: project.title,
            href: `#project-${project.index}`,
          })),
          ...extras,
        ];
        return (
          <div className="skill-projects">
            <span>Used in</span>{' '}
            {links.map((link, linkIndex) => (
              <span key={link.href + link.label}>
                {linkIndex > 0 && <span aria-hidden="true"> · </span>}
                <a href={link.href} onClick={(event) => {
                  event.preventDefault();
                  scrollToId(link.href.slice(1));
                }}>
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

export function About() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') set(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      set(null);
    };
  }, []);

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
        <p className="skills-hint">
          Numbers show how many of my projects use each skill. Select one to see which.
        </p>
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
        .skill-button {
          appearance: none;
          border: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          padding: 0;
          text-align: inherit;
        }
        .skill-button,
        .skill-projects a {
          cursor: pointer;
        }
        .skill-button.is-selected {
          color: var(--accent);
        }
        .skill-button.is-selected .skill-name {
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 1px;
        }
        .skill-count {
          margin-left: 4px;
          color: var(--muted);
          font-size: 11px;
          font-variant-numeric: tabular-nums;
          vertical-align: middle;
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
        .skill-button:hover .skill-name {
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
        .skill-projects {
          grid-column: 2;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
          opacity: 1;
          animation: skill-projects-in 150ms ease-out;
        }
        .skill-projects a {
          color: var(--ink);
          text-decoration: none;
        }
        .skill-projects a:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .skill-projects a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        .skills-hint {
          margin-top: 8px;
          color: var(--muted);
          font-size: 12px;
        }
        @media (prefers-reduced-motion: no-preference) {
          .skill-button:hover .skill-name {
            color: var(--accent);
          }
        }
        @keyframes skill-projects-in {
          from { opacity: 0; }
          to { opacity: 1; }
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
          .skill-projects {
            animation: none;
          }
        }
        @media (max-width: 767px) {
          .skill-projects {
            grid-column: 1;
          }
        }
      `}</style>
    </section>
  );
}
