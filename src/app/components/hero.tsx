import { useParallax } from '../../hooks/useParallax';

export function Hero() {
  const { ref: gridRef, offset: gridOffset } = useParallax(0.3);
  const { ref: circleRef, offset: circleOffset } = useParallax(0.5);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { number: '99.97', label: 'MHT-CET %ILE', url: null as string | null },
    { number: '494+', label: 'DSA PROBLEMS', url: null as string | null },
    { number: '1970', label: 'LEETCODE', url: 'https://leetcode.com/u/modeiji09/' },
    { number: '3★', label: 'CODECHEF', url: 'https://www.codechef.com/users/rishitmodeiji' },
  ];

  return (
    <section className="relative min-h-screen flex items-center" style={{ paddingTop: '72px' }}>
      {/* ── background decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div
          ref={gridRef}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #a0b4cc 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.08,
            transform: `translateY(${gridOffset * 0.5}px)`,
          }}
        />
        <div
          ref={circleRef}
          className="absolute top-1/2 right-1/4 rotating-circle"
          style={{
            width: '600px',
            height: '600px',
            border: '1px solid rgba(26, 95, 212, 0.1)',
            borderRadius: '50%',
            opacity: 0.08,
            transform: `translate(50%, calc(-50% + ${circleOffset * 0.3}px))`,
          }}
        />
        <div
          className="absolute left-8 top-1/2"
          style={{
            fontFamily: 'Inter',
            fontSize: '10px',
            color: '#a0b4cc',
            transform: 'rotate(-90deg) translateX(-50%)',
            transformOrigin: 'left center',
          }}
        >
          2026
        </div>
      </div>

      {/* ── main content grid ── */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12">
        {/* ── left column: typographic block ── */}
        <div className="flex flex-col justify-center gap-8 fade-up">
          <div style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6080b0', letterSpacing: '0.1em', fontWeight: 600 }}>
            [ MUMBAI, IN · 2026 ]
          </div>

          <div>
            <h1 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(48px, 12vw, 128px)', lineHeight: 0.9, letterSpacing: '-5px', color: '#0f1828' }}>
              RISHIT
            </h1>
            <h1
              style={{
                fontFamily: 'Inter',
                fontWeight: 800,
                fontSize: 'clamp(48px, 12vw, 128px)',
                lineHeight: 0.9,
                letterSpacing: '-5px',
                WebkitTextStroke: '2px #1a5fd4',
                color: 'transparent',
              }}
            >
              MODI
            </h1>
          </div>

          <p style={{ fontFamily: 'Inter', fontSize: '20px', color: '#2a3a5a', fontWeight: 500 }}>
            AI/ML Engineer & Full-Stack Builder
          </p>

          <p style={{ fontFamily: 'Inter', fontSize: '17px', color: '#2a3a5a', lineHeight: 1.8, maxWidth: '580px' }}>
            Building intelligent systems at the edge of cryptography, deep learning, and scalable product engineering. B.Tech CS @ VJTI — top 0.03% nationally.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 rounded transition-all hover:scale-105"
              style={{ fontFamily: 'Inter', fontSize: '13px', textTransform: 'uppercase', backgroundColor: '#1a5fd4', color: '#ffffff', fontWeight: 600 }}
            >
              → View Projects
            </button>
            <a
              href="https://drive.google.com/file/d/1vsR0iFkGEZHado6OIQFdK1XCR48UIiUg/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded transition-all hover:border-[#1a5fd4]"
              style={{ fontFamily: 'Inter', fontSize: '13px', textTransform: 'uppercase', border: '1px solid #d0dcf0', color: '#1a5fd4', backgroundColor: '#e8eef8', textDecoration: 'none', fontWeight: 600 }}
            >
              ↓ Resume
            </a>
            <a
              href="https://github.com/RishitModi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded transition-all hover:border-[#1a5fd4]"
              style={{ fontFamily: 'Inter', fontSize: '13px', textTransform: 'uppercase', border: '1px solid #d0dcf0', color: '#2a3a5a', textDecoration: 'none', fontWeight: 600 }}
            >
              ↗ GitHub
            </a>
            <a
              href="https://linkedin.com/in/rishitmodii"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded transition-all hover:border-[#1a5fd4]"
              style={{ fontFamily: 'Inter', fontSize: '13px', textTransform: 'uppercase', border: '1px solid #d0dcf0', color: '#2a3a5a', textDecoration: 'none', fontWeight: 600 }}
            >
              ↗ LinkedIn
            </a>
          </div>
        </div>

        {/* ── right column: stat cards with ambient backdrop ── */}
        <div className="relative flex flex-col justify-center">
          {/* ambient radial gradient blob behind stat grid for visual balance */}
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(26, 95, 212, 0.04) 0%, transparent 70%)',
            }}
          />

          <div className="relative grid grid-cols-2 gap-3 md:gap-5">
            {stats.map((stat, i) => {
              const content = (
                <>
                  <div style={{
                    fontFamily: 'Inter',
                    fontWeight: 800,
                    fontSize: 'clamp(32px, 3vw, 40px)',
                    color: '#1a5fd4',
                    lineHeight: 1.1,
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    color: '#6080b0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginTop: '8px',
                    fontWeight: 600,
                  }}>
                    {stat.label}
                  </div>
                </>
              );

              const cardClass = `hero-stat-card hero-stat-card-${i} text-center rounded-lg transition-all duration-300`;

              return stat.url ? (
                <a
                  key={i}
                  href={stat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} hover:shadow-lg hover:border-[#1a5fd4] hover:-translate-y-0.5`}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #d0dcf0',
                    textDecoration: 'none',
                    padding: 'clamp(16px, 2.5vw, 36px) clamp(12px, 2vw, 24px)',
                  }}
                >
                  {content}
                </a>
              ) : (
                <div
                  key={i}
                  className={cardClass}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #d0dcf0',
                    padding: 'clamp(16px, 2.5vw, 36px) clamp(12px, 2vw, 24px)',
                  }}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── scroll-down indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center hero-scroll-cue"
        style={{ transform: 'translateX(-50%)', zIndex: 10 }}
      >
        <div className="hero-scroll-line" />
        <div
          style={{
            fontFamily: 'Inter',
            fontSize: '9px',
            color: '#6080b0',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginTop: '10px',
            fontWeight: 500,
          }}
        >
          SCROLL
        </div>
      </div>

      <style>{`
        .rotating-circle {
          animation: rotate 60s linear infinite;
        }
        @keyframes rotate {
          from { transform: translate(50%, -50%) rotate(0deg); }
          to { transform: translate(50%, -50%) rotate(360deg); }
        }
        .fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .fade-up-delayed {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* staggered entrance for individual stat cards */
        .hero-stat-card {
          opacity: 0;
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-stat-card-0 { animation-delay: 0.35s; }
        .hero-stat-card-1 { animation-delay: 0.45s; }
        .hero-stat-card-2 { animation-delay: 0.55s; }
        .hero-stat-card-3 { animation-delay: 0.65s; }

        /* scroll-down indicator */
        .hero-scroll-cue {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards;
          opacity: 0;
        }
        .hero-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, #1a5fd4);
          animation: scrollPulse 2.4s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}
