import { useState, useEffect, useRef } from 'react';

interface UseStickyScrollOptions {
    sectionCount: number;
    offset?: number;
}

export function useStickyScroll({ sectionCount, offset = 0 }: UseStickyScrollOptions) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const { top, height } = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate how far we've scrolled into the container
            // The container enters view when top < viewportHeight
            // We want to track progress from when top reaches 0 (or offset)
            const start = top - offset;
            const end = height - viewportHeight;

            // Creating a normalized progress value (0 to 1) within the scrollable area
            // We use absolute value of top because top becomes negative as we scroll down
            const scrollDistance = -start;
            const progressValue = Math.max(0, Math.min(1, scrollDistance / end));

            setProgress(progressValue);

            // determine active section based on progress
            // We map the 0-1 progress to 0-(sectionCount-1)
            const sectionIndex = Math.min(
                sectionCount - 1,
                Math.floor(progressValue * sectionCount)
            );

            setActiveSection(sectionIndex);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionCount, offset]);

    return { containerRef, activeSection, progress };
}
