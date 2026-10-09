import { useEffect, useRef, useState } from 'react';
import { scrollToId } from '../../lib/scroll';
import { LINKS } from '../../lib/content';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
] as const;

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // ── Escape key ────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    scrollToId(id);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    /*
     * IMPORTANT: the <nav> must NOT have backdrop-filter, filter, or
     * will-change on itself — those properties create a new containing block,
     * which clips `fixed` children to the nav's 72 px height instead of the
     * viewport. The frosted-glass effect lives on an absolutely-positioned
     * child that sits behind the nav content.
     */
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ height: '72px' }}
    >
      {/* ── frosted-glass backdrop (behind nav content) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'color-mix(in srgb, var(--canvas) 92%, transparent)' : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--line)' : 'none',
          backdropFilter: isScrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
        }}
      />

      {/* ── nav content row ── */}
      <div className="relative z-10 h-full px-6 md:px-16 flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Logo — always above overlay (z-10 on this row > z-[55] on overlay) */}
        <div
          className="flex items-center gap-1"
          style={{ fontFamily: 'Inter Variable, Inter, system-ui, sans-serif', fontWeight: 800 }}
        >
          <span style={{ color: 'var(--ink)' }}>RM</span>
          <span className="cursor-blink" style={{ color: 'var(--accent)' }}>_</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="nav-link"
              style={{
                fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--body)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--body)',
              textDecoration: 'none',
            }}
          >
            Resume ↗
          </a>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2.5 rounded transition-all hover:scale-105"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '11px',
              textTransform: 'uppercase',
              backgroundColor: 'var(--accent-solid)',
              color: '#ffffff',
              fontWeight: 500,
            }}
          >
            Get in touch →
          </button>
        </div>

        {/* Mobile hamburger — always above overlay */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 relative z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className="block w-6 h-[2px] bg-ink transition-transform duration-300"
            style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}
          />
          <span
            className="block w-6 h-[2px] bg-ink transition-opacity duration-300"
            style={{ opacity: isMobileMenuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-[2px] bg-ink transition-transform duration-300"
            style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}
          />
        </button>
      </div>

      {/*
       * Mobile menu overlay.
       *
       * It is rendered as a sibling of the nav content row, NOT a child of
       * the nav element, to avoid the containing-block problem — but because
       * we cannot break out of <nav> in JSX, we use `position: fixed` with
       * explicit viewport dimensions.
       *
       * Accessibility:
       *  - `visibility` transitions from hidden→visible so the element is
       *    removed from the accessibility tree and tab order when closed.
       *  - `aria-hidden` mirrors the same state for AT that ignore visibility.
       *  - `inert` (where supported) prevents any focus/interaction.
       */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        aria-hidden={!isMobileMenuOpen}
        className="md:hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100dvh',
          backgroundColor: 'var(--canvas)',
          zIndex: 55, // above frosted-glass backdrop (-z-10 relative to nav), below nav content (z-10)
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out, visibility 0.3s',
          opacity: isMobileMenuOpen ? 1 : 0,
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
        }}
        // `inert` attribute: prevents focus/interaction for browsers that support it
        {...(!isMobileMenuOpen ? { inert: '' } : {})}
      >
        <div className="flex flex-col items-center gap-8 text-center w-full px-6">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => {
                scrollToSection(id);
                closeMenu();
              }}
              style={{
                fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '24px',
                color: 'var(--ink)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </button>
          ))}

          <div className="w-12 h-px bg-line my-2" />

          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              textDecoration: 'none',
            }}
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

        /* Desktop nav-link hover: colour shift + animated underline */
        .nav-link {
          position: relative;
          transition: color 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--accent);
          transition: width 0.2s ease;
        }
        .nav-link:hover {
          color: var(--accent) !important;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}
