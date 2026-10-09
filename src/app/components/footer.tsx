import { LINKS, PROFILE } from '../../lib/content';
import { scrollToTop } from '../../lib/scroll';

export function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-16"
      style={{
        borderTop: '1px solid var(--line)',
        backgroundColor: 'var(--surface)',
        fontFamily: 'Inter',
        fontSize: '11px',
        color: 'var(--muted)',
      }}
    >
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>RM.</span>
          <span>© {PROFILE.year}</span>
          <span className="hidden md:inline" style={{ color: 'var(--line)' }}>|</span>
          <span className="hidden md:inline">Designed & developed by {PROFILE.name}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href={LINKS.email} className="footer-link">Email</a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="footer-link">Resume</a>
        </div>

        <button 
          onClick={scrollToTop}
          className="footer-link flex items-center gap-2"
        >
          Back to top ↑
        </button>
      </div>

      <style>{`
        .footer-link {
          color: var(--muted);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: var(--accent);
        }
      `}</style>
    </footer>
  );
}
