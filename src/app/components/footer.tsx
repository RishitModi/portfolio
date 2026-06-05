export function Footer() {
  return (
    <footer
      className="px-6 md:px-16"
      style={{
        minHeight: '48px',
        borderTop: '1px solid #d0dcf0',
        backgroundColor: '#e8eef8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'JetBrains Mono',
        fontSize: '11px',
        color: '#a0b4cc',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '12px 24px',
      }}
    >
      <div>RM. · 2026</div>

      <div className="flex gap-2">
        <span style={{ color: '#1a5fd4' }}>·</span>
        <span style={{ color: '#1a5fd4' }}>·</span>
        <span style={{ color: '#1a5fd4' }}>·</span>
      </div>

      <div>Designed & developed by Rishit Modi</div>
    </footer>
  );
}
