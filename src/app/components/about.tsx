import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { SectionLabel } from './section-label';
import { ABOUT_BLOCKS } from '../../lib/content';

export function About() {
  const { containerRef, getItemStyle } = useStaggeredAnimation(ABOUT_BLOCKS.length, { threshold: 0.15 });

  return (
    <section
      id="about"
      className="py-12 md:py-14 px-6 md:px-8"
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div>
        <SectionLabel>[ 01 — ABOUT ]</SectionLabel>

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
            Student at VJTI Mumbai, one of India's most competitive CS programs. Minor in Cybersecurity.
          </p>
          <p>
            Work spans Energy-Based Transformers for cipher classification, VAE-based biodiversity pipelines, and production travel apps powered by Gemini 1.5. Full ownership from training loops to polished UIs.
          </p>
        </div>

        {/* Three info blocks stacked */}
        <div className="flex flex-col" ref={containerRef}>
          {ABOUT_BLOCKS.map((block, index) => (
            <div
              key={index}
              className="info-row group relative"
              style={{
                ...getItemStyle(index),
                padding: '20px 0',
                borderBottom: index < ABOUT_BLOCKS.length - 1 ? '1px solid var(--line)' : 'none',
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transition-all duration-300 h-0 group-hover:h-full" />

              <div className="pl-4">
                <h3
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: 'var(--ink)',
                    marginBottom: '4px',
                  }}
                >
                  {block.category}
                </h3>
                <p
                  className="max-w-[68ch]"
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '15px',
                    color: 'var(--body)',
                    lineHeight: 1.7,
                    marginBottom: '10px',
                  }}
                >
                  {block.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {block.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                        fontSize: '12px',
                        padding: '4px 10px',
                        border: '1px solid var(--line)',
                        borderRadius: '4px',
                        color: 'var(--body)',
                        backgroundColor: 'var(--canvas)',
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
