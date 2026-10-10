import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from './section-label';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { PROJECTS, type ProjectItem } from '../../lib/content';

function ProjectVideo({ videoSrc, title }: { videoSrc: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      video.controls = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Ignore autoplay failure
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${title} demo`}
      className="w-full h-full object-contain"
      style={{ display: 'block' }}
    />
  );
}

function ProjectIframe({ iframeSrc, title }: { iframeSrc: string; title: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoaded ? (
        <>
          <iframe
            src={iframeSrc}
            title={`${title} documentation`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
          <a
            href={iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded bg-card/95 backdrop-blur-sm border border-line text-accent hover:bg-card shadow-sm transition-colors"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Open in new tab ↗
          </a>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 p-4 text-center">
          <p
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '13px',
              color: 'var(--muted)',
              fontWeight: 500,
            }}
          >
            Live documentation preview
          </p>
          <button
            onClick={() => setIsLoaded(true)}
            className="transition-opacity hover:opacity-90"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              backgroundColor: 'var(--accent-solid)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Load preview
          </button>
          <a
            href={iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '12px',
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Open in new tab ↗
          </a>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
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

  const hasMedia = Boolean(project.videoSrc || project.iframeSrc || project.imageSrc);
  const shouldBeVisible = prefersReducedMotion || isVisible;

  return (
    <div
      ref={ref}
      className={`project-card rounded-2xl overflow-hidden w-full ${shouldBeVisible ? 'is-visible' : ''}`}
      style={{
        opacity: shouldBeVisible ? 1 : 0,
        transform: shouldBeVisible ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      {/* ── 16:9 Media container (rendered only if media exists) ── */}
      {hasMedia && (
        <div
          className="relative aspect-video w-full overflow-hidden"
          style={{
            backgroundColor: 'var(--chip)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          {project.videoSrc ? (
            <ProjectVideo videoSrc={project.videoSrc} title={project.title} />
          ) : project.iframeSrc ? (
            <ProjectIframe iframeSrc={project.iframeSrc} title={project.title} />
          ) : project.imageSrc ? (
            <img
              src={project.imageSrc}
              alt={`${project.title} preview`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
              style={{ display: 'block' }}
            />
          ) : null}
        </div>
      )}

      {/* ── Card Body ── */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-3">
        {/* Meta line */}
        <div
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent)',
          }}
        >
          {project.index} · {project.category}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
            color: 'var(--ink)',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'var(--body)',
          }}
        >
          {project.description}
        </p>

        {/* Metric */}
        <div
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--body)',
          }}
        >
          <span style={{ color: 'var(--accent)', marginRight: '6px' }}>◆</span>
          {project.metric}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                fontSize: '12px',
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid var(--line)',
                backgroundColor: 'var(--chip)',
                color: 'var(--body)',
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links row */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex flex-wrap items-center gap-3 mt-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded transition-colors hover:border-accent"
                style={{
                  fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--line)',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76 0-1.5-.5-2.7-1.3-3.7.1-.3.6-1.7-.1-3.6 0 0-1-.3-3.3 1.3-1-.3-2.1-.4-3.2-.4s-2.2.1-3.2.4c-2.3-1.6-3.3-1.3-3.3-1.3-.7 1.9-.2 3.3-.1 3.6-1 .9-1.5 2.1-1.5 3.7 0 5.2 3 6.4 6 6.7-.8.7-1 1.9-1 3.2v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                Source Code
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded transition-opacity hover:opacity-90"
                style={{
                  fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--accent-solid)',
                  color: '#ffffff',
                  textDecoration: 'none',
                }}
              >
                <span
                  className="live-dot"
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--good)',
                    display: 'inline-block',
                  }}
                />
                View Live ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="py-12 md:py-14 px-6 md:px-8"
      style={{
        backgroundColor: 'var(--canvas)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      {/* ── Section Header ── */}
      <div>
        <SectionLabel>[ 06 — PROJECTS ]</SectionLabel>

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
          Things I've shipped.
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
          {PROJECTS.length} projects
        </p>
      </div>

      {/* ── Projects List ── */}
      <div className="flex flex-col gap-6 w-full">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.index} project={project} />
        ))}
      </div>

      <style>{`
        .project-card {
          background-color: var(--card);
          border: 1px solid var(--line);
          box-shadow: 0 1px 2px rgb(var(--shadow) / 0.04);
          transition: opacity 500ms ease-out, transform 500ms ease-out;
        }

        @media (prefers-reduced-motion: no-preference) {
          .project-card.is-visible {
            transition: opacity 500ms ease-out, transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease;
          }
          .project-card.is-visible:hover {
            border-color: color-mix(in srgb, var(--accent) 50%, transparent) !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 12px 28px -4px rgb(var(--shadow) / 0.08) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-card {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }

        .live-dot {
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 color-mix(in srgb, var(--good) 40%, transparent); }
          50% { opacity: 0.7; box-shadow: 0 0 0 4px transparent; }
        }
      `}</style>
    </section>
  );
}
