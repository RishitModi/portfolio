import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { SectionLabel } from './section-label';
import { SKILL_CATEGORIES } from '../../lib/content';

export function About() {
  const { containerRef, getItemStyle } = useStaggeredAnimation(SKILL_CATEGORIES.length, { threshold: 0.15 });

  return (
    <section
      id="about"
      className="py-12 md:py-14 section-pad"
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div>
        <SectionLabel>[ 01 — ABOUT & SKILLS ]</SectionLabel>

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
          Obsessed with hard problems.
        </h2>

        {/* Single column: paragraphs first */}
        <div
          className="flex flex-col gap-4 mb-8 max-w-[68ch]"
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '15px',
            color: 'var(--body)',
            lineHeight: 1.7,
          }}
        >
          <p>
            Student at VJTI Mumbai, one of India's most competitive Computer Engineering programs. Minor in Cybersecurity.
          </p>
          <p>
            Work spans Energy-Based Transformers for cipher classification, VAE-based biodiversity pipelines, and production travel apps powered by Gemini 1.5. Full ownership from training loops to polished UIs.
          </p>
        </div>

        {/* The stack sub-heading */}
        <h3
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--ink)',
            marginTop: '40px',
            marginBottom: '20px',
          }}
        >
          The stack
        </h3>

        {/* Skills grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ backgroundColor: 'var(--line)' }}
          ref={containerRef}
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <div
              key={index}
              className={`skill-cell group relative ${index === 4 ? 'md:col-span-2' : ''}`}
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

