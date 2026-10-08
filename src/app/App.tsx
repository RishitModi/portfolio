import { useEffect } from 'react';
import { CustomCursor } from './components/custom-cursor';
import { GrainOverlay } from './components/grain-overlay';
import { DesktopSidebar, MobileTopBar } from './components/sidebar';
import { RightRail } from './components/right-rail';
import { Hero } from './components/hero';
import { About } from './components/about';
import { Skills } from './components/skills';
import { Projects } from './components/projects';
import { Contact } from './components/contact';
import { Footer } from './components/footer';

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const handleReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = 'auto';
        const style = document.createElement('style');
        style.innerHTML = `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    handleReducedMotion();
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f6fa', color: '#2a3a5a' }}>
      {/* Global overlays — always on top */}
      <CustomCursor />
      <GrainOverlay />

      {/*
       * Mobile top bar (<lg): fixed header 72px tall.
       * Rendered outside the grid so it doesn't affect grid flow.
       */}
      <MobileTopBar />

      {/*
       * 3-column layout wrapper.
       *
       * ─ below lg  : single column (MobileTopBar handles nav)
       * ─ lg+       : [260px sidebar] [fluid main]
       * ─ xl+       : [260px sidebar] [max-720px main] [320px rail], centered
       *
       * max-w-[1440px] + mx-auto centres the whole thing on very wide screens.
       */}
      <div
        className={[
          'w-full mx-auto max-w-[1400px]',
          // lg: 2-col
          'lg:grid lg:grid-cols-[220px_minmax(0,1fr)]',
          // xl: 3-col, centred
          'xl:grid-cols-[220px_minmax(0,1fr)_272px]',
        ].join(' ')}
      >
        {/* ── Left sidebar (lg+) ── */}
        <DesktopSidebar />

        {/*
         * ── Middle column: main content feed ──
         * min-w-0 prevents grid blowout from wide children (e.g. the sticky
         * projects viewport). overflow-x-clip clips without creating a new
         * scroll container, so IntersectionObserver & scrollIntoView still
         * work against the window.
         * lg:pt-0 removes the mobile top-bar offset at desktop.
         */}
        <main
          className="min-w-0 overflow-x-clip pt-[72px] lg:pt-0"
          style={{
            // Feed column borders at xl+
            // We use a box-shadow trick because border would affect layout width;
            // alternatively we rely on the xl ring approach via inline style.
          }}
        >
          {/* Feed column left+right borders at xl — applied as a wrapping div
              so they don't interfere with section positioning */}
          <div
            className="xl:border-l xl:border-r min-h-screen"
            style={{ borderColor: '#d0dcf0' }}
          >
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </div>
        </main>

        {/* ── Right rail ──
            xl+: sticky aside inside grid
            <xl: normal stacked block below main (grid puts it after main in source order) */}
        <RightRail />
      </div>
    </div>
  );
}