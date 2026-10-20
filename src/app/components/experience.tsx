import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from './section-label';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { scrollToId } from '../../lib/scroll';
import {
  EXPERIENCE_PROFESSIONAL,
  type ExperienceEntry,
} from '../../lib/content';

function ExperienceGallery({
  images,
}: {
  images: NonNullable<ExperienceEntry['images']>;
}) {
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleImageError = (src: string) => {
    setFailedSrcs((prev) => {
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  const validImages = images.filter((img) => !failedSrcs.has(img.src));

  const openLightbox = (index: number) => {
    setActiveIdx(index);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    dialogRef.current?.close();
    document.documentElement.style.overflow = '';
    const lastIdx = activeIdx;
    setActiveIdx(null);
    if (lastIdx !== null && triggerRefs.current[lastIdx]) {
      triggerRefs.current[lastIdx]?.focus();
    }
  };

  const showPrev = () => {
    if (activeIdx === null || validImages.length === 0) return;
    setActiveIdx((prev) => ((prev ?? 0) - 1 + validImages.length) % validImages.length);
  };

  const showNext = () => {
    if (activeIdx === null || validImages.length === 0) return;
    setActiveIdx((prev) => ((prev ?? 0) + 1) % validImages.length);
  };

  // Keyboard navigation for ArrowLeft / ArrowRight
  useEffect(() => {
    if (activeIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIdx, validImages.length]);

  // Clean up body scroll lock if unmounted while open
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (validImages.length === 0) {
    return null;
  }

  const currentImg = activeIdx !== null ? validImages[activeIdx] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
        {validImages.map((img, idx) => (
          <div key={img.src} className="flex flex-col">
            <button
              ref={(el) => {
                triggerRefs.current[idx] = el;
              }}
              type="button"
              onClick={() => openLightbox(idx)}
              className="group/gallery relative block w-full text-left cursor-pointer rounded-lg"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <div
                className="gallery-box relative aspect-[16/10] w-full overflow-hidden rounded-lg transition-colors duration-200"
                style={{
                  border: '1px solid var(--line)',
                  backgroundColor: 'var(--chip)',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  onError={() => handleImageError(img.src)}
                  className="gallery-img w-full h-full object-cover transition-transform duration-200"
                />

                <span
                  className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[11px] font-medium pointer-events-none"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--card) 85%, transparent)',
                    color: 'var(--muted)',
                    border: '1px solid var(--line)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                  }}
                >
                  ⤢ View larger
                </span>
              </div>
            </button>

            {img.caption && (
              <span
                className="mt-1.5 text-[12px] block"
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                }}
              >
                {img.caption}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox dialog */}
      <dialog
        ref={dialogRef}
        className="lightbox-dialog"
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeLightbox();
          }
        }}
        onCancel={(e) => {
          e.preventDefault();
          closeLightbox();
        }}
      >
        {currentImg && (
          <div className="relative flex flex-col items-center">
            {/* Top row with counter & close button */}
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-line/60">
              <span
                className="text-[12px] text-muted font-medium"
                style={{ fontFamily: 'Inter Variable, Inter, system-ui, sans-serif' }}
              >
                {validImages.length > 1
                  ? `${(activeIdx ?? 0) + 1} / ${validImages.length}`
                  : ''}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close image"
                className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 transition-opacity ml-auto"
                style={{
                  backgroundColor: 'var(--chip)',
                  color: 'var(--ink)',
                  border: '1px solid var(--line)',
                  fontSize: '15px',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Image viewer with Prev / Next buttons */}
            <div className="relative flex items-center justify-center w-full min-h-[160px]">
              {validImages.length > 1 && (
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous image"
                  className="absolute left-2 z-10 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--card) 85%, transparent)',
                    color: 'var(--ink)',
                    border: '1px solid var(--line)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    fontSize: '18px',
                    lineHeight: 1,
                  }}
                >
                  ‹
                </button>
              )}

              <img
                src={currentImg.src}
                alt={currentImg.alt}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              />

              {validImages.length > 1 && (
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="absolute right-2 z-10 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--card) 85%, transparent)',
                    color: 'var(--ink)',
                    border: '1px solid var(--line)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    fontSize: '18px',
                    lineHeight: 1,
                  }}
                >
                  ›
                </button>
              )}
            </div>

            {/* Visible caption (caption || alt) */}
            <div className="w-full text-center pt-2.5 mt-1">
              <p
                className="text-[13px] text-body"
                style={{ fontFamily: 'Inter Variable, Inter, system-ui, sans-serif' }}
              >
                {currentImg.caption || currentImg.alt}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function ExperienceCard({
  entry,
  isAnimated,
  staggerIndex,
  prefersReducedMotion,
}: {
  entry: ExperienceEntry;
  isAnimated: boolean;
  staggerIndex: number;
  prefersReducedMotion: boolean;
}) {
  const cardStyle = {
    opacity: prefersReducedMotion || isAnimated ? 1 : 0,
    transform:
      prefersReducedMotion || isAnimated ? 'translateY(0)' : 'translateY(16px)',
    transition: prefersReducedMotion
      ? 'none'
      : `opacity 500ms ease-out ${staggerIndex * 100}ms, transform 500ms ease-out ${staggerIndex * 100}ms`,
  };

  return (
    <div
      style={cardStyle}
      className="w-full bg-card border border-line rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 motion-safe:hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--accent)_50%,transparent)] shadow-sm"
    >
      <div>
        {/* Header row: role · org [type] on left, period on right */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 mb-2">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span
              style={{
                fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                color: 'var(--ink)',
              }}
            >
              {entry.role}
            </span>
            <span className="text-muted font-medium">·</span>
            {entry.link ? (
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-accent font-semibold hover:underline"
              >
                {entry.org}
              </a>
            ) : (
              <span className="text-[14px] text-body font-medium">{entry.org}</span>
            )}
            {entry.type && (
              <span
                className="text-[12px] font-medium rounded px-2 py-0.5 ml-1"
                style={{
                  backgroundColor: 'var(--accent-soft)',
                  color: 'var(--accent)',
                }}
              >
                {entry.type}
              </span>
            )}
          </div>
          {entry.period && (
            <span className="text-[12px] text-muted whitespace-nowrap">
              {entry.period}
            </span>
          )}
        </div>

        {/* Bullet points */}
        {entry.points && entry.points.length > 0 && (
          <ul className="flex flex-col gap-1.5 my-2.5">
            {entry.points.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[14px] text-body leading-[1.7]"
              >
                <span
                  className="text-accent text-[10px] leading-relaxed flex-shrink-0 mt-1"
                  aria-hidden="true"
                >
                  ◆
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Image gallery */}
        {entry.images && entry.images.length > 0 && (
          <ExperienceGallery images={entry.images} />
        )}
      </div>

      {/* Tags chips */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-line/60">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-[12px] text-body bg-chip border border-line px-2.5 py-1 rounded-[4px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function Experience() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
  }, []);

  const isAnimated = prefersReducedMotion || isVisible;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-12 md:py-14 section-pad"
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div>
        <SectionLabel>[ 03 — EXPERIENCE ]</SectionLabel>

        <h2
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(26px, 4vw, 38px)',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            color: 'var(--ink)',
          }}
        >
          Where I've worked.
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
          Professional experience.
        </p>

        {EXPERIENCE_PROFESSIONAL.length === 0 ? (
          <div className="border border-dashed border-line rounded-2xl p-5 bg-card/60">
            <p className="text-[14px] text-body">
              No full-time roles yet — I'm open to internships and research collaborations.
            </p>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="text-accent hover:underline font-semibold text-[13px] inline-flex items-center gap-1 mt-2.5 cursor-pointer"
            >
              Get in touch →
            </button>
          </div>
        ) : (
          <div className="relative pl-6">
            {/* 2px left rail */}
            <div
              aria-hidden="true"
              className="absolute left-[4px] top-3.5 bottom-3.5 w-[2px] bg-line pointer-events-none"
            />

            <ul className="flex flex-col gap-3 max-w-[960px]">
              {EXPERIENCE_PROFESSIONAL.map((entry, idx) => (
                <li key={entry.id} className="relative">
                  {/* 10px node on the rail */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[24px] top-4 w-2.5 h-2.5 rounded-full bg-accent-solid"
                  />
                  <ExperienceCard
                    entry={entry}
                    isAnimated={isAnimated}
                    staggerIndex={idx}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style>{`
        .gallery-box:hover,
        .group\\/gallery:hover .gallery-box {
          border-color: color-mix(in srgb, var(--accent) 50%, transparent) !important;
        }
        @media (prefers-reduced-motion: no-preference) {
          .group\\/gallery:hover .gallery-img {
            transform: scale(1.03);
          }
        }
        dialog.lightbox-dialog {
          margin: auto;
          border: 1px solid var(--line);
          background-color: var(--card);
          border-radius: 1rem;
          padding: 0.75rem;
          color: var(--ink);
          max-width: 95vw;
          max-height: 95vh;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          outline: none;
          overflow: visible;
        }
        dialog.lightbox-dialog::backdrop {
          background-color: rgb(0 0 0 / 0.7);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        @media (prefers-reduced-motion: no-preference) {
          dialog.lightbox-dialog[open] {
            animation: lightbox-dialog-fade 180ms ease-out;
          }
        }
        @keyframes lightbox-dialog-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
