import { useRef, useState, useEffect } from 'react';
import { CustomCursor } from './components/custom-cursor';
import { GrainOverlay } from './components/grain-overlay';
import { DesktopSidebar, MobileTopBar } from './components/sidebar';
import { RightRail } from './components/right-rail';
import { Hero } from './components/hero';
import { About } from './components/about';
import { Skills } from './components/skills';
import { Projects } from './components/projects';
import { Competitive } from './components/competitive';
import { Contact } from './components/contact';
import { Footer } from './components/footer';
import { PanelToggle } from './components/panel-toggle';
import { useLayoutPrefs } from '../hooks/useLayoutPrefs';

export default function App() {
  const { leftOpen, rightOpen, toggleLeft, toggleRight } = useLayoutPrefs();
  const leftToggleRef = useRef<HTMLButtonElement>(null);
  const rightToggleRef = useRef<HTMLButtonElement>(null);

  const [isXl, setIsXl] = useState(false);

  useEffect(() => {
    const xlQuery = window.matchMedia('(min-width: 1280px)');
    setIsXl(xlQuery.matches);
    const onXlChange = (e: MediaQueryListEvent) => setIsXl(e.matches);
    xlQuery.addEventListener('change', onXlChange);
    return () => xlQuery.removeEventListener('change', onXlChange);
  }, []);

  const handleToggleLeft = () => {
    if (leftOpen) {
      const panel = document.getElementById('sidebar-panel');
      if (panel && panel.contains(document.activeElement)) {
        leftToggleRef.current?.focus();
      }
    }
    toggleLeft();
  };

  const handleToggleRight = () => {
    if (rightOpen) {
      const panel = document.getElementById('rail-panel');
      if (panel && panel.contains(document.activeElement)) {
        rightToggleRef.current?.focus();
      }
    }
    toggleRight();
  };

  const isRailCollapsed = isXl && !rightOpen;

  return (
    <div className="bg-canvas text-body">
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
       * ─ lg+       : [var(--left) sidebar] [fluid main]
       * ─ xl+       : [var(--left) sidebar] [fluid main] [var(--right) rail], centered
       */}
      <div
        className={[
          'w-full mx-auto max-w-[1400px]',
          'lg:grid lg:grid-cols-[var(--left)_minmax(0,1fr)]',
          'xl:grid-cols-[var(--left)_minmax(0,1fr)_var(--right)]',
        ].join(' ')}
        style={{
          ['--left' as string]: leftOpen ? '220px' : '0px',
          ['--right' as string]: rightOpen ? '272px' : '0px',
          transition: 'grid-template-columns 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ── Left sidebar (lg+) ── */}
        <div
          id="sidebar-panel"
          className="hidden lg:block sticky top-0 self-start h-dvh min-w-0 overflow-hidden"
          aria-hidden={!leftOpen}
          {...(!leftOpen ? { inert: '' } : {})}
          style={{
            visibility: leftOpen ? 'visible' : 'hidden',
            transition: leftOpen ? 'visibility 0s 0s' : 'visibility 0s 300ms',
          }}
        >
          <div className="w-[220px] h-full">
            <DesktopSidebar />
          </div>
        </div>

        {/*
         * ── Middle column: main content feed ──
         * min-w-0 prevents grid blowout from wide children.
         */}
        <main className="min-w-0 overflow-x-clip pt-[72px] lg:pt-0">
          {/* Feed column left+right borders at xl */}
          <div
            className="xl:border-l xl:border-r relative"
            style={{ borderColor: 'var(--line)' }}
          >
            {/* Zero-height sticky row for panel toggles */}
            <div className="sticky top-3 z-40 h-0 pointer-events-none">
              <PanelToggle
                ref={leftToggleRef}
                side="left"
                open={leftOpen}
                onClick={handleToggleLeft}
                controls="sidebar-panel"
                className="hidden lg:flex pointer-events-auto absolute left-3 top-0"
              />
              <PanelToggle
                ref={rightToggleRef}
                side="right"
                open={rightOpen}
                onClick={handleToggleRight}
                controls="rail-panel"
                className="hidden xl:flex pointer-events-auto absolute right-3 top-0"
              />
            </div>

            {/* Main content feed: constrained to 960px when a side panel is collapsed */}
            <div className={!leftOpen || (isXl && !rightOpen) ? 'max-w-[960px] mx-auto w-full' : ''}>
              <Hero />
              <About />
              <Competitive />
              <Skills />
              <Projects />
              <Contact />
              <Footer />
            </div>
          </div>
        </main>

        {/* ── Right rail ──
            xl+: sticky aside inside grid
            <xl: normal stacked block below main */}
        <div
          id="rail-panel"
          className={[
            'min-w-0',
            'xl:sticky xl:top-0 xl:self-start xl:h-dvh',
            isRailCollapsed
              ? 'xl:overflow-hidden xl:min-w-0'
              : 'overflow-hidden xl:overflow-y-auto',
          ].join(' ')}
          aria-hidden={isRailCollapsed ? 'true' : undefined}
          {...(isRailCollapsed ? { inert: '' } : {})}
          style={{
            visibility: !isRailCollapsed ? 'visible' : 'hidden',
            transition: !isRailCollapsed ? 'visibility 0s 0s' : 'visibility 0s 300ms',
          }}
        >
          <div className="w-[272px] max-xl:w-full">
            <RightRail />
          </div>
        </div>
      </div>
    </div>
  );
}