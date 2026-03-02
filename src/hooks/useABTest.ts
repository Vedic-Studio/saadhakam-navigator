import { useState, useEffect } from 'react';

type VariantParams = {
    experimentId: string;
    variants: string[];
};

/**
 * A simple hook for running local A/B tests.
 * In a production scenario, this would be connected to an analytics provider like PostHog, Optimizely, or VWO.
 * For now, it randomly assigns a variant and stores it in localStorage to maintain consistency across reloads.
 */
export function useABTest({ experimentId, variants }: VariantParams) {
    const [assignedVariant, setAssignedVariant] = useState<string>(variants[0]);

    useEffect(() => {
        // Check if user already has an assigned variant for this experiment
        const storedVariant = localStorage.getItem(`ab_test_${experimentId}`);

        if (storedVariant && variants.includes(storedVariant)) {
            setAssignedVariant(storedVariant);
        } else {
            // Assign a random variant
            const randomIndex = Math.floor(Math.random() * variants.length);
            const selectedVariant = variants[randomIndex];

            localStorage.setItem(`ab_test_${experimentId}`, selectedVariant);
            setAssignedVariant(selectedVariant);

            // In a real implementation we would also fire an event here
            // analytics.track('experiment_started', { experimentId, variant: selectedVariant });
            console.log(`[A/B Test] Assigned to variant ${selectedVariant} for experiment ${experimentId}`);
        }
    }, [experimentId, variants]);

    return assignedVariant;
}
