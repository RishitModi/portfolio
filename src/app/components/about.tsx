import { useEffect, useRef, useState } from 'react';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { SectionLabel } from './section-label';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { containerRef, getItemStyle } = useStaggeredAnimation(3, { threshold: 0.15 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const infoBlocks = [
    {
      category: 'AI & Deep Learning',
      description: 'Building intelligent systems with state-of-the-art architectures',
      tags: ['PyTorch', 'TensorFlow', 'VAE', 'CNN', 'Transformers'],
    },
    {
      category: 'Full-Stack Engineering',
      description: 'End-to-end product development from APIs to polished interfaces',
      tags: ['React', 'Spring Boot', 'Node.js', 'PostgreSQL', 'REST'],
    },
    {
      category: 'Cybersecurity',
      description: 'Applied cryptography and security analysis',
      tags: ['Cryptanalysis', 'AES/DES', 'Side-Channel', 'Pycryptodome'],
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-12 md:py-14 px-6 md:px-8 ${isVisible ? 'visible' : ''}`}
      style={{
        backgroundColor: '#e8eef8',
        borderTop: '1px solid #d0dcf0',
        borderBottom: '1px solid #d0dcf0',
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
            color: '#0f1828',
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
            color: '#2a3a5a',
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
          {infoBlocks.map((block, index) => (
            <div
              key={index}
              className="info-row group relative"
              style={{
                ...getItemStyle(index),
                padding: '20px 0',
                borderBottom: index < infoBlocks.length - 1 ? '1px solid #d0dcf0' : 'none',
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1a5fd4] transition-all duration-300 h-0 group-hover:h-full" />

              <div className="pl-4">
                <h3
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#0f1828',
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
                    color: '#2a3a5a',
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
                        border: '1px solid #d0dcf0',
                        borderRadius: '4px',
                        color: '#2a3a5a',
                        backgroundColor: '#f4f6fa',
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

        {/* Competitive programming block */}
        <div className="mt-10 pt-8" style={{ borderTop: '1px solid #d0dcf0' }}>
          <div
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '12px',
              color: '#1a5fd4',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            ► Competitive Programming
          </div>

          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid #d0dcf0', backgroundColor: '#ffffff' }}
          >
            <img
              src="https://leetcard.jacoblin.cool/modeiji09?theme=light&font=JetBrains%20Mono&ext=heatmap"
              alt="LeetCode Stats - modeiji09"
              loading="lazy"
              className="w-full h-auto"
              style={{ display: 'block' }}
            />
          </div>

          <a
            href="https://leetcode.com/u/modeiji09/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 rounded transition-all duration-300 hover:gap-3"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              padding: '8px 16px',
              borderRadius: '4px',
              color: '#ffffff',
              backgroundColor: '#1a5fd4',
              textDecoration: 'none',
            }}
          >
            View LeetCode Profile →
          </a>
        </div>
      </div>
    </section>
  );
}
