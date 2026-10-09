interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div
      className={className}
      style={{
        fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
        fontWeight: 700,
        fontSize: '12px',
        color: 'var(--accent)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}
    >
      {children}
    </div>
  );
}
