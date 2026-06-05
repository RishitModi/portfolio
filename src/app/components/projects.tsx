import { useEffect, useRef, useState } from 'react';
import { useParallax } from '../../hooks/useParallax';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { useLeetCodeStats } from '../../hooks/useLeetCodeStats';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { ref: titleRef, offset: titleOffset } = useParallax(0.2);
  const { containerRef, getItemStyle } = useStaggeredAnimation(3, { threshold: 0.15 });
  const { rating, solved } = useLeetCodeStats();

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

  const projects = [
    {
      index: '01',
      title: 'Voyexa',
      category: 'ACTIVE PROJECT',
      description: 'AI-powered travel companion using Gemini 1.5 Flash for intelligent itinerary generation. Full-stack app with React frontend, Spring Boot backend, and PostgreSQL for user data persistence.',
      metric: 'Gemini 1.5 integration · Live deployment',
      tags: ['React', 'Tailwind', 'Spring Boot', 'PostgreSQL', 'Gemini 1.5', 'Geoapify'],
      liveUrl: 'https://voyexa.vercel.app',
      visual: (
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #1a1a1a' }}>
          <video
            src={`${import.meta.env.BASE_URL}images/voyexa_demo.webm`}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto transition-transform duration-500 hover:scale-105"
            style={{ display: 'block' }}
          />
        </div>
      ),
    },
    {
      index: '02',
      title: 'eDNA Analyser',
      category: 'BIODIVERSITY ML',
      description: 'Automated environmental DNA analysis pipeline using Variational Autoencoders for species clustering and biodiversity assessment. Flask-based web interface with interactive visualizations.',
      metric: 'VAE clustering · HDBSCAN · Real-time viz',
      tags: ['Flask', 'TensorFlow', 'VAE', 'HDBSCAN', 'Chart.js', 'Scikit-learn'],
      liveUrl: null as string | null,
      visual: (
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #1a1a1a' }}>
          <video
            src={`${import.meta.env.BASE_URL}images/edna_demo.webm`}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto transition-transform duration-500 hover:scale-105"
            style={{ display: 'block' }}
          />
        </div>
      ),
    },
    {
      index: '03',
      title: 'Energy-based & Neurosymbolic Cryptanalysis',
      category: 'ML RESEARCH',
      description: 'Novel approach to cipher classification using Energy-Based Transformers and side-channel analysis. Achieved 76% validation accuracy across multiple cipher families with deep learning architectures.',
      metric: '76% validation accuracy · 10K SCA traces',
      tags: ['PyTorch', 'Pycryptodome', 'CNN', 'Transformer', 'Side-Channel'],
      liveUrl: null as string | null,
      visual: (
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #1a1a1a' }}>
          <img
            src={`${import.meta.env.BASE_URL}images/cryptanalysis.png`}
            alt="Neural network cryptanalysis visualization"
            className="w-full h-auto transition-transform duration-500 hover:scale-105"
            style={{ display: 'block' }}
          />
        </div>
      ),
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`md:py-[120px] md:px-16 ${isVisible ? 'visible' : ''}`}
      style={{
        backgroundColor: '#f4f6fa',
        padding: '80px 24px',
      }}
    >
      <div className="max-w-[1920px] mx-auto">
        <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '11px', color: '#1a5fd4', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px' }}>
          [ 03 — PROJECTS ]
        </div>

        <h2
          ref={titleRef}
          style={{
            fontFamily: 'Syne',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 64px)',
            letterSpacing: '-2px',
            color: '#0f1828',
            marginBottom: '48px',
            transform: `translateY(${titleOffset * 0.2}px)`,
          }}
        >
          Things I've shipped.
        </h2>

        <div className="flex flex-col" ref={containerRef}>
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-row group relative grid grid-cols-1 lg:grid-cols-2"
              style={{
                ...getItemStyle(index),
                gap: '32px',
                minHeight: '320px',
                padding: '48px 0',
                borderBottom: index < projects.length - 1 ? '1px solid #1a1a1a' : 'none',
              }}
            >
              <div
                className="hidden lg:flex absolute pointer-events-none transition-colors duration-300"
                style={{
                  fontFamily: 'Syne',
                  fontWeight: 800,
                  fontSize: '140px',
                  color: '#c8d6ec',
                  lineHeight: 1,
                  top: '24px',
                  ...(index % 2 === 0 ? { right: '16px' } : { left: '16px' }),
                  zIndex: 1,
                }}
              >
                {project.index}
              </div>

              <div
                className="arrow-indicator absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ color: '#1a5fd4', fontSize: '24px', transform: 'translate(0, 0)', zIndex: 10 }}
              >
                ↗
              </div>

              <div className={`relative z-10 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#1a5fd4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  ► {project.category}
                </div>

                <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '40px', letterSpacing: '-1px', color: '#0f1828', marginBottom: '16px' }}>
                  {project.title}
                </h3>

                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#2a3a5a', lineHeight: 1.9, marginBottom: '16px' }}>
                  {project.description}
                </p>

                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#2a3a5a', marginBottom: '24px' }}>
                  <span style={{ color: '#1a5fd4' }}>◆</span> {project.metric}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: 'JetBrains Mono',
                        fontSize: '10px',
                        padding: '4px 10px',
                        border: '1px solid #d0dcf0',
                        borderRadius: '2px',
                        color: '#2a3a5a',
                        backgroundColor: '#f4f6fa',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded transition-all duration-300 hover:gap-3"
                    style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#ffffff',
                      backgroundColor: '#1a5fd4',
                      textDecoration: 'none',
                      width: 'fit-content',
                    }}
                  >
                    <span className="live-dot" style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#4ade80',
                      display: 'inline-block',
                    }} />
                    View Live ↗
                  </a>
                )}
              </div>

              <div className={`relative z-10 flex items-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {project.visual}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden" style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
          <div className="marquee-content py-4" style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <span>{solved} DSA PROBLEMS <span style={{ color: '#c6ff47' }}>◆</span> LEETCODE {rating} <span style={{ color: '#c6ff47' }}>◆</span> CODECHEF 3★ <span style={{ color: '#c6ff47' }}>◆</span> 6 OPEN SOURCE PRS <span style={{ color: '#c6ff47' }}>◆</span> 200+ WORKSHOP ATTENDEES <span style={{ color: '#c6ff47' }}>◆</span> 99.97 MHT-CET PERCENTILE <span style={{ color: '#c6ff47' }}>◆</span> </span>
            <span>{solved} DSA PROBLEMS <span style={{ color: '#c6ff47' }}>◆</span> LEETCODE {rating} <span style={{ color: '#c6ff47' }}>◆</span> CODECHEF 3★ <span style={{ color: '#c6ff47' }}>◆</span> 6 OPEN SOURCE PRS <span style={{ color: '#c6ff47' }}>◆</span> 200+ WORKSHOP ATTENDEES <span style={{ color: '#c6ff47' }}>◆</span> 99.97 MHT-CET PERCENTILE <span style={{ color: '#c6ff47' }}>◆</span> </span>
          </div>
        </div>
      </div>

      <style>{`
        .project-row:hover .arrow-indicator {
          transform: translate(4px, -4px);
        }
        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .marquee-content span {
          white-space: nowrap;
          padding-right: 4rem;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .live-dot {
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(74, 222, 128, 0); }
        }
      `}</style>
    </section>
  );
}
