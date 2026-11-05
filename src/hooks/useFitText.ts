import { useLayoutEffect, useRef } from 'react';

interface FitTextOptions {
  min?: number;
  max?: number | (() => number);
}

export function useFitText(options: FitTextOptions = {}) {
  const { min = 40, max = 240 } = options;
  const containerRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text || typeof window === 'undefined') {
      return;
    }

    let frameId: number | null = null;
    let lastMeasuredWidth = 0;
    let forcePending = false;
    let isMounted = true;

    const measure = (force = false) => {
      frameId = null;

      const currentContainer = containerRef.current;
      const currentText = textRef.current;
      if (!currentContainer || !currentText) {
        return;
      }

      const containerWidth = currentContainer.clientWidth;
      if (!force && containerWidth === lastMeasuredWidth) {
        return;
      }

      currentContainer.style.fontSize = '100px';
      const textWidth = currentText.getBoundingClientRect().width;

      if (textWidth === 0 || containerWidth === 0) {
        return;
      }

      const resolvedMax = typeof max === 'function' ? max() : max;
      const fontSize = Math.min(
        Math.max(min, resolvedMax),
        Math.max(min, (100 * containerWidth) / textWidth),
      );
      currentContainer.style.fontSize = `${fontSize}px`;
      lastMeasuredWidth = containerWidth;
    };

    const queueMeasure = (force = false) => {
      if (!isMounted) {
        return;
      }

      forcePending = forcePending || force;
      if (frameId === null) {
        frameId = window.requestAnimationFrame(() => {
          const shouldForce = forcePending;
          forcePending = false;
          measure(shouldForce);
        });
      }
    };

    const scheduleMeasure = () => queueMeasure();
    const scheduleViewportMeasure = () => queueMeasure(true);
    const scheduleFontMeasure = () => queueMeasure(true);
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(container);
    if (container.parentElement) {
      resizeObserver.observe(container.parentElement);
    }
    window.addEventListener('resize', scheduleViewportMeasure);

    const fonts = document.fonts;
    fonts.addEventListener('loadingdone', scheduleFontMeasure);
    void fonts.ready.then(scheduleFontMeasure);
    scheduleMeasure();

    return () => {
      isMounted = false;
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleViewportMeasure);
      fonts.removeEventListener('loadingdone', scheduleFontMeasure);
    };
  }, [max, min]);

  return { containerRef, textRef };
}
