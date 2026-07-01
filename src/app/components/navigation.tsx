import { useEffect, useState } from 'react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="flex items-center gap-1" style={{ fontFamily: 'Inter', fontWeight: 800, zIndex: 60 }}>
          <span style={{ color: '#0f1828' }}>RM</span>
          <span className="cursor-blink" style={{ color: '#1a5fd4' }}>_</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="nav-link group relative"
            style={{ fontFamily: 'Inter', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a3a5a' }}
          >
            <span className="bullet" style={{ color: '#1a5fd4', opacity: 0, position: 'absolute', left: '-16px', transition: 'opacity 0.2s, transform 0.2s', transform: 'translateX(-4px)' }}>▪</span>
            <span className="group-hover:[&+.bullet]:opacity-100 group-hover:[&+.bullet]:translate-x-0">About</span>
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="nav-link group relative"
            style={{ fontFamily: 'Inter', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a3a5a' }}
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="nav-link group relative"
            style={{ fontFamily: 'Inter', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a3a5a' }}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="nav-link group relative"
            style={{ fontFamily: 'Inter', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a3a5a' }}
          >
            Contact
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://drive.google.com/file/d/1vsR0iFkGEZHado6OIQFdK1XCR48UIiUg/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link group relative"
            style={{ fontFamily: 'Inter', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a3a5a', textDecoration: 'none' }}
          >
            Resume ↗
          </a>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2.5 rounded transition-all hover:scale-105"
            style={{ fontFamily: 'Inter', fontSize: '11px', textTransform: 'uppercase', backgroundColor: '#1a5fd4', color: '#ffffff', fontWeight: 500 }}
          >
            Get in touch →
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 z-60 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ zIndex: 60 }}
        >
          <span className="block w-6 h-[2px] bg-[#0f1828] transition-transform duration-300" style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span className="block w-6 h-[2px] bg-[#0f1828] transition-opacity duration-300" style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>
          <span className="block w-6 h-[2px] bg-[#0f1828] transition-transform duration-300" style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#f4f6fa] z-50 flex flex-col items-center justify-center transition-all duration-300 ease-in-out md:hidden`}
        style={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        <div className="flex flex-col items-center gap-8 text-center w-full px-6">
          <button
            onClick={() => { scrollToSection('about'); setIsMobileMenuOpen(false); }}
            style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px', color: '#0f1828', letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            About
          </button>
          <button
            onClick={() => { scrollToSection('skills'); setIsMobileMenuOpen(false); }}
            style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px', color: '#0f1828', letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            Skills
          </button>
          <button
            onClick={() => { scrollToSection('projects'); setIsMobileMenuOpen(false); }}
            style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px', color: '#0f1828', letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            Projects
          </button>
          <button
            onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }}
            style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px', color: '#0f1828', letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            Contact
          </button>
          
          <div className="w-12 h-px bg-[#d0dcf0] my-2"></div>
          
          <a
            href="https://drive.google.com/file/d/1vsR0iFkGEZHado6OIQFdK1XCR48UIiUg/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ fontFamily: 'Inter', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a5fd4', textDecoration: 'none' }}
          >
            Download Resume ↗
          </a>
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
