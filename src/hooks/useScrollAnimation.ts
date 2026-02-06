import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, rootMargin, triggerOnce]);

    return { ref, isVisible };
}

export function useStaggeredChildren(parentVisible: boolean, delta: number = 100) {
    const [visibleChildren, setVisibleChildren] = useState<number>(0);
    const countRef = useRef(0);

    useEffect(() => {
        if (parentVisible) {
            const interval = setInterval(() => {
                setVisibleChildren(prev => prev + 1);
                countRef.current += 1;
                // Auto-clear after reasonable max (prevents infinite running)
                if (countRef.current > 20) clearInterval(interval);
            }, delta);
            return () => clearInterval(interval);
        } else {
            setVisibleChildren(0);
            countRef.current = 0;
        }
    }, [parentVisible, delta]);

    return visibleChildren;
}
