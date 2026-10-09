import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationConfig {
    threshold?: number;
    delay?: number;
    duration?: number;
}

export function useScrollAnimation(config: ScrollAnimationConfig = {}) {
    const { threshold = 0.1, delay = 0, duration = 0.6 } = config;
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    if (delay > 0) {
                        timeoutRef.current = setTimeout(() => {
                            setIsVisible(true);
                        }, delay);
                    } else {
                        setIsVisible(true);
                    }
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            observer.disconnect();
        };
    }, [threshold, delay]);

    return { ref, isVisible, duration };
}

export function useStaggeredAnimation(itemCount: number, config: ScrollAnimationConfig = {}) {
    const { threshold = 0.1 } = config;
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
    const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        const clearAllTimeouts = () => {
            timeoutIdsRef.current.forEach((id) => clearTimeout(id));
            timeoutIdsRef.current = [];
        };

        if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisibleIndices(Array.from({ length: itemCount }, (_, i) => i));
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    clearAllTimeouts();
                    // Reset and restart animation when entering viewport
                    setVisibleIndices([]);

                    // Stagger animation for each item
                    for (let i = 0; i < itemCount; i++) {
                        const timerId = setTimeout(() => {
                            setVisibleIndices((prev) => (prev.includes(i) ? prev : [...prev, i]));
                        }, i * 200); // 200ms delay between each item
                        timeoutIdsRef.current.push(timerId);
                    }
                } else {
                    // Reset animation when leaving viewport
                    clearAllTimeouts();
                    setVisibleIndices([]);
                }
            },
            { threshold }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            clearAllTimeouts();
            observer.disconnect();
        };
    }, [itemCount, threshold]);

    const getItemStyle = (index: number) => ({
        opacity: visibleIndices.includes(index) ? 1 : 0,
        transform: visibleIndices.includes(index) ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
    });

    return { containerRef, visibleIndices, getItemStyle };
}
