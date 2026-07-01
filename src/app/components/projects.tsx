import { useEffect, useRef, useState, useMemo } from 'react';
import { useLeetCodeStats } from '../../hooks/useLeetCodeStats';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { rating, solved } = useLeetCodeStats();

  const projects = useMemo(
    () => [
      {
        index: '01',
        title: 'Voyexa',
        category: 'ACTIVE PROJECT',
        description:
          'AI-powered travel companion using Gemini 1.5 Flash for intelligent itinerary generation. Full-stack app with React frontend, Spring Boot backend, and PostgreSQL for user data persistence.',
        metric: 'Gemini 1.5 integration · Live deployment',
        tags: ['React', 'Tailwind', 'Spring Boot', 'PostgreSQL', 'Gemini 1.5', 'Geoapify'],
        liveUrl: 'https://voyexa.vercel.app' as string | null,
        githubUrl: 'https://github.com/RishitModi/Voyexa' as string | null,
        videoSrc: `${import.meta.env.BASE_URL}images/voyexa_demo.webm`,
        imageSrc: null as string | null,
        iframeSrc: null as string | null,
      },
      {
        index: '02',
        title: 'eDNA Analyser',
        category: 'BIODIVERSITY ML',
        description:
          'Automated environmental DNA analysis pipeline using Variational Autoencoders for species clustering and biodiversity assessment. Flask-based web interface with interactive visualizations.',
        metric: 'VAE clustering · HDBSCAN · Real-time viz',
        tags: ['Flask', 'TensorFlow', 'VAE', 'HDBSCAN', 'Chart.js', 'Scikit-learn'],
        liveUrl: null as string | null,
        githubUrl: 'https://github.com/RishitModi/eDNA-Analyser' as string | null,
        videoSrc: `${import.meta.env.BASE_URL}images/edna_demo.webm`,
        imageSrc: null as string | null,
        iframeSrc: null as string | null,
      },
      {
        index: '03',
        title: 'Energy-based & Neurosymbolic Cryptanalysis',
        category: 'ML RESEARCH',
        description:
          'Novel approach to cipher classification using Energy-Based Transformers and side-channel analysis. Achieved 76% validation accuracy across multiple cipher families with deep learning architectures.',
        metric: '76% validation accuracy · 10K SCA traces',
        tags: ['PyTorch', 'Pycryptodome', 'CNN', 'Transformer', 'Side-Channel'],
        liveUrl: null as string | null,
        githubUrl: 'https://github.com/RishitModi/Cryptanalysis' as string | null,
        videoSrc: null as string | null,
        imageSrc: null as string | null,
        iframeSrc: 'https://anuushkay.github.io/Cryptanalysis_Documentation/',
      },
      {
        index: '04',
        title: 'Enterprise E-Commerce API',
        category: 'BACKEND ARCHITECTURE',
        description:
          'Production-ready backend system for a scalable e-commerce platform. Engineered with modern Java and Spring Boot, featuring secure JWT authentication with RBAC, automated Flyway migrations, and a complete order processing pipeline.',
        metric: 'Scalable Architecture · JWT Security',
        tags: ['Java 23', 'Spring Boot', 'Spring Security', 'MySQL', 'JWT'],
        liveUrl: null as string | null,
        githubUrl: 'https://github.com/RishitModi/e-commerceBackend' as string | null,
        videoSrc: null as string | null,
        imageSrc: null as string | null,
        iframeSrc: null as string | null,
      },
    ],
    [],
  );

  const totalSlides = projects.length + 1; // +1 for intro slide

  /* ── scroll → activeIndex mapping ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollInto = window.scrollY - sectionTop;
      const vh = window.innerHeight;

      if (scrollInto <= 0) {
        setActiveIndex(0);
        return;
      }
      const maxIdx = totalSlides - 1;
      const idx = Math.min(Math.round(scrollInto / vh), maxIdx);
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSlides]);

  /* ── style helpers ── */
  const transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';

  const slideStyle = (slideIdx: number): React.CSSProperties => {
    const isActive = activeIndex === slideIdx;
    const isPast = activeIndex > slideIdx;
    return {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      transition,
      opacity: isActive ? 1 : 0,
      transform: isActive
        ? 'translateY(0) scale(1)'
        : isPast
          ? 'translateY(-80px) scale(0.96)'
          : 'translateY(80px) scale(0.96)',
      pointerEvents: isActive ? 'auto' : 'none',
      willChange: 'opacity, transform',
    };
  };

  /* ── staggered content delay when slide becomes active ── */
  const contentDelay = (slideIdx: number, order: number): React.CSSProperties => {
    const isActive = activeIndex === slideIdx;
    return {
      transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${order * 80}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${order * 80}ms`,
      opacity: isActive ? 1 : 0,
      transform: isActive ? 'translateY(0)' : 'translateY(24px)',
    };
  };

  /* ── marquee strip (shown on every project slide) ── */
  const marquee = (
    <div
      className="absolute bottom-0 left-0 right-0 overflow-hidden"
      style={{ borderTop: '1px solid #d0dcf0', zIndex: 20 }}
    >
      <div
        className="marquee-content py-3"
        style={{
          fontFamily: 'Inter',
          fontSize: '11px',
          color: '#6080b0',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        <span>
          {solved} DSA PROBLEMS <span style={{ color: '#1a5fd4' }}>◆</span> LEETCODE {rating}{' '}
          <span style={{ color: '#1a5fd4' }}>◆</span> CODECHEF 3★{' '}
          <span style={{ color: '#1a5fd4' }}>◆</span> 6 OPEN SOURCE PRS{' '}
          <span style={{ color: '#1a5fd4' }}>◆</span> 200+ WORKSHOP ATTENDEES{' '}
          <span style={{ color: '#1a5fd4' }}>◆</span> 99.97 MHT-CET PERCENTILE{' '}
          <span style={{ color: '#1a5fd4' }}>◆</span>{' '}
        </span>
        <span>
          {solved} DSA PROBLEMS <span style={{ color: '#1a5fd4' }}>◆</span> LEETCODE {rating}{' '}
          <span style={{ color: '#1a5fd4' }}>◆</span> CODECHEF 3★{' '}
          <span style={{ color: '#1a5fd4' }}>◆</span> 6 OPEN SOURCE PRS{' '}
          <span style={{ color: '#1a5fd4' }}>◆</span> 200+ WORKSHOP ATTENDEES{' '}
          <span style={{ color: '#1a5fd4' }}>◆</span> 99.97 MHT-CET PERCENTILE{' '}
          <span style={{ color: '#1a5fd4' }}>◆</span>{' '}
        </span>
      </div>
    </div>
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ height: `${totalSlides * 100}vh`, position: 'relative' }}
    >
      {/* ── sticky viewport ── */}
      <div
        className="projects-viewport"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#f4f6fa',
        }}
      >
        {/* ═══ INTRO SLIDE ═══ */}
        <div style={slideStyle(0)}>
          <div
            className="px-6 md:px-16 flex flex-col items-center justify-center text-center"
            style={{ height: '100%' }}
          >
            <div style={contentDelay(0, 0)}>
              <div
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#1a5fd4',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '32px',
                }}
              >
                [ 03 — PROJECTS ]
              </div>
            </div>

            <div style={contentDelay(0, 1)}>
              <h2
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 800,
                  fontSize: 'clamp(48px, 8vw, 96px)',
                  letterSpacing: '-3px',
                  color: '#0f1828',
                  lineHeight: 1.05,
                  marginBottom: '24px',
                }}
              >
                Things I've
                <br />
                shipped.
              </h2>
            </div>

            <div style={contentDelay(0, 2)}>
              <p
                style={{
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  color: '#6080b0',
                  maxWidth: '420px',
                }}
              >
                {projects.length} projects — scroll to explore
              </p>
            </div>

            {/* scroll-down indicator */}
            <div
              className="absolute bottom-12 left-1/2"
              style={{
                transform: 'translateX(-50%)',
                ...contentDelay(0, 3),
              }}
            >
              <div className="scroll-indicator-line" />
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  color: '#6080b0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginTop: '12px',
                }}
              >
                Scroll
              </div>
            </div>
          </div>
        </div>

        {/* ═══ PROJECT SLIDES ═══ */}
        {projects.map((project, index) => {
          const slideIdx = index + 1;
          const isEven = index % 2 === 0;

          return (
            <div key={project.index} style={slideStyle(slideIdx)}>
              <div
                className="relative flex flex-col h-full px-6 md:px-16 pt-16 md:pt-0"
                style={{ maxWidth: '1920px', margin: '0 auto', width: '100%' }}
              >
                {/* watermark number */}
                <div
                  className="hidden lg:block absolute pointer-events-none select-none"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 800,
                    fontSize: 'clamp(100px, 12vw, 180px)',
                    color: '#e0e8f4',
                    lineHeight: 1,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    ...(isEven ? { right: '48px' } : { left: '48px' }),
                    zIndex: 1,
                  }}
                >
                  {project.index}
                </div>

                {/* counter */}
                <div
                  className="absolute top-8 left-6 md:left-16"
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    color: '#6080b0',
                    zIndex: 10,
                    ...contentDelay(slideIdx, 0),
                  }}
                >
                  <span style={{ color: '#1a5fd4', fontWeight: 700 }}>{project.index}</span>
                  <span style={{ margin: '0 6px', color: '#d0dcf0' }}>/</span>
                  <span>{String(projects.length).padStart(2, '0')}</span>
                </div>

                {/* two-column layout */}
                <div
                  className={`relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 flex-1 items-center pb-16`}
                >
                  {/* ── text column ── */}
                  <div className={`flex flex-col justify-center ${!isEven ? 'lg:order-2' : ''}`}>
                    <div style={contentDelay(slideIdx, 1)}>
                      <div
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '10px',
                          color: '#1a5fd4',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          marginBottom: '16px',
                        }}
                      >
                        ► {project.category}
                      </div>
                    </div>

                    <div style={contentDelay(slideIdx, 2)}>
                      <h3
                        style={{
                          fontFamily: 'Inter',
                          fontWeight: 800,
                          fontSize: 'clamp(28px, 4vw, 48px)',
                          letterSpacing: '-1.5px',
                          color: '#0f1828',
                          lineHeight: 1.1,
                          marginBottom: '20px',
                        }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    <div style={contentDelay(slideIdx, 3)}>
                      <p
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '13px',
                          color: '#2a3a5a',
                          lineHeight: 1.9,
                          marginBottom: '16px',
                          maxWidth: '520px',
                        }}
                      >
                        {project.description}
                      </p>
                    </div>

                    <div style={contentDelay(slideIdx, 4)}>
                      <div
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '12px',
                          color: '#2a3a5a',
                          marginBottom: '24px',
                        }}
                      >
                        <span style={{ color: '#1a5fd4' }}>◆</span> {project.metric}
                      </div>
                    </div>

                    <div style={contentDelay(slideIdx, 5)}>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            style={{
                              fontFamily: 'Inter',
                              fontSize: '10px',
                              padding: '4px 10px',
                              border: '1px solid #d0dcf0',
                              borderRadius: '2px',
                              color: '#2a3a5a',
                              backgroundColor: '#eef2f9',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={contentDelay(slideIdx, 6)} className="flex items-center gap-4 mt-6">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded transition-all duration-300 hover:bg-gray-50"
                          style={{
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#1a5fd4',
                            backgroundColor: '#ffffff',
                            border: '1px solid #d0dcf0',
                            textDecoration: 'none',
                            boxShadow: '0 1px 2px rgba(15, 24, 40, 0.05)',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#0f1828"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76 0-1.5-.5-2.7-1.3-3.7.1-.3.6-1.7-.1-3.6 0 0-1-.3-3.3 1.3-1-.3-2.1-.4-3.2-.4s-2.2.1-3.2.4c-2.3-1.6-3.3-1.3-3.3-1.3-.7 1.9-.2 3.3-.1 3.6-1 .9-1.5 2.1-1.5 3.7 0 5.2 3 6.4 6 6.7-.8.7-1 1.9-1 3.2v4"></path>
                            <path d="M9 18c-4.51 2-5-2-7-2"></path>
                          </svg>
                          Source Code
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded transition-all duration-300 hover:gap-3"
                          style={{
                            fontFamily: 'Inter',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#ffffff',
                            backgroundColor: '#1a5fd4',
                            textDecoration: 'none',
                          }}
                        >
                          <span
                            className="live-dot"
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#4ade80',
                              display: 'inline-block',
                            }}
                          />
                          View Live ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* ── visual column ── */}
                  <div
                    className={`flex items-center justify-center ${!isEven ? 'lg:order-1' : ''}`}
                    style={{
                      ...contentDelay(slideIdx, 2),
                      maxHeight: 'calc(100vh - 160px)',
                    }}
                  >
                    <div
                      className="w-full rounded-lg overflow-hidden project-visual-card"
                      style={{
                        border: '1px solid #d0dcf0',
                        boxShadow: '0 24px 64px -16px rgba(15, 24, 40, 0.12)',
                        maxHeight: 'calc(100vh - 180px)',
                      }}
                    >
                      {project.videoSrc ? (
                        <video
                          src={project.videoSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full"
                          style={{ display: 'block', maxHeight: 'calc(100vh - 200px)', objectFit: 'contain' }}
                        />
                      ) : project.iframeSrc ? (
                        <div style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
                          <iframe
                            src={project.iframeSrc}
                            title={`${project.title} documentation`}
                            className="absolute inset-0 w-full h-full"
                            style={{
                              border: 'none',
                              borderRadius: '8px',
                              pointerEvents: 'auto',
                            }}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin"
                          />
                        </div>
                      ) : project.imageSrc ? (
                        <img
                          src={project.imageSrc}
                          alt={`${project.title} preview`}
                          className="w-full"
                          style={{ display: 'block', maxHeight: 'calc(100vh - 200px)', objectFit: 'contain' }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* marquee at bottom of every project slide */}
                {marquee}
              </div>
            </div>
          );
        })}

        {/* ═══ PROGRESS DOTS (right side) ═══ */}
        <div
          className="hidden md:flex absolute flex-col items-center gap-3"
          style={{
            right: '32px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 50,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              aria-label={i === 0 ? 'Intro slide' : `Project ${i}`}
              style={{
                width: activeIndex === i ? '10px' : '6px',
                height: activeIndex === i ? '10px' : '6px',
                borderRadius: '50%',
                backgroundColor: activeIndex === i ? '#1a5fd4' : '#c8d6ec',
                border: 'none',
                padding: 0,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: activeIndex === i ? '0 0 0 4px rgba(26, 95, 212, 0.15)' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── inline styles ── */}
      <style>{`
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
        .scroll-indicator-line {
          width: 1px;
          height: 48px;
          margin: 0 auto;
          background: linear-gradient(to bottom, transparent, #1a5fd4);
          animation: scroll-pulse 2s ease-in-out infinite;
        }
        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
        .project-visual-card {
          transition: box-shadow 0.5s ease, transform 0.5s ease;
        }
        .project-visual-card:hover {
          box-shadow: 0 32px 80px -20px rgba(15, 24, 40, 0.2);
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}
