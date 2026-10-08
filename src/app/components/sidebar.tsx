import { useEffect, useRef, useState } from 'react';

// ─── shared constants ─────────────────────────────────────────────────────────
export const RESUME_URL =
  'https://drive.google.com/file/d/1dujS7VBswnAi-Rb2ICW0JK79Y9O_yfnF/view?usp=sharing';

export const NAV_ITEMS = [
  { label: 'Profile', id: 'profile' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]['id'];

// ─── inline SVG icons (24-px viewBox, stroke currentColor) ───────────────────
interface IconProps {
  size?: number;
}

function IconHome({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function IconUser({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconZap({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconCode({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function IconMail({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconGitHub({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76 0-1.5-.5-2.7-1.3-3.7.1-.3.6-1.7-.1-3.6 0 0-1-.3-3.3 1.3-1-.3-2.1-.4-3.2-.4s-2.2.1-3.2.4c-2.3-1.6-3.3-1.3-3.3-1.3-.7 1.9-.2 3.3-.1 3.6-1 .9-1.5 2.1-1.5 3.7 0 5.2 3 6.4 6 6.7-.8.7-1 1.9-1 3.2v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
function IconLinkedIn({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const NAV_ICONS: Record<NavId, (props: IconProps) => JSX.Element> = {
  profile: IconHome,
  about: IconUser,
  skills: IconZap,
  projects: IconCode,
  contact: IconMail,
};

// ─── scroll-spy hook ──────────────────────────────────────────────────────────
function useScrollSpy(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the first entry that is intersecting (topmost visible section)
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting.length > 0) {
          setActive(intersecting[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// ─── smooth-scroll helper ─────────────────────────────────────────────────────
function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: 'smooth' });
}

// ─── DesktopSidebar ───────────────────────────────────────────────────────────
export function DesktopSidebar() {
  const activeId = useScrollSpy(NAV_ITEMS.map((n) => n.id));

  return (
    <aside
      className="hidden lg:flex flex-col sticky top-0 h-screen"
      style={{ borderRight: '1px solid #d0dcf0' }}
    >
      <div className="flex flex-col h-full px-4 py-6 gap-6">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 mb-2 self-start"
          aria-label="Scroll to top"
          style={{ fontFamily: 'Inter Variable, Inter, system-ui, sans-serif', fontWeight: 800, fontSize: '18px' }}
        >
          <span style={{ color: '#0f1828' }}>RM</span>
          <span className="sidebar-blink" style={{ color: '#1a5fd4' }}>_</span>
        </button>

        {/* Nav */}
        <nav aria-label="Primary" className="flex-1">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, id }) => {
              const isActive = activeId === id;
              const Icon = NAV_ICONS[id];
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(id);
                    }}
                    className="sidebar-nav-link flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? '#e8eef8' : 'transparent',
                      color: isActive ? '#1a5fd4' : '#2a3a5a',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '14px',
                      textDecoration: 'none',
                      fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span style={{ color: isActive ? '#1a5fd4' : '#6080b0', flexShrink: 0 }}>
                      <Icon size={20} />
                    </span>
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Resume CTA */}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 rounded-lg transition-opacity hover:opacity-90"
          style={{
            backgroundColor: '#1a5fd4',
            color: '#ffffff',
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          Resume ↗
        </a>

        {/* Social links */}
        <div className="flex items-center gap-4 justify-center pt-2" style={{ borderTop: '1px solid #d0dcf0' }}>
          <a
            href="https://github.com/RishitModi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="sidebar-social-link transition-colors duration-200"
            style={{ color: '#6080b0' }}
          >
            <IconGitHub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/rishitmodii"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="sidebar-social-link transition-colors duration-200"
            style={{ color: '#6080b0' }}
          >
            <IconLinkedIn size={18} />
          </a>
          <a
            href="mailto:modirishit6@gmail.com"
            aria-label="Email"
            className="sidebar-social-link transition-colors duration-200"
            style={{ color: '#6080b0' }}
          >
            <IconMail size={18} />
          </a>
        </div>
      </div>

      <style>{`
        .sidebar-blink {
          animation: sidebar-blink-kf 1s step-end infinite;
        }
        @keyframes sidebar-blink-kf {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        .sidebar-nav-link:hover {
          background-color: #e8eef8 !important;
          color: #1a5fd4 !important;
        }
        .sidebar-nav-link:hover span {
          color: #1a5fd4 !important;
        }
        .sidebar-social-link:hover {
          color: #1a5fd4 !important;
        }
      `}</style>
    </aside>
  );
}

// ─── MobileTopBar ─────────────────────────────────────────────────────────────
export function MobileTopBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setIsOpen(false);
  const nav = (id: string) => { scrollToId(id); close(); };

  return (
    /*
     * The <header> must have NO filter, backdrop-filter or transform — those
     * create a containing block that clips fixed children to the bar's height.
     * The frosted-glass effect lives on the -z-10 child div below.
     */
    <header
      className="lg:hidden fixed top-0 left-0 right-0 z-50"
      style={{ height: '72px' }}
    >
      {/* frosted-glass backdrop — behind header content */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'rgba(244, 246, 250, 0.92)' : '#f4f6fa',
          borderBottom: '1px solid #d0dcf0',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        }}
      />

      {/* content row */}
      <div className="relative z-10 h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1"
          aria-label="Scroll to top"
          style={{ fontFamily: 'Inter Variable, Inter, system-ui, sans-serif', fontWeight: 800, fontSize: '18px' }}
        >
          <span style={{ color: '#0f1828' }}>RM</span>
          <span className="sidebar-blink" style={{ color: '#1a5fd4' }}>_</span>
        </button>

        {/* Hamburger */}
        <button
          id="mobile-topbar-toggle"
          className="flex flex-col justify-center gap-[5px] w-8 h-8 z-10 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-drawer"
        >
          <span
            className="block w-6 h-[2px] bg-[#0f1828] transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}
          />
          <span
            className="block w-6 h-[2px] bg-[#0f1828] transition-opacity duration-300"
            style={{ opacity: isOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-[2px] bg-[#0f1828] transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}
          />
        </button>
      </div>

      {/*
       * Full-screen drawer — fixed inset-0 so it always covers the full
       * viewport regardless of scroll position or the bar's containing block.
       * visibility:hidden + aria-hidden + inert remove it from a11y tree when
       * closed while still allowing the opacity/transform transition.
       */}
      <div
        id="mobile-drawer"
        ref={overlayRef}
        aria-hidden={!isOpen}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100dvh',
          backgroundColor: '#f4f6fa',
          zIndex: 55,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-16px)',
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        {...(!isOpen ? { inert: '' } : {})}
      >
        {/* Nav items */}
        <nav aria-label="Mobile primary" className="flex flex-col items-center gap-6 text-center w-full px-6">
          {NAV_ITEMS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); nav(id); }}
              style={{
                fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '28px',
                color: '#0f1828',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="w-12 h-px my-4" style={{ backgroundColor: '#d0dcf0' }} />

        {/* Resume */}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#1a5fd4',
            textDecoration: 'none',
          }}
        >
          Download Resume ↗
        </a>

        {/* Social icons */}
        <div className="flex items-center gap-6 mt-4" style={{ color: '#6080b0' }}>
          <a href="https://github.com/RishitModi" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'inherit' }}>
            <IconGitHub />
          </a>
          <a href="https://linkedin.com/in/rishitmodii" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'inherit' }}>
            <IconLinkedIn />
          </a>
          <a href="mailto:modirishit6@gmail.com" aria-label="Email" style={{ color: 'inherit' }}>
            <IconMail />
          </a>
        </div>
      </div>

      <style>{`
        .sidebar-blink {
          animation: sidebar-blink-kf 1s step-end infinite;
        }
        @keyframes sidebar-blink-kf {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </header>
  );
}
