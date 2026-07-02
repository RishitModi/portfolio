import { useEffect, useRef, useState } from 'react';
import { useParallax } from '../../hooks/useParallax';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { ref: titleRef, offset: titleOffset } = useParallax(0.2);
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
      className={`md:py-[120px] md:px-16 ${isVisible ? 'visible' : ''}`}
      style={{
        backgroundColor: '#e8eef8',
        borderTop: '1px solid #d0dcf0',
        borderBottom: '1px solid #d0dcf0',
        padding: '80px 24px',
      }}
    >
      <div className="max-w-[1920px] mx-auto">
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px', color: '#1a5fd4', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px' }}>
          [ 01 — ABOUT ]
        </div>

        <h2
          ref={titleRef}
          style={{
            fontFamily: 'Inter',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 64px)',
            letterSpacing: '-2px',
            color: '#0f1828',
            marginBottom: '48px',
            transform: `translateY(${titleOffset * 0.2}px)`,
          }}
        >
          Obsessed with hard problems.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-6" style={{ fontFamily: 'Inter', fontSize: '17px', color: '#2a3a5a', lineHeight: 1.8 }}>
            <p>
              Student at VJTI Mumbai, one of India's most competitive CS programs. Minor in Cybersecurity.
            </p>
            <p>
              Work spans Energy-Based Transformers for cipher classification, VAE-based biodiversity pipelines, and production travel apps powered by Gemini 1.5. Full ownership from training loops to polished UIs.
            </p>
            <p>
              Outside code — leading AI/ML mentorship under Project X at VJTI, delivered Git & Python workshops to 200+ juniors, contributed 6+ merged PRs during Hacktoberfest 2025.
            </p>
          </div>

          <div className="flex flex-col" ref={containerRef}>
            {infoBlocks.map((block, index) => (
              <div
                key={index}
                className="info-row group relative"
                style={{
                  ...getItemStyle(index),
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '32px 0',
                  borderBottom: index < infoBlocks.length - 1 ? '1px solid #d0dcf0' : 'none',
                }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1a5fd4] transition-all duration-300 h-0 group-hover:h-full" />

                <div className="flex-1" style={{ paddingLeft: '24px' }}>
                  <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '20px', color: '#0f1828', marginBottom: '8px' }}>
                    {block.category}
                  </h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '16px', color: '#2a3a5a', lineHeight: 1.6 }}>
                    {block.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-end" style={{ maxWidth: '300px' }}>
                  {block.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '13px',
                        padding: '6px 12px',
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
            ))}
          </div>
        </div>

        <div className="mt-16 pt-12" style={{ borderTop: '1px solid #d0dcf0' }}>
          <div className="flex items-center gap-3 mb-6">
            <div style={{
              fontFamily: 'Inter',
              fontSize: '14px',
              color: '#1a5fd4',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}>
              ► Competitive Programming
            </div>
          </div>

          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #d0dcf0', backgroundColor: '#ffffff' }}>
            <img
              src="https://leetcard.jacoblin.cool/modeiji09?theme=light&font=JetBrains%20Mono&ext=heatmap"
              alt="LeetCode Stats - modeiji09"
              className="w-full h-auto"
              style={{ display: 'block' }}
            />
          </div>

          <a
            href="https://leetcode.com/u/modeiji09/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded transition-all duration-300 hover:gap-3"
            style={{
              fontFamily: 'Inter',
              fontSize: '15px',
              fontWeight: 600,
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
