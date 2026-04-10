import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { VedicClockClient } from "@/components/jyotish/VedicClockClient";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import * as interactive from "@/lib/vedic-clock/interactive";

vi.mock("@/components/jyotish/visuals/VedicMuhurtaDial", () => ({
    VedicMuhurtaDial: (props: any) => (
        <div>
            <svg
                aria-label="Vedic muhūrta dial with 30 segments from sunrise to sunrise"
                onPointerDown={() => {
                    props.onScrubStateChange?.(true);
                    props.onScrubPreview?.(0.25);
                }}
                onPointerUp={() => {
                    props.onScrubCommit?.(0.25);
                    props.onScrubStateChange?.(false);
                }}
                onPointerCancel={() => {
                    props.onScrubCancel?.();
                    props.onScrubStateChange?.(false);
                }}
            />
            <button type="button" aria-label="Jump to muhūrta 2" onClick={() => props.onMuhurtaSelect?.(2)} onMouseEnter={() => props.onMuhurtaHover?.(2)} onMouseLeave={() => props.onMuhurtaHover?.(null)}>
                Jump to muhūrta 2
            </button>
            <button type="button" aria-label="Jump to Madhyāhna kala" onClick={() => props.onKalaSelect?.(2)} onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    props.onKalaSelect?.(2);
                }
            }}>
                Jump to Madhyāhna kala
            </button>
        </div>
    ),
}));

const basePayload: VedicClockResponse = {
    requestedDate: "2026-04-09",
    requestedDateTime: "2026-04-09T05:41",
    location: {
        kind: "preset",
        name: "Varanasi",
        region: "India",
        latitude: 25.3176,
        longitude: 82.9739,
        timezone: "Asia/Kolkata",
    },
    panchanga: {
        vara: { slug: "somavara", name: "Somavara", sanskritName: "सोमवार", summary: "summary" },
        tithi: { slug: "pratipada", name: "Pratipada", sanskritName: null, summary: "summary" },
        nakshatra: { slug: "ashwini", name: "Ashwini", sanskritName: "अश्विनी", summary: "summary" },
        yoga: "Vishkambha",
        karana: "Bava",
    },
    clock: {
        mode: "fixed-48-minute",
        currentLocalTime: "05:41",
        currentLocalDateTime: "2026-04-09T05:41",
        sunriseTime: "05:41",
        sunsetTime: "18:18",
        dayLengthMinutes: 757,
        minutesSinceSunrise: 0,
        cycleProgress: 0,
        currentMuhurtaIndex: 1,
        currentKalaIndex: 1,
        muhurtas: Array.from({ length: 30 }, (_, index) => ({
            index: index + 1,
            label: `Muhūrta ${String(index + 1).padStart(2, "0")}`,
            phase: index < 15 ? "day" as const : "night" as const,
            startTime: "05:41",
            endTime: "06:29",
            isActive: index === 0,
        })),
        kalaSegments: [
            { index: 1, name: "Prātaḥ", devanagari: "प्रातःकाल", phase: "day", startTime: "05:41", endTime: "12:00", startCycleMinute: 0, endCycleMinute: 378.5, isActive: true },
            { index: 2, name: "Madhyāhna", devanagari: "मध्याह्न", phase: "day", startTime: "12:00", endTime: "18:18", startCycleMinute: 378.5, endCycleMinute: 757, isActive: false },
            { index: 3, name: "Sāyam", devanagari: "सायंकाल", phase: "night", startTime: "18:18", endTime: "00:00", startCycleMinute: 757, endCycleMinute: 1098.5, isActive: false },
            { index: 4, name: "Niśītha", devanagari: "निशीथ", phase: "night", startTime: "00:00", endTime: "05:41", startCycleMinute: 1098.5, endCycleMinute: 1440, isActive: false },
        ],
        inauspiciousKalas: [
            { name: "Rahu Kala", devanagari: "राहु काल", startTime: "16:43", endTime: "18:17", startMinutes: 1003, endMinutes: 1097, isActive: false },
            { name: "Yamaganda", devanagari: "यमगण्ड", startTime: "11:59", endTime: "13:34", startMinutes: 719, endMinutes: 814, isActive: false },
            { name: "Gulika Kala", devanagari: "गुलिक काल", startTime: "15:08", endTime: "16:43", startMinutes: 908, endMinutes: 1003, isActive: false },
        ],
        auspiciousWindows: [
            { name: "Brahma Muhurta", devanagari: "ब्रह्म मुहूर्त", description: "Ideal for meditation, japa, and scriptural study. Sattva is strongest.", startTime: "04:05", endTime: "04:53", startMinutes: 245, endMinutes: 293, isActive: false, isPast: true },
            { name: "Pratah Sandhya", devanagari: "प्रातः सन्ध्या", description: "Dawn junction for sandhyavandana, gayatri japa, and pranyama.", startTime: "05:17", endTime: "06:05", startMinutes: 317, endMinutes: 365, isActive: true, isPast: false },
            { name: "Abhijit Muhurta", devanagari: "अभिजित् मुहूर्त", description: "Universally auspicious midday window for important beginnings and sankalpa.", startTime: "11:17", endTime: "12:05", startMinutes: 677, endMinutes: 725, isActive: false, isPast: false },
            { name: "Sayahna Sandhya", devanagari: "सायं सन्ध्या", description: "Dusk junction for evening arati, japa, and contemplative reflection.", startTime: "17:54", endTime: "18:42", startMinutes: 1074, endMinutes: 1122, isActive: false, isPast: false },
        ],
    },
    provenance: [
        { label: "Clock mode", value: "Fixed 48-minute muhūrta MVP", detail: "detail" },
    ],
};

