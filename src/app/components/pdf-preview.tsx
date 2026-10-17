import { useEffect, useRef, useState } from 'react';
import { getCachedPreview, getPdfjs, setCachedPreview } from '../../lib/pdf-loader';

interface PdfPreviewProps {
  pdfUrl?: string;
  title: string;
  onClick?: () => void;
}

export function PdfPreview({ pdfUrl, title, onClick }: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(pdfUrl));
  const [hasError, setHasError] = useState(false);
  const [cachedUrl, setCachedUrl] = useState<string | null>(null);

  // Check cache immediately if available
  useEffect(() => {
    if (pdfUrl) {
      const cached = getCachedPreview(pdfUrl);
      if (cached) {
        setCachedUrl(cached);
        setIsLoading(false);
      }
    }
  }, [pdfUrl]);

  // Lazy loading via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !pdfUrl || cachedUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [pdfUrl, cachedUrl]);

  // Render first page with pdfjs-dist once in view
  useEffect(() => {
    if (!isInView || !pdfUrl || cachedUrl || hasError) return;

    let isCancelled = false;
    let renderTask: any = null;

    async function renderPage() {
      try {
        setIsLoading(true);
        const pdfjs = await getPdfjs();
        if (isCancelled) return;

        const loadingTask = pdfjs.getDocument({
          url: pdfUrl,
        });

        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        const page = await pdf.getPage(1);
        if (isCancelled) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const displayWidth = container.clientWidth || 360;
        const dpr = window.devicePixelRatio || 1;
        // Render at ~2x display width for high sharpness
        const targetWidth = displayWidth * Math.max(dpr, 2);

        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = targetWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) throw new Error('Could not get canvas 2d context');

        renderTask = page.render({
          canvas,
          canvasContext: ctx,
          viewport,
        });

        await renderTask.promise;
        if (isCancelled) return;

        try {
          const dataUrl = canvas.toDataURL('image/webp', 0.92);
          if (pdfUrl) {
            setCachedPreview(pdfUrl, dataUrl);
          }
          setCachedUrl(dataUrl);
        } catch {
          // If canvas toDataURL throws, the canvas still rendered correctly
        }

        setIsLoading(false);
      } catch (err: any) {
        if (!isCancelled && err?.name !== 'RenderingCancelledException') {
          console.error(`Failed to render PDF preview for "${title}":`, err);
          setHasError(true);
          setIsLoading(false);
        }
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTask && typeof renderTask.cancel === 'function') {
        try {
          renderTask.cancel();
        } catch {
          // Ignore cancellation errors
        }
      }
    };
  }, [isInView, pdfUrl, cachedUrl, title, hasError]);

  // Missing PDF placeholder
  if (!pdfUrl) {
    return (
      <div
        ref={containerRef}
        className="w-full aspect-[4/3] rounded flex flex-col items-center justify-center p-4 text-center select-none"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px dashed var(--line)',
          color: 'var(--muted)',
        }}
        role="region"
        aria-label={`Missing certificate preview for ${title}`}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-2 opacity-60"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
        <p
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          Certificate PDF coming soon
        </p>
      </div>
    );
  }

  // Render error fallback
  if (hasError) {
    return (
      <div
        ref={containerRef}
        className="w-full aspect-[4/3] rounded flex flex-col items-center justify-center p-4 text-center select-none"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--line)',
          color: 'var(--body)',
        }}
      >
        <p
          className="mb-3"
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            fontSize: '13px',
            color: 'var(--muted)',
          }}
        >
          Preview unavailable
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-semibold"
          style={{
            fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--line)',
            color: 'var(--accent)',
            textDecoration: 'none',
          }}
        >
          View ↗
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative w-full aspect-[4/3] rounded overflow-hidden flex items-center justify-center ${
        onClick ? 'cursor-pointer group' : ''
      }`}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--line)',
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label={onClick ? `View certificate: ${title}` : undefined}
    >
      {/* Loading Skeleton Shimmer */}
      {isLoading && !cachedUrl && (
        <div
          className="absolute inset-0 z-10 animate-pulse flex items-center justify-center"
          style={{
            backgroundColor: 'var(--surface)',
          }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full skeleton-shimmer"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--line) 50%, transparent) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.8s infinite',
            }}
          />
        </div>
      )}

      {/* Cached image or rendered canvas */}
      {cachedUrl ? (
        <img
          src={cachedUrl}
          alt={`Preview of ${title} certificate`}
          className="w-full h-full object-contain preview-zoom"
          loading="lazy"
        />
      ) : (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Preview of ${title} certificate`}
          className={`w-full h-full object-contain preview-zoom ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .preview-zoom {
          transition: transform 300ms ease;
        }
        .cert-card:hover .preview-zoom {
          transform: scale(1.02);
        }
        @media (prefers-reduced-motion: reduce) {
          .preview-zoom,
          .cert-card:hover .preview-zoom {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
