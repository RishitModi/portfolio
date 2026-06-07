export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="px-6 md:px-16"
      style={{
        borderTop: '1px solid #d0dcf0',
        backgroundColor: '#e8eef8',
        fontFamily: 'JetBrains Mono',
        fontSize: '11px',
        color: '#6080b0',
        padding: '32px 0',
      }}
    >
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span style={{ color: '#0f1828', fontWeight: 600 }}>RM.</span>
          <span>© 2026</span>
          <span className="hidden md:inline" style={{ color: '#d0dcf0' }}>|</span>
          <span className="hidden md:inline">Designed & developed by Rishit Modi</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="mailto:modirishit6@gmail.com" className="footer-link">Email</a>
          <a href="https://github.com/RishitModi" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://linkedin.com/in/rishitmodii" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://drive.google.com/file/d/1vsR0iFkGEZHado6OIQFdK1XCR48UIiUg/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="footer-link">Resume</a>
        </div>

        <button 
          onClick={scrollToTop}
          className="footer-link flex items-center gap-2"
        >
          Back to top ↑
        </button>
      </div>

      <style>{`
        .footer-link {
          color: #6080b0;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #1a5fd4;
        }
      `}</style>
    </footer>
  );
}
