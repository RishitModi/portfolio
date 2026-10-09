import { useLeetCodeStats } from '../../hooks/useLeetCodeStats';
import { LINKS, PROFILE } from '../../lib/content';

export function Hero() {
  const lcStats = useLeetCodeStats();
  const [firstName, lastName] = PROFILE.name.toUpperCase().split(' ');

  const stats = [
    { number: '99.97', label: 'MHT-CET %ILE', url: null as string | null },
    { number: lcStats.solved, label: 'DSA PROBLEMS', url: null as string | null },
    { number: lcStats.maxRating, label: 'LC MAX RATING', url: LINKS.leetcode },
    { number: '3★', label: 'CODECHEF', url: LINKS.codechef },
  ];

  return (
    <section id="profile" className="pt-[96px] pb-10 lg:pt-14 px-6 md:px-8">
      <div className="flex flex-col gap-6 fade-up">
        {/* 1. Location label */}
        <div
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '12px',
            color: 'var(--muted)',
            letterSpacing: '0.1em',
            fontWeight: 600,
          }}
        >
          [ {PROFILE.location.toUpperCase()} · {PROFILE.year} ]
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
            <span className="block" style={{ color: 'var(--ink)' }}>
              {firstName}
            </span>
            <span
              className="block"
              style={{
                WebkitTextStroke: '1.5px var(--accent)',
                color: 'transparent',
              }}
            >
              {lastName}
            </span>
          </h1>
        </div>

        {/* 3. Subtitle */}
        <p
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '16px',
            color: 'var(--body)',
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
            color: 'var(--body)',
            lineHeight: 1.7,
            maxWidth: '520px',
          }}
        >
          Building intelligent systems at the edge of cryptography, deep learning, and scalable product engineering. B.Tech CS @ VJTI — top 0.03% nationally.
        </p>

        {/* 5. Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat, i) => {
            const content = (
              <>
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontWeight: 800,
                    fontSize: '24px',
                    color: 'var(--accent)',
                    lineHeight: 1.1,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    fontSize: '10px',
                    color: 'var(--muted)',
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
                className={`${cardClass} hover:shadow-md hover:border-accent hover:-translate-y-0.5`}
                style={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--line)',
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
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--line)',
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
