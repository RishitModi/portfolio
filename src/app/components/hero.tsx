import { useLeetCodeStats } from '../../hooks/useLeetCodeStats';

export function Hero() {
  const lcStats = useLeetCodeStats();

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { number: '99.97', label: 'MHT-CET %ILE', url: null as string | null },
    { number: lcStats.solved, label: 'DSA PROBLEMS', url: null as string | null },
    { number: lcStats.maxRating, label: 'LC MAX RATING', url: 'https://leetcode.com/u/modeiji09/' },
    { number: '3★', label: 'CODECHEF', url: 'https://www.codechef.com/users/rishitmodeiji' },
  ];

  return (
    <section id="profile" className="pt-[96px] pb-10 lg:pt-12 px-6 md:px-8">
      <div className="flex flex-col gap-6 fade-up">
        {/* 1. Location label */}
        <div
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '12px',
            color: '#6080b0',
            letterSpacing: '0.1em',
            fontWeight: 600,
          }}
        >
          [ MUMBAI, IN · 2026 ]
        </div>

        {/* 2. Name */}
        <div>
          <h1
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 8vw, 64px)',
              lineHeight: 0.95,
              letterSpacing: '-2px',
            }}
          >
            <span className="block" style={{ color: '#0f1828' }}>
              RISHIT
            </span>
            <span
              className="block"
              style={{
                WebkitTextStroke: '1.5px #1a5fd4',
                color: 'transparent',
              }}
            >
              MODI
            </span>
          </h1>
        </div>

        {/* 3. Subtitle */}
        <p
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '16px',
            color: '#2a3a5a',
            fontWeight: 500,
          }}
        >
          AI/ML Engineer & Full-Stack Builder
        </p>

        {/* 4. Bio */}
        <p
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '15px',
            color: '#2a3a5a',
            lineHeight: 1.7,
            maxWidth: '520px',
          }}
        >
          Building intelligent systems at the edge of cryptography, deep learning, and scalable product engineering. B.Tech CS @ VJTI — top 0.03% nationally.
        </p>

        {/* 5. Buttons row */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={scrollToProjects}
            className="transition-all hover:opacity-90"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              backgroundColor: '#1a5fd4',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            → View Projects
          </button>
          <a
            href="https://drive.google.com/file/d/1vsR0iFkGEZHado6OIQFdK1XCR48UIiUg/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:border-[#1a5fd4]"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              padding: '8px 16px',
              border: '1px solid #d0dcf0',
              color: '#1a5fd4',
              backgroundColor: '#e8eef8',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
          >
            ↓ Resume
          </a>
          <a
            href="https://github.com/RishitModi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:border-[#1a5fd4]"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              padding: '8px 16px',
              border: '1px solid #d0dcf0',
              color: '#2a3a5a',
              backgroundColor: '#ffffff',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
          >
            ↗ GitHub
          </a>
          <a
            href="https://linkedin.com/in/rishitmodii"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:border-[#1a5fd4]"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              padding: '8px 16px',
              border: '1px solid #d0dcf0',
              color: '#2a3a5a',
              backgroundColor: '#ffffff',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
          >
            ↗ LinkedIn
          </a>
        </div>

        {/* 6. Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {stats.map((stat, i) => {
            const content = (
              <>
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontWeight: 800,
                    fontSize: '24px',
                    color: '#1a5fd4',
                    lineHeight: 1.1,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '10px',
                    color: '#6080b0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginTop: '6px',
                    fontWeight: 600,
                  }}
                >
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
                className={`${cardClass} hover:shadow-md hover:border-[#1a5fd4] hover:-translate-y-0.5`}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #d0dcf0',
                  textDecoration: 'none',
                  padding: '14px 10px',
                  display: 'block',
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
                  padding: '14px 10px',
                }}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
        .hero-stat-card {
          opacity: 0;
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-stat-card-0 { animation-delay: 0.35s; }
        .hero-stat-card-1 { animation-delay: 0.45s; }
        .hero-stat-card-2 { animation-delay: 0.55s; }
        .hero-stat-card-3 { animation-delay: 0.65s; }
      `}</style>
    </section>
  );
}
