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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Trigger animation after optional delay
                    if (delay > 0) {
                        const timer = setTimeout(() => setIsVisible(true), delay);
                        return () => clearTimeout(timer);
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

        return () => observer.disconnect();
    }, [threshold, delay]);

    return { ref, isVisible, duration };
}

export function useStaggeredAnimation(itemCount: number, config: ScrollAnimationConfig = {}) {
    const { threshold = 0.1 } = config;
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Reset and restart animation when entering viewport
                    setVisibleIndices([]); // Reset first

                    // Stagger animation for each item
                    for (let i = 0; i < itemCount; i++) {
                        setTimeout(() => {
                            setVisibleIndices((prev) => [...new Set([...prev, i])]);
                        }, i * 200); // 200ms delay between each item
                    }
                } else {
                    // Reset animation when leaving viewport
                    setVisibleIndices([]);
                }
            },
            { threshold }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [itemCount, threshold]); const getItemStyle = (index: number) => ({
        opacity: visibleIndices.includes(index) ? 1 : 0,
        transform: visibleIndices.includes(index) ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
    });

    return { containerRef, visibleIndices, getItemStyle };
}
