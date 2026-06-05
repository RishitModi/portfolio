import { useEffect, useRef, useState } from 'react';

export function useParallax(speed: number = 0.5) {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const elementTop = window.pageYOffset + rect.top;
            const scrollPosition = window.pageYOffset;
            const distance = scrollPosition - (elementTop - window.innerHeight);

            // Only apply parallax when element is in/near viewport
            if (distance > -window.innerHeight && distance < window.innerHeight * 2) {
                setOffset(distance * speed);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return { ref, offset };
}
