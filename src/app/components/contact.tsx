import { LINKS, PROFILE } from '../../lib/content';

export function Contact() {
  const contactLinks = [
    { icon: '✉', label: PROFILE.email, href: LINKS.email },
    { icon: '↗', label: LINKS.github.replace('https://', ''), href: LINKS.github },
    { icon: '↗', label: LINKS.linkedin.replace('https://', ''), href: LINKS.linkedin },
    { icon: '↓', label: 'Resume', href: LINKS.resume },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-12 md:py-14 px-6 md:px-8"
      style={{
        backgroundColor: 'var(--canvas)',
      }}
    >
      {/* Decorative { } — sized to 220px and hidden below xl */}
      <div
        className="hidden xl:flex absolute inset-0 items-center justify-end pr-8 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
        style={{
          fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
          fontWeight: 800,
          fontSize: '220px',
          color: 'var(--line)',
          opacity: 0.25,
        }}
      >
        {'{ }'}
      </div>

      <div className="relative z-10 text-left">
        <div className="mb-6">
          <h2
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(34px, 6vw, 52px)',
              lineHeight: 1.05,
              letterSpacing: '-1.5px',
            }}
          >
            <span className="block" style={{ color: 'var(--ink)' }}>
              Let's
            </span>
            <span
              className="block"
              style={{
                WebkitTextStroke: '1.5px var(--accent)',
                color: 'transparent',
              }}
            >
              work
            </span>
            <span className="block" style={{ color: 'var(--ink)' }}>
              together.
            </span>
          </h2>
        </div>

        <p
          className="max-w-[68ch]"
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '14px',
            color: 'var(--body)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          Open to internships, research collabs, and interesting problems.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-link transition-all duration-200 flex items-center gap-2 w-full text-left"
              style={{
                fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '8px 16px',
                border: '1px solid var(--line)',
                borderRadius: '4px',
                color: 'var(--body)',
                backgroundColor: 'var(--card)',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: 'var(--accent)', flexShrink: 0 }}>{link.icon}</span>
              <span className="truncate">{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .contact-link:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
      `}</style>
    </section>
  );
}
