import { useEffect, useRef, useState } from 'react';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactLinks = [
    { icon: '✉', label: 'modirishit6@gmail.com', href: 'mailto:modirishit6@gmail.com' },
    { icon: '↗', label: 'github.com/RishitModi', href: 'https://github.com/RishitModi' },
    { icon: '↗', label: 'linkedin.com/in/rishitmodii', href: 'https://linkedin.com/in/rishitmodii' },
    { icon: '↓', label: 'Resume', href: 'https://drive.google.com/file/d/1vsR0iFkGEZHado6OIQFdK1XCR48UIiUg/view?usp=sharing' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative overflow-hidden py-12 md:py-14 px-6 md:px-8 ${isVisible ? 'visible' : ''}`}
      style={{
        backgroundColor: '#f4f6fa',
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
          color: '#d0dcf0',
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
            <span className="block" style={{ color: '#0f1828' }}>
              Let's
            </span>
            <span
              className="block"
              style={{
                WebkitTextStroke: '1.5px #1a5fd4',
                color: 'transparent',
              }}
            >
              work
            </span>
            <span className="block" style={{ color: '#0f1828' }}>
              together.
            </span>
          </h2>
        </div>

        <p
          className="max-w-[68ch]"
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '14px',
            color: '#2a3a5a',
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
                border: '1px solid #d0dcf0',
                borderRadius: '4px',
                color: '#2a3a5a',
                backgroundColor: '#ffffff',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: '#1a5fd4', flexShrink: 0 }}>{link.icon}</span>
              <span className="truncate">{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .contact-link:hover {
          border-color: #1a5fd4;
          color: #1a5fd4;
        }
      `}</style>
    </section>
  );
}
