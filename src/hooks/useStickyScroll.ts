import { useState, useEffect, useRef, RefObject } from 'react';

interface UseStickyScrollOptions {
    sectionCount: number;
}

export function useStickyScroll({ sectionCount }: UseStickyScrollOptions) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const containerTop = rect.top;
            const containerHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // The scrollable distance is the container height minus one viewport height
            // (because the last viewport-height portion is where the sticky element stays)
            const scrollableDistance = containerHeight - viewportHeight;

            // How far have we scrolled into the container?
            // When containerTop = 0, we've just started scrolling the section
            // When containerTop = -(containerHeight - viewportHeight), we've finished
            const scrolledAmount = -containerTop;

            // Clamp progress between 0 and 1
            const progressValue = Math.max(0, Math.min(1, scrolledAmount / scrollableDistance));

            setProgress(progressValue);

            // Map progress to section index
            // We want each section to take an equal portion of the scroll
            const sectionIndex = Math.min(
                sectionCount - 1,
                Math.floor(progressValue * sectionCount)
            );

            setActiveSection(sectionIndex);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionCount]);

    return { containerRef, activeSection, progress };
}