function mockFetchResponse(payload: VedicClockResponse, ok = true) {
    return Promise.resolve({
        ok,
        json: async () => payload,
    } as Response);
}

function createDeferredResponse(payload: VedicClockResponse) {
    let resolve!: (value: Response) => void;
    const promise = new Promise<Response>((res) => {
        resolve = res;
    });

    return {
        promise,
        resolve: () => resolve({ ok: true, json: async () => payload } as Response),
    };
}

function deferredJsonResponse(payload: VedicClockResponse) {
    let resolve!: (value: Response) => void;
    const promise = new Promise<Response>((res) => {
        resolve = res;
    });

    return {
        promise,
        resolve: () => resolve({ ok: true, json: async () => payload } as Response),
    };
}

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

describe("VedicClockClient", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
        });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("advances the displayed time locally while live mode is active", async () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-04-09T05:41:00+05:30"));
        vi.spyOn(global, "fetch").mockImplementation(() => mockFetchResponse(basePayload));

        render(<VedicClockClient />);

        await act(async () => {
            await Promise.resolve();
        });

        expect(screen.getAllByText("Varanasi").length).toBeGreaterThan(0);
        expect(screen.getAllByText("2026-04-09T05:41").length).toBeGreaterThan(0);

        await act(async () => {
            vi.advanceTimersByTime(60_000);
        });

        expect(screen.getAllByText("2026-04-09T05:42").length).toBeGreaterThan(0);
    });

    it("stops live mode after manual interaction until Now is pressed again", async () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-04-09T05:41:00+05:30"));
        const manualPayload: VedicClockResponse = {
            ...basePayload,
            requestedDateTime: "2026-04-09T05:56",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-09T05:56",
                currentLocalTime: "05:56",
                minutesSinceSunrise: 15,
                cycleProgress: 15 / 1440,
            },
        };

        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(() => mockFetchResponse(manualPayload));

        render(<VedicClockClient />);

        await act(async () => {
            await Promise.resolve();
        });

        expect(screen.getAllByText("Varanasi").length).toBeGreaterThan(0);
        fireEvent.click(screen.getByRole("button", { name: /\+15 min/i }));

        await act(async () => {
            await Promise.resolve();
        });

        expect(screen.getAllByText("2026-04-09T05:56").length).toBeGreaterThan(0);

        await act(async () => {
            vi.advanceTimersByTime(5 * 60_000);
        });

        expect(screen.getAllByText("2026-04-09T05:56").length).toBeGreaterThan(0);
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("resumes live ticking when Now is pressed after manual mode", async () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-04-09T05:41:00+05:30"));
        const manualPayload: VedicClockResponse = {
            ...basePayload,
            requestedDateTime: "2026-04-09T05:56",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-09T05:56",
                currentLocalTime: "05:56",
                minutesSinceSunrise: 15,
                cycleProgress: 15 / 1440,
            },
        };

        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(() => mockFetchResponse(manualPayload))
            .mockImplementationOnce(() => mockFetchResponse(basePayload));

        render(<VedicClockClient />);

        await act(async () => {
            await Promise.resolve();
        });

        expect(screen.getAllByText("Varanasi").length).toBeGreaterThan(0);
        fireEvent.click(screen.getByRole("button", { name: /\+15 min/i }));
        await act(async () => {
            await Promise.resolve();
        });
        expect(screen.getAllByText("2026-04-09T05:56").length).toBeGreaterThan(0);

        fireEvent.click(screen.getByRole("button", { name: /^now$/i }));

        await act(async () => {
            await Promise.resolve();
        });
        expect(fetchMock).toHaveBeenCalledTimes(3);

        expect(screen.getAllByText("2026-04-09T05:41").length).toBeGreaterThan(0);

        await act(async () => {
            vi.advanceTimersByTime(60_000);
        });

        expect(screen.getAllByText("2026-04-09T05:42").length).toBeGreaterThan(0);
    });

    it("shows live seconds that tick every second and hides them in manual mode", async () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-04-09T05:41:00+05:30"));
        vi.spyOn(global, "fetch").mockImplementation(() => mockFetchResponse(basePayload));

        render(<VedicClockClient />);

        await act(async () => {
            await Promise.resolve();
        });

        // Initially shows :00
        expect(screen.getByText(":00")).toBeDefined();

        // Advance 5 seconds — should show :05
        await act(async () => {
            vi.advanceTimersByTime(5_000);
        });
        expect(screen.getByText(":05")).toBeDefined();

        // Advance to 30 seconds — should show :30
        await act(async () => {
            vi.advanceTimersByTime(25_000);
        });
        expect(screen.getByText(":30")).toBeDefined();

        // Enter manual mode — seconds display should disappear
        fireEvent.click(screen.getByRole("button", { name: /\+15 min/i }));
        await act(async () => {
            await Promise.resolve();
        });
        expect(screen.queryByText(":30")).toBeNull();
    });

    it("does not synthesize cross-date preview state from stale astronomy", async () => {
        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(() =>
                mockFetchResponse({
                    ...basePayload,
                    requestedDate: "2026-04-10",
                    requestedDateTime: "2026-04-10T05:41",
                    clock: { ...basePayload.clock, currentLocalDateTime: "2026-04-10T05:41", currentLocalTime: "05:41" },
                }),
            );

        render(<VedicClockClient />);

        await screen.findByText("Varanasi");
        expect(screen.getAllByText("2026-04-09T05:41").length).toBeGreaterThan(0);

        fireEvent.click(screen.getAllByRole("button", { name: /day/i })[1]!);

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(2);
        });

        expect(screen.getAllByText("2026-04-10T05:41").length).toBeGreaterThan(0);
        expect(screen.queryByText("2026-04-09T05:41")).toBeNull();
    });

    it("reverts preview state after a failed commit fetch", async () => {
        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(async () => ({ ok: false, json: async () => ({ error: "boom" }) } as Response));

        render(<VedicClockClient />);

        await screen.findByText("Varanasi");
        fireEvent.click(screen.getByRole("button", { name: /next muhūrta/i }));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(2);
            expect(screen.getByText("boom")).toBeDefined();
        });

        expect(screen.getAllByText("2026-04-09T05:41").length).toBeGreaterThan(0);
    });

    it("keeps the active badge synchronized with hovered muhūrta details", async () => {
        vi.spyOn(global, "fetch").mockImplementation(() => mockFetchResponse(basePayload));

        render(<VedicClockClient />);

        await screen.findByText("Varanasi");

        const hoveredCard = screen.getByRole("button", { name: /^Jump to muhūrta 2$/i });
        fireEvent.mouseEnter(hoveredCard);

        expect(screen.getAllByText("Ahi").length).toBeGreaterThan(0);
        expect(screen.getAllByText("02").length).toBeGreaterThan(0);

        fireEvent.mouseLeave(hoveredCard);

        await waitFor(() => {
            expect(screen.getAllByText("01").length).toBeGreaterThan(0);
        });
    });

    it("fully disables inline SVG animations when reduced motion is preferred", async () => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
        });

        vi.spyOn(global, "fetch").mockImplementation(() => mockFetchResponse(basePayload));

        const { container } = render(<VedicClockClient />);

        await screen.findByText("Varanasi");

        expect(container.querySelectorAll("animate")).toHaveLength(0);
    });

    it("applies a typed date and time through the commit flow", async () => {
        const appliedPayload: VedicClockResponse = {
            ...basePayload,
            requestedDateTime: "2026-04-10T06:15",
            requestedDate: "2026-04-10",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-10T06:15",
                currentLocalTime: "06:15",
            },
        };

        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(() => mockFetchResponse(appliedPayload));

        render(<VedicClockClient />);
        await screen.findByText("Varanasi");

        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2026-04-10" } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: "06:15" } });
        fireEvent.click(screen.getByRole("button", { name: /^apply$/i }));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(2);
        });

        expect(screen.getAllByText("2026-04-10T06:15").length).toBeGreaterThan(0);
    });

    it("resets to now after navigating away from the current moment", async () => {
        const shiftedPayload: VedicClockResponse = {
            ...basePayload,
            requestedDateTime: "2026-04-10T06:15",
            requestedDate: "2026-04-10",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-10T06:15",
                currentLocalTime: "06:15",
            },
        };

        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(() => mockFetchResponse(shiftedPayload))
            .mockImplementationOnce(() => mockFetchResponse(basePayload));

        render(<VedicClockClient />);
        await screen.findByText("Varanasi");

        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2026-04-10" } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: "06:15" } });
        fireEvent.click(screen.getByRole("button", { name: /^apply$/i }));
        await screen.findAllByText("2026-04-10T06:15");

        fireEvent.click(screen.getByRole("button", { name: /^now$/i }));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(3);
        });

        expect(screen.getAllByText("2026-04-09T05:41").length).toBeGreaterThan(0);
    });

    it("supports prev/next day, ±15 min, and prev/next muhūrta controls", async () => {
        const nextDay = {
            ...basePayload,
            requestedDate: "2026-04-10",
            requestedDateTime: "2026-04-10T05:41",
            clock: { ...basePayload.clock, currentLocalDateTime: "2026-04-10T05:41" },
        };
        const minus15 = {
            ...basePayload,
            requestedDateTime: "2026-04-10T05:26",
            clock: { ...basePayload.clock, currentLocalDateTime: "2026-04-10T05:26", currentLocalTime: "05:26" },
        };
        const plus15 = {
            ...basePayload,
            requestedDateTime: "2026-04-10T05:41",
            clock: { ...basePayload.clock, currentLocalDateTime: "2026-04-10T05:41", currentLocalTime: "05:41" },
        };
        const nextMuhurta = {
            ...basePayload,
            requestedDateTime: "2026-04-10T06:29",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-10T06:29",
                currentLocalTime: "06:29",
                currentMuhurtaIndex: 2,
            },
        };
        const prevMuhurta = {
            ...basePayload,
            requestedDateTime: "2026-04-10T05:41",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-10T05:41",
                currentLocalTime: "05:41",
                currentMuhurtaIndex: 1,
            },
        };

        vi.spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(() => mockFetchResponse(nextDay))
            .mockImplementationOnce(() => mockFetchResponse(minus15))
            .mockImplementationOnce(() => mockFetchResponse(plus15))
            .mockImplementationOnce(() => mockFetchResponse(nextMuhurta))
            .mockImplementationOnce(() => mockFetchResponse(prevMuhurta));

        render(<VedicClockClient />);
        await screen.findByText("Varanasi");

        fireEvent.click(screen.getAllByRole("button", { name: /day/i })[1]!);
        await screen.findAllByText("2026-04-10T05:41");

        fireEvent.click(screen.getByRole("button", { name: /−15 min/i }));
        await screen.findAllByText("2026-04-10T05:26");

        fireEvent.click(screen.getByRole("button", { name: /\+15 min/i }));
        await screen.findAllByText("2026-04-10T05:41");

        fireEvent.click(screen.getByRole("button", { name: /next muhūrta/i }));
        await screen.findAllByText("2026-04-10T06:29");

        fireEvent.click(screen.getByRole("button", { name: /prev muhūrta/i }));
        await screen.findAllByText("2026-04-10T05:41");
    });

    it("commits kala arc selection from keyboard interaction", async () => {
        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(() =>
                mockFetchResponse({
                    ...basePayload,
                    requestedDateTime: "2026-04-09T15:09",
                    clock: {
                        ...basePayload.clock,
                        currentLocalDateTime: "2026-04-09T15:09",
                        currentLocalTime: "15:09",
                        currentKalaIndex: 2,
                    },
                }),
            );

        render(<VedicClockClient />);
        await screen.findByText("Varanasi");

        const kalaButton = screen.getByLabelText(/jump to madhyāhna kala/i);
        fireEvent.keyDown(kalaButton, { key: "Enter" });

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(2);
        });
    });

    it("commits muhūrta arc click and ledger click interactions", async () => {
        const arcPayload = {
            ...basePayload,
            requestedDateTime: "2026-04-09T06:53",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-09T06:53",
                currentLocalTime: "06:53",
                currentMuhurtaIndex: 2,
            },
        };
        const ledgerPayload = {
            ...basePayload,
            requestedDateTime: "2026-04-09T08:29",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-09T08:29",
                currentLocalTime: "08:29",
                currentMuhurtaIndex: 4,
            },
        };

        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(() => mockFetchResponse(arcPayload))
            .mockImplementationOnce(() => mockFetchResponse(ledgerPayload));

        const { container } = render(<VedicClockClient />);
        await screen.findByText("Varanasi");

        fireEvent.click(screen.getByRole("button", { name: /^jump to muhūrta 2$/i }));
        await screen.findAllByText("2026-04-09T06:53");

        const ledgerButton = container.querySelectorAll('ol li[role="button"]')[3];

        expect(ledgerButton).toBeTruthy();
        if (!ledgerButton) return;

        fireEvent.click(ledgerButton);
        await screen.findAllByText("2026-04-09T08:29");

        expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it("cancels scrub preview when the dial receives a pointer cancel", async () => {
        vi.spyOn(global, "fetch").mockImplementation(() => mockFetchResponse(basePayload));
        vi.spyOn(interactive, "buildDateTimeFromCycleOffset").mockReturnValue("2026-04-09T06:00");

        const { container } = render(<VedicClockClient />);
        await screen.findAllByText("2026-04-09T05:41");

        const svg = container.querySelector('svg[aria-label="Vedic muhūrta dial with 30 segments from sunrise to sunrise"]');
        expect(svg).toBeTruthy();
        if (!svg) return;

        setDialBounds(svg);
        Object.defineProperty(svg, "setPointerCapture", { value: vi.fn(), configurable: true });
        Object.defineProperty(svg, "releasePointerCapture", { value: vi.fn(), configurable: true });
        Object.defineProperty(svg, "hasPointerCapture", { value: vi.fn().mockReturnValue(true), configurable: true });

        fireEvent.pointerDown(svg, { pointerId: 1, clientX: 310, clientY: 70 });

        await waitFor(() => {
            expect(screen.getAllByText(/previewing/i).length).toBeGreaterThan(0);
        });

        fireEvent.pointerCancel(svg, { pointerId: 1, clientX: 310, clientY: 70 });

        await waitFor(() => {
            expect(screen.queryByText(/previewing/i)).toBeNull();
        });
    });

    it("shows scrub preview immediately and commits on pointer release", async () => {
        const committedPayload = {
            ...basePayload,
            requestedDateTime: "2026-04-09T06:00",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-09T06:00",
                currentLocalTime: "06:00",
            },
        };
        const commitResponse = deferredJsonResponse(committedPayload);

        vi.spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(() => commitResponse.promise);
        vi.spyOn(interactive, "buildDateTimeFromCycleOffset").mockReturnValue("2026-04-09T06:00");

        const { container } = render(<VedicClockClient />);
        await screen.findAllByText("2026-04-09T05:41");

        const svg = container.querySelector('svg[aria-label="Vedic muhūrta dial with 30 segments from sunrise to sunrise"]');
        expect(svg).toBeTruthy();
        if (!svg) return;

        setDialBounds(svg);
        Object.defineProperty(svg, "setPointerCapture", { value: vi.fn(), configurable: true });
        Object.defineProperty(svg, "releasePointerCapture", { value: vi.fn(), configurable: true });
        Object.defineProperty(svg, "hasPointerCapture", { value: vi.fn().mockReturnValue(true), configurable: true });

        fireEvent.pointerDown(svg, { pointerId: 1, clientX: 310, clientY: 70 });
        await waitFor(() => expect(screen.getAllByText(/previewing/i).length).toBeGreaterThan(0));

        fireEvent.pointerUp(svg, { pointerId: 1, clientX: 310, clientY: 70 });
        await waitFor(() => expect(screen.getByText(/syncing/i)).toBeDefined());

        commitResponse.resolve();
        await screen.findAllByText("2026-04-09T06:00");
    });

    it("ignores stale fetch responses that resolve after a newer commit", async () => {
        const stalePayload: VedicClockResponse = {
            ...basePayload,
            requestedDate: "2026-04-08",
            requestedDateTime: "2026-04-08T05:41",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-08T05:41",
                currentLocalTime: "05:41",
            },
        };

        const firstShiftPayload: VedicClockResponse = {
            ...basePayload,
            requestedDateTime: "2026-04-09T06:29",
            clock: {
                ...basePayload.clock,
                currentLocalDateTime: "2026-04-09T06:29",
                currentLocalTime: "06:29",
                minutesSinceSunrise: 48,
                cycleProgress: 48 / 1440,
                currentMuhurtaIndex: 2,
                muhurtas: basePayload.clock.muhurtas.map((segment, index) => ({
                    ...segment,
                    isActive: index === 1,
                })),
            },
        };

        const staleRequest = createDeferredResponse(stalePayload);
        const latestRequest = createDeferredResponse(firstShiftPayload);

        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockImplementationOnce(() => mockFetchResponse(basePayload))
            .mockImplementationOnce(() => staleRequest.promise)
            .mockImplementationOnce(() => latestRequest.promise);

        render(<VedicClockClient />);

        await screen.findByText("Varanasi");

        fireEvent.click(screen.getByRole("button", { name: /next muhūrta/i }));
        fireEvent.click(screen.getAllByRole("button", { name: /day/i })[0]!);

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(3);
        });

        latestRequest.resolve();
        await waitFor(() => {
            expect(screen.getAllByText("2026-04-09T06:29").length).toBeGreaterThan(0);
        });

        staleRequest.resolve();

        await waitFor(() => {
            expect(screen.getAllByText("2026-04-09T06:29").length).toBeGreaterThan(0);
        });

        expect(screen.queryByText("2026-04-08T05:41")).toBeNull();
    });
});