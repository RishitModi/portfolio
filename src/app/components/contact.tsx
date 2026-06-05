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
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative flex items-center justify-center md:py-[120px] md:px-16 ${isVisible ? 'visible' : ''}`}
      style={{
        minHeight: '100vh',
        backgroundColor: '#f4f6fa',
        padding: '80px 24px',
      }}
    >
      <div
        className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none"
        style={{
          fontFamily: 'Syne',
          fontWeight: 800,
          fontSize: '400px',
          color: '#d0dcf0',
          opacity: 0.3,
          userSelect: 'none',
        }}
      >
        {'{ }'}
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-12">
          <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-2px', color: '#0f1828', lineHeight: 1 }}>
            Let's
          </div>
          <div
            style={{
              fontFamily: 'Syne',
              fontWeight: 800,
              fontSize: 'clamp(48px, 8vw, 96px)',
              letterSpacing: '-2px',
              lineHeight: 1,
              WebkitTextStroke: '2px #1a5fd4',
              color: 'transparent',
            }}
          >
            work
          </div>
          <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-2px', color: '#0f1828', lineHeight: 1 }}>
            together.
          </div>
        </div>

        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#2a3a5a', marginBottom: '48px' }}>
          Open to internships, research collabs, and interesting problems.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-link transition-all duration-200"
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '11px',
                textTransform: 'uppercase',
                padding: '14px 28px',
                border: '1px solid #d0dcf0',
                borderRadius: '2px',
                color: '#2a3a5a',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {link.icon} {link.label}
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
