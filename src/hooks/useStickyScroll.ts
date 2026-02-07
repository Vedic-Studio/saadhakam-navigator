import { useState, useEffect, useRef } from 'react';

interface UseStickyScrollOptions {
    sectionCount: number;
}

export function useStickyScroll({ sectionCount }: UseStickyScrollOptions) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // The magic calculation:
            // 1. Where are we relative to the section?
            // containerTop is 0 when the section hits the top of the viewport.
            const containerTop = rect.top;
            const containerHeight = rect.height;

            // The distance the user can scroll while the content is pinned.
            // This is the total height of the section minus the viewport height.
            const totalScrollable = containerHeight - viewportHeight;

            if (totalScrollable <= 0) return;

            // scrolledInside is 0 when the section hits top, and grows as we scroll down.
            const scrolledInside = -containerTop;

            // progressValue is 0 at the start, 1 at the end.
            const progressValue = Math.max(0, Math.min(1, scrolledInside / totalScrollable));

            setProgress(progressValue);

            // Determine active section. 
            // We want each section to have an equal "zone" of importance.
            const sectionIndex = Math.min(
                sectionCount - 1,
                Math.floor(progressValue * sectionCount)
            );

            if (sectionIndex !== activeSection) {
                setActiveSection(sectionIndex);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial call to set state correctly on mount
        setTimeout(handleScroll, 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionCount, activeSection]);

    return { containerRef, activeSection, progress };
}
