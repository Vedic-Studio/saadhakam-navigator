import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { VedicMuhurtaDial, getCycleProgressFromPoint } from "@/components/jyotish/visuals/VedicMuhurtaDial";
import { muhurtaNames } from "@/lib/vedic-clock/muhurta-names";

const muhurtas = Array.from({ length: 30 }, (_, index) => ({
    index: index + 1,
    startTime: "05:41",
    endTime: "06:29",
    phase: index < 15 ? ("day" as const) : ("night" as const),
    isActive: index === 0,
}));

const kalaSegments = [
    { index: 1, name: "Prātaḥ", devanagari: "प्रातःकाल", phase: "day" as const, startTime: "05:41", endTime: "12:00", startCycleMinute: 0, endCycleMinute: 378.5, isActive: true },
    { index: 2, name: "Madhyāhna", devanagari: "मध्याह्न", phase: "day" as const, startTime: "12:00", endTime: "18:18", startCycleMinute: 378.5, endCycleMinute: 757, isActive: false },
    { index: 3, name: "Sāyam", devanagari: "सायंकाल", phase: "night" as const, startTime: "18:18", endTime: "00:00", startCycleMinute: 757, endCycleMinute: 1098.5, isActive: false },
    { index: 4, name: "Niśītha", devanagari: "निशीथ", phase: "night" as const, startTime: "00:00", endTime: "05:41", startCycleMinute: 1098.5, endCycleMinute: 1440, isActive: false },
];

function setDialBounds(element: Element) {
    vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 620,
        bottom: 620,
        width: 620,
        height: 620,
        toJSON: () => ({}),
    } as DOMRect);
}

function renderDial(props?: Partial<ComponentProps<typeof VedicMuhurtaDial>>) {
    return render(
        <VedicMuhurtaDial
            muhurtas={muhurtas}
            kalaSegments={kalaSegments}
            currentLocalTime="05:41"
            sunriseTime="05:41"
            sunsetTime="18:18"
            currentMuhurtaIndex={1}
            muhurtaNames={muhurtaNames}
            {...props}
        />,
    );
}

describe("VedicMuhurtaDial", () => {
    it("maps valid pointer positions to a cycle progress value", () => {
        const progress = getCycleProgressFromPoint({
            clientX: 310,
            clientY: 70,
            rect: { left: 0, top: 0, width: 620, height: 620 },
            size: 620,
            cx: 310,
            cy: 310,
            minRadius: 180,
            maxRadius: 262,
            startOffset: -Math.PI / 2,
        });

        expect(progress).not.toBeNull();
        expect(progress).toBeGreaterThanOrEqual(0);
        expect(progress).toBeLessThanOrEqual(1);
    });

    it("rejects pointer positions outside the valid ring", () => {
        expect(
            getCycleProgressFromPoint({
                clientX: 310,
                clientY: 310,
                rect: { left: 0, top: 0, width: 620, height: 620 },
                size: 620,
                cx: 310,
                cy: 310,
                minRadius: 180,
                maxRadius: 262,
                startOffset: -Math.PI / 2,
            }),
        ).toBeNull();

        expect(
            getCycleProgressFromPoint({
                clientX: 310,
                clientY: 10,
                rect: { left: 0, top: 0, width: 620, height: 620 },
                size: 620,
                cx: 310,
                cy: 310,
                minRadius: 180,
                maxRadius: 262,
                startOffset: -Math.PI / 2,
            }),
        ).toBeNull();
    });

    it("keeps kala and muhūrta hit regions keyboard-activatable", () => {
        const onKalaSelect = vi.fn();
        const onMuhurtaSelect = vi.fn();
        renderDial({ onKalaSelect, onMuhurtaSelect });

        fireEvent.keyDown(screen.getByLabelText(/jump to madhyāhna kala/i), { key: "Enter" });
        fireEvent.keyDown(screen.getByLabelText(/^Jump to muhūrta 2$/i), { key: " " });

        expect(onKalaSelect).toHaveBeenCalledWith(2);
        expect(onMuhurtaSelect).toHaveBeenCalledWith(2);
    });
});