import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from './section-label';
import { CERTIFICATIONS, getCertificatePdfUrl } from '../../data/certifications';
import { CertificateCard } from './certificate-card';
import { CertificateLightbox } from './certificate-lightbox';

export function CertificationsSection() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeCert = selectedCertIndex !== null ? CERTIFICATIONS[selectedCertIndex] : null;
  const activePdfUrl = activeCert ? getCertificatePdfUrl(activeCert.file) : undefined;

  const handlePrev = () => {
    setSelectedCertIndex((prev) =>
      prev === null ? null : (prev - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length
    );
  };

  const handleNext = () => {
    setSelectedCertIndex((prev) =>
      prev === null ? null : (prev + 1) % CERTIFICATIONS.length
    );
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-12 md:py-16 section-pad flex flex-col gap-6"
      style={{
        backgroundColor: 'var(--canvas)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      {/* ── Section Header ── */}
      <div>
        <SectionLabel>[ 06 — CERTIFICATIONS ]</SectionLabel>

        <h2
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(22px, 2.5vw, 30px)',
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
            color: 'var(--ink)',
          }}
        >
          CERTIFICATIONS
        </h2>

        <p
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '14px',
            color: 'var(--muted)',
            marginTop: '8px',
            marginBottom: '28px',
          }}
        >
          {CERTIFICATIONS.length} verified credentials
        </p>
      </div>

      {/* ── Responsive Grid ── */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-0 m-0 list-none">
        {CERTIFICATIONS.map((cert, index) => {
          const pdfUrl = getCertificatePdfUrl(cert.file);
          return (
            <CertificateCard
              key={cert.title}
              certificate={cert}
              pdfUrl={pdfUrl}
              onView={() => setSelectedCertIndex(index)}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${index * 80}ms`,
              }}
            />
          );
        })}
      </ul>

      {/* ── Lightbox Modal ── */}
      <CertificateLightbox
        isOpen={selectedCertIndex !== null}
        certificate={activeCert}
        pdfUrl={activePdfUrl}
        currentIndex={selectedCertIndex ?? 0}
        totalCount={CERTIFICATIONS.length}
        onClose={() => setSelectedCertIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
