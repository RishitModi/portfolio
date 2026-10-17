import type { Certification } from '../../data/certifications';
import { PdfPreview } from './pdf-preview';

interface CertificateCardProps {
  certificate: Certification;
  pdfUrl?: string;
  onView: () => void;
  style?: React.CSSProperties;
  className?: string;
}

function formatMonthYear(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      const year = d.getFullYear();
      return `${month} ${year}`;
    }
  } catch {
    // fallback
  }
  return dateStr.toUpperCase();
}

export function CertificateCard({
  certificate,
  pdfUrl,
  onView,
  style,
  className = '',
}: CertificateCardProps) {
  const formattedDate = formatMonthYear(certificate.date);
  const hasPdf = Boolean(pdfUrl);

  return (
    <li
      className={`cert-card flex flex-col rounded-lg overflow-hidden transition-all duration-300 ${className}`}
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--line)',
        boxShadow: '0 1px 2px rgb(var(--shadow) / 0.04)',
        ...style,
      }}
    >
      {/* 1. PDF Preview at top */}
      <div className="p-3 sm:p-4 pb-0">
        <PdfPreview
          pdfUrl={pdfUrl}
          title={certificate.title}
          onClick={hasPdf ? onView : undefined}
        />
      </div>

      {/* 2. Metadata details */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          {/* Date */}
          <div
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--muted)',
            }}
          >
            {formattedDate}
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: 1.35,
              color: 'var(--ink)',
            }}
          >
            {certificate.title}
          </h3>

          {/* Issuer */}
          <div
            style={{
              fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent)',
            }}
          >
            {certificate.issuer}
          </div>

          {/* Credential ID (only when available) */}
          {certificate.credentialId && (
            <div
              className="mt-1 font-mono truncate"
              style={{
                fontSize: '11px',
                color: 'var(--muted)',
              }}
              title={`Credential ID: ${certificate.credentialId}`}
            >
              ID: {certificate.credentialId}
            </div>
          )}
        </div>

        {/* 3. Actions: View & Download (hidden when PDF is missing) */}
        {hasPdf && (
          <div
            className="pt-3 border-t flex items-center justify-between gap-3 text-xs"
            style={{ borderColor: 'var(--line)' }}
          >
            <button
              type="button"
              onClick={onView}
              aria-label={`View certificate: ${certificate.title}`}
              className="inline-flex items-center gap-1 font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              style={{
                fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
              }}
            >
              <span>View</span>
              <span style={{ color: 'var(--accent)' }}>↗</span>
            </button>

            <a
              href={pdfUrl}
              download={`${certificate.title}.pdf`}
              aria-label={`Download certificate: ${certificate.title}`}
              className="inline-flex items-center gap-1 font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              style={{
                fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
                textDecoration: 'none',
              }}
            >
              <span>Download</span>
              <span style={{ color: 'var(--accent)' }}>↓</span>
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .cert-card {
            transition: transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease, opacity 500ms ease;
          }
          .cert-card:hover {
            transform: translateY(-4px);
            border-color: var(--accent) !important;
            box-shadow: 0 12px 28px -4px rgb(var(--shadow) / 0.12) !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .cert-card {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </li>
  );
}
