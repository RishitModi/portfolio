import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { SectionLabel } from './section-label';
import { SKILL_CATEGORIES } from '../../lib/content';

export function Skills() {
  const { containerRef, getItemStyle } = useStaggeredAnimation(SKILL_CATEGORIES.length, { threshold: 0.15 });

  return (
    <section
      id="skills"
      className="py-12 md:py-14 px-6 md:px-8"
      style={{
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div>
        <SectionLabel>[ 05 — SKILLS ]</SectionLabel>

        <h2
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(26px, 4vw, 38px)',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            color: 'var(--ink)',
            marginBottom: '28px',
          }}
        >
          The stack.
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ backgroundColor: 'var(--line)' }}
          ref={containerRef}
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <div
              key={index}
              className="skill-cell group relative"
              style={{
                ...getItemStyle(index),
                backgroundColor: 'var(--card)',
                padding: '20px',
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent transition-all duration-300 h-0 group-hover:h-full" />

              <div
                style={{
                  fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  marginBottom: '16px',
                  fontWeight: 600,
                }}
              >
                {category.category}
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="skill-tag transition-all duration-200"
                    style={{
                      fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                      fontSize: '12px',
                      padding: '4px 10px',
                      border: '1px solid var(--line)',
                      borderRadius: '4px',
                      color: 'var(--body)',
                      backgroundColor: 'var(--chip)',
                    }}
                  >
                    {skill.isPrimary && (
                      <span style={{ color: 'var(--accent)', marginRight: '6px' }}>◆</span>
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skill-tag:hover {
          color: var(--accent);
          border-color: var(--accent);
          background-color: var(--accent-soft);
        }
      `}</style>
    </section>
  );
}
