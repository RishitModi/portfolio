import { useParallax } from '../../hooks/useParallax';

export function Hero() {
  const { ref: gridRef, offset: gridOffset } = useParallax(0.3);
  const { ref: circleRef, offset: circleOffset } = useParallax(0.5);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center" style={{ paddingTop: '72px' }}>
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
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            color: '#a0b4cc',
            transform: 'rotate(-90deg) translateX(-50%)',
            transformOrigin: 'left center',
          }}
        >
          2026
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12">
        <div className="flex flex-col justify-center gap-8 fade-up">
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#6080b0', letterSpacing: '0.1em' }}>
            [ MUMBAI, IN · 2026 ]
          </div>

          <div>
            <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(72px, 10vw, 128px)', lineHeight: 0.9, letterSpacing: '-5px', color: '#0f1828' }}>
              RISHIT
            </h1>
            <h1
              style={{
                fontFamily: 'Syne',
                fontWeight: 800,
                fontSize: 'clamp(72px, 10vw, 128px)',
                lineHeight: 0.9,
                letterSpacing: '-5px',
                WebkitTextStroke: '2px #1a5fd4',
                color: 'transparent',
              }}
            >
              MODI
            </h1>
          </div>

          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '16px', color: '#2a3a5a' }}>
            AI/ML Engineer & Full-Stack Builder
          </p>

          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#2a3a5a', lineHeight: 2, maxWidth: '540px' }}>
            Building intelligent systems at the edge of cryptography, deep learning, and scalable product engineering. B.Tech CS @ VJTI — top 0.03% nationally.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 rounded transition-all hover:scale-105"
              style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', textTransform: 'uppercase', backgroundColor: '#1a5fd4', color: '#ffffff', fontWeight: 500 }}
            >
              → View Projects
            </button>
            <a
              href="https://github.com/RishitModi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded transition-all hover:border-[#1a5fd4]"
              style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', textTransform: 'uppercase', border: '1px solid #d0dcf0', color: '#2a3a5a' }}
            >
              ↗ github.com/RishitModi
            </a>
          </div>

          <div className="flex items-center gap-6" style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#6080b0' }}>
            <span>1839 · LeetCode</span>
            <span style={{ color: '#d0dcf0' }}>|</span>
            <span>250+ · DSA Solved</span>
            <span style={{ color: '#d0dcf0' }}>|</span>
            <span>99.97%ile · MHT-CET</span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 fade-up-delayed">
          <div
            className="rounded-lg overflow-hidden"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d0dcf0',
              boxShadow: '0 20px 60px rgba(26, 95, 212, 0.06)',
            }}
          >
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid #d0dcf0', backgroundColor: '#e8eef8' }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e74c3c' }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f39c12' }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27ae60' }} />
              </div>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#6080b0', marginLeft: '12px' }}>
                ~/rishit/profile.py
              </span>
            </div>

            <div className="p-6" style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', lineHeight: 1.8 }}>
              <div><span style={{ color: '#6c3fd4' }}>class</span> <span style={{ color: '#0a3a8a' }}>RishitModi</span>:</div>
              <div className="pl-6"><span style={{ color: '#6080b0' }}>name</span> = <span style={{ color: '#1a5fd4' }}>"Rishit Modi"</span></div>
              <div className="pl-6"><span style={{ color: '#6080b0' }}>institute</span> = <span style={{ color: '#1a5fd4' }}>"VJTI Mumbai"</span></div>
              <div className="pl-6"><span style={{ color: '#6080b0' }}>focus</span> = [</div>
              <div className="pl-12"><span style={{ color: '#1a5fd4' }}>"AI/ML"</span>,</div>
              <div className="pl-12"><span style={{ color: '#1a5fd4' }}>"Full-Stack"</span>,</div>
              <div className="pl-12"><span style={{ color: '#1a5fd4' }}>"Cryptography"</span></div>
              <div className="pl-6">]</div>
              <div className="pl-6"><span style={{ color: '#6080b0' }}>leetcode_rating</span> = <span style={{ color: '#0a8a5a' }}>1839</span></div>
              <div className="pl-6"><span style={{ color: '#6080b0' }}>open_to_work</span> = <span style={{ color: '#c0392b' }}>True</span></div>
              <div className="mt-4 pl-6"><span style={{ color: '#6c3fd4' }}>def</span> <span style={{ color: '#0a3a8a' }}>deploy</span>(<span style={{ color: '#6080b0' }}>self</span>):</div>
              <div className="pl-12"><span style={{ color: '#6c3fd4' }}>return</span> <span style={{ color: '#1a5fd4' }}>"let's build something real."</span></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { number: '99.97', label: 'MHT-CET %ile' },
              { number: '250+', label: 'DSA Problems' },
              { number: '1839', label: 'LeetCode' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4">
                <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '32px', color: '#1a5fd4' }}>
                  {stat.number}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#6080b0', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
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
      `}</style>
    </section>
  );
}
