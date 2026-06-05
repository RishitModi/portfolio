import { useEffect, useState } from 'react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: '72px',
        backgroundColor: isScrolled ? 'rgba(244, 246, 250, 0.92)' : 'transparent',
        borderBottom: isScrolled ? '1px solid #d0dcf0' : 'none',
        backdropFilter: isScrolled ? 'blur(24px)' : 'none',
      }}
    >
      <div className="h-full px-6 md:px-16 flex items-center justify-between max-w-[1920px] mx-auto">
        <div className="flex items-center gap-1" style={{ fontFamily: 'Syne', fontWeight: 800 }}>
          <span style={{ color: '#0f1828' }}>RM</span>
          <span className="cursor-blink" style={{ color: '#1a5fd4' }}>_</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="nav-link group relative"
            style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a3a5a' }}
          >
            <span className="bullet" style={{ color: '#1a5fd4', opacity: 0, position: 'absolute', left: '-16px', transition: 'opacity 0.2s, transform 0.2s', transform: 'translateX(-4px)' }}>▪</span>
            <span className="group-hover:[&+.bullet]:opacity-100 group-hover:[&+.bullet]:translate-x-0">About</span>
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="nav-link group relative"
            style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a3a5a' }}
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="nav-link group relative"
            style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a3a5a' }}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="nav-link group relative"
            style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a3a5a' }}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ border: '1px solid #d0dcf0', backgroundColor: '#ffffff' }}>
            <div className="w-2 h-2 rounded-full pulse-dot" style={{ backgroundColor: '#1a5fd4' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#2a3a5a' }}>Available for work</span>
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2.5 rounded transition-all hover:scale-105"
            style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', textTransform: 'uppercase', backgroundColor: '#1a5fd4', color: '#ffffff', fontWeight: 500 }}
          >
            Get in touch →
          </button>
        </div>
      </div>

      <style>{`
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        .pulse-dot {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .nav-link:hover .bullet {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </nav>
  );
}
