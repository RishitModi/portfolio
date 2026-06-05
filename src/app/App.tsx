import { useEffect } from 'react';
import { CustomCursor } from './components/custom-cursor';
import { GrainOverlay } from './components/grain-overlay';
import { Navigation } from './components/navigation';
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
    <div className="min-h-screen" style={{ backgroundColor: '#f4f6fa', color: '#2a3a5a' }}>
      <CustomCursor />
      <GrainOverlay />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}