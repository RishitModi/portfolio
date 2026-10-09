import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pointerMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHasFinePointer(pointerMedia.matches);

    const onPointerMediaChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches);
    };

    pointerMedia.addEventListener('change', onPointerMediaChange);
    return () => {
      pointerMedia.removeEventListener('change', onPointerMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let hasMoved = false;
    let currentHover = false;
    let rafId: number;

    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionMedia.matches;
    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    reducedMotionMedia.addEventListener('change', onReducedMotionChange);

    const render = () => {
      if (prefersReducedMotion) {
        ringX = mouseX;
        ringY = mouseY;
      } else {
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '0.4';
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (hasMoved) {
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '0.4';
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const isTargetInteractive = Boolean(
        target &&
          typeof target.closest === 'function' &&
          target.closest('a, button, [role="button"], input, textarea, select, summary')
      );

      if (isTargetInteractive !== currentHover) {
        currentHover = isTargetInteractive;
        setIsHovering(isTargetInteractive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      reducedMotionMedia.removeEventListener('change', onReducedMotionChange);
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference opacity-0 transition-opacity duration-200"
      >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#1a5fd4' }} />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference opacity-0"
        style={{
          width: isHovering ? '48px' : '28px',
          height: isHovering ? '48px' : '28px',
          border: '1px solid #1a5fd4',
          borderRadius: '50%',
          backgroundColor: isHovering ? 'rgba(26, 95, 212, 0.15)' : 'transparent',
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
}
