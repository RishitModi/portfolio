import { useEffect, useRef } from 'react';
import type { Certification } from '../../data/certifications';

interface CertificateLightboxProps {
  isOpen: boolean;
  certificate: Certification | null;
  pdfUrl?: string;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function CertificateLightbox({
  isOpen,
  certificate,
  pdfUrl,
  currentIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
}: CertificateLightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Lock body scroll and handle focus restore
  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus close button initially
      requestAnimationFrame(() => {
        const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>('[data-lightbox-close]');
        closeBtn?.focus();
      });

      return () => {
        document.body.style.overflow = originalOverflow;
        prevFocusRef.current?.focus();
      };
    }
  }, [isOpen]);

  // Keyboard navigation: Esc to close, Arrow keys to navigate, Tab to trap focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !certificate) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div
        ref={modalRef}
        className="relative flex flex-col rounded-lg overflow-hidden shadow-2xl"
        style={{
          width: '90vw',
          height: '85vh',
          maxWidth: '1200px',
          maxHeight: '900px',
          backgroundColor: 'var(--canvas)',
          border: '1px solid var(--line)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b shrink-0 gap-3"
          style={{
            borderColor: 'var(--line)',
            backgroundColor: 'var(--card)',
          }}
        >
          <div className="flex flex-col min-w-0">
            <h2
              id="lightbox-title"
              className="text-sm sm:text-base font-bold truncate text-[var(--ink)]"
              style={{ fontFamily: 'Inter Variable, Inter, system-ui, sans-serif' }}
            >
              {certificate.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <span className="text-[var(--accent)] font-semibold uppercase tracking-wider">
                {certificate.issuer}
              </span>
              <span>•</span>
              <span>
                {currentIndex + 1} of {totalCount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Prev button */}
            <button
              onClick={onPrev}
              aria-label="Previous certificate"
              title="Previous certificate (ArrowLeft)"
              className="p-1.5 rounded transition-colors hover:text-[var(--accent)] text-[var(--body)] hover:bg-[var(--surface)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={onNext}
              aria-label="Next certificate"
              title="Next certificate (ArrowRight)"
              className="p-1.5 rounded transition-colors hover:text-[var(--accent)] text-[var(--body)] hover:bg-[var(--surface)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="w-px h-5 mx-1" style={{ backgroundColor: 'var(--line)' }} />

            {/* Close button */}
            <button
              data-lightbox-close
              onClick={onClose}
              aria-label="Close certificate preview"
              title="Close preview (Esc)"
              className="p-1.5 rounded transition-colors hover:text-[var(--accent)] text-[var(--body)] hover:bg-[var(--surface)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal PDF Viewer Body */}
        <div className="flex-1 w-full min-h-0 bg-neutral-900/40 relative">
          {pdfUrl ? (
            <iframe
              src={`${pdfUrl}#toolbar=1&view=FitH`}
              title={`PDF viewer: ${certificate.title}`}
              className="w-full h-full border-0 block"
              style={{ backgroundColor: 'transparent' }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[var(--muted)]">
              <p className="text-base font-semibold mb-2">Certificate PDF coming soon</p>
              <p className="text-sm">The document file will be available shortly.</p>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar / Fallback */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-t text-xs shrink-0"
          style={{
            borderColor: 'var(--line)',
            backgroundColor: 'var(--card)',
          }}
        >
          <div>
            {pdfUrl ? (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors text-[var(--muted)] hover:text-[var(--accent)]"
              >
                Can't preview? Open in new tab ↗
              </a>
            ) : (
              <span className="text-[var(--muted)]">Preview unavailable</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {pdfUrl && (
              <a
                href={pdfUrl}
                download={`${certificate.title}.pdf`}
                className="font-medium text-[var(--accent)] hover:underline"
              >
                Download PDF ↓
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
