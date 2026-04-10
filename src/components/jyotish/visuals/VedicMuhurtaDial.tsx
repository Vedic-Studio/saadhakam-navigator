"use client";

/**
 * VedicMuhurtaDial — a multi-ring brass dial inspired by the Vikram Vaidika
 * Ghaṭī at Kashi / Ujjain. Concentric bands read outward-in:
 *
 *   1. Ornamental brass frame with corner diyas
 *   2. Roman numeral 1–12 hour ring (the civic reading)
 *   3. Caturyāma band — the four day-periods (prātaḥ / madhyāhna / sāyam / niśītha)
 *   4. 30 muhūrta ring with Devanagari name + Latin transliteration
 *   5. Tick ring
 *   6. Mandala core with ॐ, live time, active muhūrta name and deity
 *
 * Sun medallion (दिन) sits at the 9 o'clock position; Moon medallion (रात्रि)
 * at 3 o'clock, both flanking the dial. Tiny diya flames flicker at the
 * top corners of the frame.
 */

import { useMemo, useRef } from "react";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import { KALA_SEGMENTS, timeToMinutes } from "@/lib/vedic-clock/interactive";

interface MuhurtaSegment {
    index: number;
    startTime: string;
    endTime: string;
    phase: "day" | "night";
    isActive: boolean;
}

type KalaSegment = VedicClockResponse["clock"]["kalaSegments"][number];

interface VedicMuhurtaDialProps {
    muhurtas: MuhurtaSegment[];
    kalaSegments: KalaSegment[];
    currentLocalTime: string;
    sunriseTime: string;
    sunsetTime: string;
    currentMuhurtaIndex: number;
    muhurtaNames: { name: string; devanagari: string; deity: string }[];
    hoveredMuhurtaIndex?: number | null;
    hoveredKalaIndex?: number | null;
    onMuhurtaSelect?: (index: number) => void;
    onMuhurtaHover?: (index: number | null) => void;
    onKalaSelect?: (index: number) => void;
    onKalaHover?: (index: number | null) => void;
    onScrubPreview?: (cycleProgress: number) => void;
    onScrubCommit?: (cycleProgress: number) => void;
    onScrubCancel?: () => void;
    onScrubStateChange?: (isDragging: boolean) => void;
    reducedMotion?: boolean;
    secondsOffset?: number;
    size?: number;
}

const TAU = Math.PI * 2;

export function getCycleProgressFromPoint(input: {
    clientX: number;
    clientY: number;
    rect: Pick<DOMRect, "left" | "top" | "width" | "height">;
    size: number;
    cx: number;
    cy: number;
    minRadius: number;
    maxRadius: number;
    startOffset: number;
}) {
    const localX = ((input.clientX - input.rect.left) / input.rect.width) * input.size;
    const localY = ((input.clientY - input.rect.top) / input.rect.height) * input.size;
    const dx = localX - input.cx;
    const dy = localY - input.cy;
    const distance = Math.hypot(dx, dy);
    if (!Number.isFinite(distance)) {
        return null;
    }

    if (distance < input.minRadius || distance > input.maxRadius) {
        return null;
    }

    const rawAngle = Math.atan2(dy, dx);
    const progress = ((rawAngle - input.startOffset) % TAU + TAU) % TAU / TAU;
    return Number.isFinite(progress) ? progress : null;
}

function polar(cx: number, cy: number, r: number, angleRad: number) {
    return {
        x: cx + r * Math.cos(angleRad),
        y: cy + r * Math.sin(angleRad),
    };
}

function arcPath(
    cx: number,
    cy: number,
    outerR: number,
    innerR: number,
    startAngle: number,
    endAngle: number,
) {
    const startOuter = polar(cx, cy, outerR, startAngle);
    const endOuter = polar(cx, cy, outerR, endAngle);
    const startInner = polar(cx, cy, innerR, endAngle);
    const endInner = polar(cx, cy, innerR, startAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    return [
        `M ${startOuter.x} ${startOuter.y}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
        `L ${startInner.x} ${startInner.y}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`,
        "Z",
    ].join(" ");
}

const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

export function VedicMuhurtaDial({
    muhurtas,
    kalaSegments,
    currentLocalTime,
    sunriseTime,
    sunsetTime,
    currentMuhurtaIndex,
    muhurtaNames,
    hoveredMuhurtaIndex = null,
    hoveredKalaIndex = null,
    onMuhurtaSelect,
    onMuhurtaHover,
    onKalaSelect,
    onKalaHover,
    onScrubPreview,
    onScrubCommit,
    onScrubCancel,
    onScrubStateChange,
    reducedMotion = false,
    secondsOffset = 0,
    size = 620,
}: VedicMuhurtaDialProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const draggingRef = useRef(false);
    const cx = size / 2;
    const cy = size / 2;

    // Concentric radii
    const frameOuter = size / 2 - 4;
    const frameInner = frameOuter - 14;
    const romanOuter = frameInner - 2;
    const romanInner = romanOuter - 30;
    const yamaOuter = romanInner - 2;
    const yamaInner = yamaOuter - 26;
    const muhurtaOuter = yamaInner - 2;
    const muhurtaInner = muhurtaOuter - 70;
    const tickOuter = muhurtaInner - 4;
    const tickInner = tickOuter - 12;
    const coreRingOuter = tickInner - 6;
    const coreRingInner = coreRingOuter - 6;
    const core = coreRingInner - 6;

    const startOffset = -Math.PI / 2;
    const segmentAngle = TAU / 30;

    // Time hand rotation based on fraction of elapsed minutes (+ seconds) since sunrise.
    const handAngle = useMemo(() => {
        const nowMin = timeToMinutes(currentLocalTime);
        const sunriseMin = timeToMinutes(sunriseTime);
        let delta = nowMin - sunriseMin;
        if (delta < 0) delta += 1440;
        const fraction = (delta + secondsOffset / 60) / 1440;
        return startOffset + fraction * TAU;
    }, [currentLocalTime, sunriseTime, startOffset, secondsOffset]);

    // Seeded mandala star field
    const stars = useMemo(() => {
        const out: { x: number; y: number; r: number; opacity: number }[] = [];
        for (let i = 0; i < 70; i++) {
            const s1 = ((i * 7919 + 104729) % 10000) / 10000;
            const s2 = ((i * 6271 + 32749) % 10000) / 10000;
            const s3 = ((i * 4513 + 65521) % 10000) / 10000;
            const angle = s1 * TAU;
            const dist = core * 0.15 + s2 * core * 0.75;
            out.push({
                x: cx + Math.cos(angle) * dist,
                y: cy + Math.sin(angle) * dist,
                r: 0.3 + s3 * 1.1,
                opacity: 0.15 + s3 * 0.45,
            });
        }
        return out;
    }, [cx, cy, core]);

    // Caturyāma arcs — split the sunrise-to-sunrise day into four quarters
    // weighted by day/night balance. Day halves: prātaḥ (sunrise..midday),
    // madhyāhna (midday..sunset). Night halves: sāyam (sunset..midnight),
    // niśītha (midnight..next sunrise).
    const caturyamaArcs = useMemo(
        () =>
            kalaSegments.map((segment, index) => ({
                ...segment,
                name: segment.name || KALA_SEGMENTS[index]?.name,
                devanagari: segment.devanagari || KALA_SEGMENTS[index]?.devanagari,
                start: segment.startCycleMinute / 1440,
                end: segment.endCycleMinute / 1440,
            })),
        [kalaSegments],
    );

    // Sun / moon medallion positions — outside the dial, 9 o'clock & 3 o'clock
    const sunMedallionX = cx - frameOuter - 6;
    const moonMedallionX = cx + frameOuter + 6;
    const medallionR = 24;

    function getCycleProgressFromClientPoint(clientX: number, clientY: number) {
        const svg = svgRef.current;
        if (!svg) return null;

        const rect = svg.getBoundingClientRect();
        return getCycleProgressFromPoint({
            clientX,
            clientY,
            rect,
            size,
            cx,
            cy,
            minRadius: core,
            maxRadius: muhurtaOuter + 24,
            startOffset,
        });
    }

    function updateScrub(clientX: number, clientY: number) {
        const progress = getCycleProgressFromClientPoint(clientX, clientY);
        if (progress == null) {
            onScrubCancel?.();
            return;
        }
        onScrubPreview?.(progress);
    }

    function handlePointerDown(event: React.PointerEvent<SVGSVGElement>) {
        const progress = getCycleProgressFromClientPoint(event.clientX, event.clientY);
        if (progress == null) return;

        draggingRef.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        onScrubStateChange?.(true);
        onScrubPreview?.(progress);
    }

    function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
        if (!draggingRef.current) return;
        updateScrub(event.clientX, event.clientY);
    }

    function handlePointerUp(event: React.PointerEvent<SVGSVGElement>) {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        const progress = getCycleProgressFromClientPoint(event.clientX, event.clientY);
        if (progress != null) {
            onScrubCommit?.(progress);
        } else {
            onScrubCancel?.();
        }
        onScrubStateChange?.(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    }

    function handlePointerCancel(event: React.PointerEvent<SVGSVGElement>) {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        onScrubCancel?.();
        onScrubStateChange?.(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    }

    return (
        <svg
            ref={svgRef}
            viewBox={`-${medallionR + 18} 0 ${size + 2 * (medallionR + 18)} ${size + 30}`}
            width="100%"
            height="100%"
            className="mx-auto max-w-full h-auto drop-shadow-[0_0_60px_rgba(245,158,11,0.22)]"
            aria-label="Vedic muhūrta dial with 30 segments from sunrise to sunrise"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            style={{ touchAction: "none", userSelect: "none" }}
        >
            <defs>
                {/* Brass rim — warm gold gradient with darker shadow band */}
                <linearGradient id="vmd-brass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8a5a1a" />
                    <stop offset="35%" stopColor="#f5c977" />
                    <stop offset="55%" stopColor="#e8a544" />
                    <stop offset="100%" stopColor="#6b3f12" />
                </linearGradient>
                <linearGradient id="vmd-brass-light" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fde68a" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
                <radialGradient id="vmd-face" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#1a0f08" />
                    <stop offset="60%" stopColor="#0f0a06" />
                    <stop offset="100%" stopColor="#050302" />
                </radialGradient>
                <radialGradient id="vmd-core" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#2a1a0c" />
                    <stop offset="55%" stopColor="#130a04" />
                    <stop offset="100%" stopColor="#050302" />
                </radialGradient>
                {/* Day period backgrounds: warm rust and cool indigo */}
                <linearGradient id="vmd-day-band" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7a2e12" />
                    <stop offset="100%" stopColor="#3d1808" />
                </linearGradient>
                <linearGradient id="vmd-night-band" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e1030" />
                    <stop offset="100%" stopColor="#0a0418" />
                </linearGradient>
                <linearGradient id="vmd-muhurta-day" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2a1606" />
                    <stop offset="100%" stopColor="#140a02" />
                </linearGradient>
                <linearGradient id="vmd-muhurta-night" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#140a22" />
                    <stop offset="100%" stopColor="#070310" />
                </linearGradient>
                <linearGradient id="vmd-active" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <radialGradient id="vmd-sun" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#7c2d12" />
                </radialGradient>
                <radialGradient id="vmd-moon" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="60%" stopColor="#c7d2fe" />
                    <stop offset="100%" stopColor="#1e1b4b" />
                </radialGradient>
                <radialGradient id="vmd-diya-flame" cx="50%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#fef9c3" />
                    <stop offset="40%" stopColor="#fcd34d" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
                </radialGradient>
                <filter id="vmd-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="vmd-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <pattern id="vmd-scroll" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="6" cy="6" r="0.8" fill="rgba(245,201,119,0.25)" />
                </pattern>
            </defs>

            {/* Top diyas — a pair of lamps flanking the crown of the dial */}
            <g transform={`translate(${cx - frameOuter * 0.72}, 18)`}>
                <Diya reducedMotion={reducedMotion} />
            </g>
            <g transform={`translate(${cx + frameOuter * 0.72}, 18)`}>
                <Diya reducedMotion={reducedMotion} />
            </g>

            {/* Outermost ornate brass frame */}
            <circle cx={cx} cy={cy} r={frameOuter} fill="url(#vmd-brass)" />
            <circle cx={cx} cy={cy} r={frameOuter - 2} fill="none" stroke="#2d1808" strokeWidth={0.8} />
            <circle cx={cx} cy={cy} r={frameInner + 3} fill="none" stroke="#2d1808" strokeWidth={0.8} />
            <circle cx={cx} cy={cy} r={frameInner} fill="url(#vmd-face)" />

            {/* Decorative frame knobs / rivets */}
            {Array.from({ length: 24 }, (_, i) => {
                const angle = startOffset + (i / 24) * TAU;
                const p = polar(cx, cy, (frameOuter + frameInner) / 2, angle);
                return (
                    <circle key={`knob-${i}`} cx={p.x} cy={p.y} r={1.6} fill="#2d1808" opacity={0.8} />
                );
            })}

            {/* Roman numeral hour ring backing — subtle rust */}
            <circle cx={cx} cy={cy} r={romanOuter} fill="none" stroke="rgba(245,201,119,0.4)" strokeWidth={0.8} />
            <circle cx={cx} cy={cy} r={romanInner} fill="none" stroke="rgba(245,201,119,0.4)" strokeWidth={0.8} />
            {ROMAN.map((numeral, i) => {
                const angle = startOffset + (i / 12) * TAU;
                const r = (romanOuter + romanInner) / 2;
                const p = polar(cx, cy, r, angle);
                const rotate = (angle * 180) / Math.PI + 90;
                return (
                    <g key={`roman-${i}`}>
                        <text
                            x={p.x}
                            y={p.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={16}
                            fontWeight={600}
                            fontFamily="'Playfair Display', serif"
                            fill="url(#vmd-brass-light)"
                            transform={`rotate(${rotate} ${p.x} ${p.y})`}
                            style={{ filter: "drop-shadow(0 0 3px rgba(251,191,36,0.4))" }}
                        >
                            {numeral}
                        </text>
                    </g>
                );
            })}

            {/* Caturyāma (4 day-periods) band */}
            {caturyamaArcs.map((yama) => {
                const start = startOffset + yama.start * TAU;
                const end = startOffset + yama.end * TAU;
                const mid = (start + end) / 2;
                const r = (yamaOuter + yamaInner) / 2;
                const p = polar(cx, cy, r, mid);
                const rotate = (mid * 180) / Math.PI + 90;
                const flipped = rotate > 90 && rotate < 270;
                const rotateAdjust = flipped ? 180 : 0;

                return (
                    <g key={yama.name}>
                        <path
                            d={arcPath(cx, cy, yamaOuter, yamaInner, start, end)}
                            fill={yama.phase === "day" ? "url(#vmd-day-band)" : "url(#vmd-night-band)"}
                            stroke={hoveredKalaIndex === yama.index || yama.isActive ? "#fde68a" : "rgba(245,201,119,0.4)"}
                            strokeWidth={hoveredKalaIndex === yama.index || yama.isActive ? 1.4 : 0.8}
                            style={{
                                filter: hoveredKalaIndex === yama.index || yama.isActive ? "url(#vmd-soft-glow)" : undefined,
                                transition: reducedMotion ? undefined : "all 220ms ease",
                            }}
                        />
                        <path
                            d={arcPath(cx, cy, yamaOuter + 8, yamaInner - 8, start, end)}
                            fill="transparent"
                            role="button"
                            tabIndex={0}
                            aria-label={`Jump to ${yama.name} kala`}
                            onMouseEnter={() => onKalaHover?.(yama.index)}
                            onMouseLeave={() => onKalaHover?.(null)}
                            onFocus={() => onKalaHover?.(yama.index)}
                            onBlur={() => onKalaHover?.(null)}
                            onClick={() => onKalaSelect?.(yama.index)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    onKalaSelect?.(yama.index);
                                }
                            }}
                            style={{ cursor: onKalaSelect ? "pointer" : "default" }}
                        />
                        <text
                            x={p.x}
                            y={p.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={12}
                            fontFamily="'Noto Serif Devanagari', serif"
                            fill="#fde68a"
                            transform={`rotate(${rotate + rotateAdjust} ${p.x} ${p.y})`}
                        >
                            {yama.devanagari}
                        </text>
                    </g>
                );
            })}
            <circle cx={cx} cy={cy} r={yamaOuter} fill="none" stroke="rgba(245,201,119,0.5)" strokeWidth={0.6} />
            <circle cx={cx} cy={cy} r={yamaInner} fill="none" stroke="rgba(245,201,119,0.5)" strokeWidth={0.6} />

            {/* 30 muhūrta ring */}
            {muhurtas.map((segment, i) => {
                const start = startOffset + i * segmentAngle;
                const end = start + segmentAngle;
                const mid = start + segmentAngle / 2;
                const meta = muhurtaNames[i];
                const isActive = segment.isActive;
                const isHovered = hoveredMuhurtaIndex === segment.index;
                const isHighlighted = isActive || isHovered;
                const fillId = isActive
                    ? "url(#vmd-active)"
                    : segment.phase === "day"
                        ? "url(#vmd-muhurta-day)"
                        : "url(#vmd-muhurta-night)";

                const devR = muhurtaOuter - 16;
                const latR = muhurtaInner + 14;
                const devPos = polar(cx, cy, devR, mid);
                const latPos = polar(cx, cy, latR, mid);
                const rotate = (mid * 180) / Math.PI + 90;
                const flipped = rotate > 90 && rotate < 270;
                const rotateAdjust = flipped ? 180 : 0;

                return (
                    <g key={segment.index}>
                        <path
                            d={arcPath(cx, cy, muhurtaOuter, muhurtaInner, start, end)}
                            fill={fillId}
                            stroke={isHighlighted ? "#fde68a" : "rgba(245,201,119,0.35)"}
                            strokeWidth={isHighlighted ? 1.6 : 0.5}
                            style={{
                                filter: isHighlighted ? "url(#vmd-glow)" : undefined,
                                transition: reducedMotion ? undefined : "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                            }}
                        />
                        {/* Live muhurta progress sweep — shows elapsed portion of active segment */}
                        {isActive && secondsOffset > 0 && handAngle > start && (
                            <path
                                d={arcPath(cx, cy, muhurtaOuter - 1, muhurtaInner + 1, start, Math.min(handAngle, end))}
                                fill="rgba(251, 191, 36, 0.12)"
                                stroke="rgba(251, 191, 36, 0.3)"
                                strokeWidth={0.5}
                                style={{ filter: "url(#vmd-soft-glow)" }}
                            />
                        )}
                        <path
                            d={arcPath(cx, cy, muhurtaOuter + 8, muhurtaInner - 8, start, end)}
                            fill="transparent"
                            role="button"
                            tabIndex={0}
                            aria-label={`Jump to muhūrta ${segment.index}`}
                            onMouseEnter={() => onMuhurtaHover?.(segment.index)}
                            onMouseLeave={() => onMuhurtaHover?.(null)}
                            onFocus={() => onMuhurtaHover?.(segment.index)}
                            onBlur={() => onMuhurtaHover?.(null)}
                            onClick={() => onMuhurtaSelect?.(segment.index)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    onMuhurtaSelect?.(segment.index);
                                }
                            }}
                            style={{ cursor: onMuhurtaSelect ? "pointer" : "default" }}
                        />
                        <text
                            x={devPos.x}
                            y={devPos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={12}
                            fill={isHighlighted ? "#fffbeb" : "rgba(253, 230, 138, 0.85)"}
                            fontFamily="'Noto Serif Devanagari', serif"
                            transform={`rotate(${rotate + rotateAdjust} ${devPos.x} ${devPos.y})`}
                            style={{
                                filter: isHighlighted ? "drop-shadow(0 0 3px rgba(255,251,235,0.7))" : undefined,
                            }}
                        >
                            {meta?.devanagari ?? ""}
                        </text>
                        <text
                            x={latPos.x}
                            y={latPos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={5.2}
                            letterSpacing="0"
                            fill={isHighlighted ? "#fff7ed" : "rgba(226, 200, 140, 0.65)"}
                            fontFamily="'Inter', sans-serif"
                            fontWeight={isHighlighted ? 700 : 500}
                            transform={`rotate(${rotate + rotateAdjust} ${latPos.x} ${latPos.y})`}
                        >
                            {meta?.name.toUpperCase() ?? `M${segment.index}`}
                        </text>
                    </g>
                );
            })}
            <circle cx={cx} cy={cy} r={muhurtaOuter} fill="none" stroke="rgba(245,201,119,0.55)" strokeWidth={0.6} />
            <circle cx={cx} cy={cy} r={muhurtaInner} fill="none" stroke="rgba(245,201,119,0.55)" strokeWidth={0.6} />

            {/* Tick ring (60 fine ticks) */}
            {Array.from({ length: 60 }, (_, i) => {
                const angle = startOffset + (i / 60) * TAU;
                const isMajor = i % 5 === 0;
                const from = polar(cx, cy, tickOuter, angle);
                const to = polar(cx, cy, isMajor ? tickInner - 3 : tickInner, angle);
                return (
                    <line
                        key={`tick-${i}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isMajor ? "rgba(245, 201, 119, 0.95)" : "rgba(245, 201, 119, 0.35)"}
                        strokeWidth={isMajor ? 1.2 : 0.6}
                    />
                );
            })}

            {/* Mandala core ring */}
            <circle
                cx={cx}
                cy={cy}
                r={coreRingOuter}
                fill="none"
                stroke="url(#vmd-brass-light)"
                strokeWidth={1.8}
            />
            <circle cx={cx} cy={cy} r={coreRingInner} fill="none" stroke="rgba(245,201,119,0.4)" strokeWidth={0.5} />
            <circle cx={cx} cy={cy} r={core} fill="url(#vmd-core)" stroke="rgba(245,201,119,0.35)" strokeWidth={0.8} />

            {/* 12 lotus petals around the mandala core */}
            {Array.from({ length: 12 }, (_, i) => {
                const angle = startOffset + (i / 12) * TAU;
                const tip = polar(cx, cy, coreRingInner - 2, angle);
                const baseLeft = polar(cx, cy, core + 2, angle - 0.13);
                const baseRight = polar(cx, cy, core + 2, angle + 0.13);
                return (
                    <path
                        key={`petal-${i}`}
                        d={`M ${baseLeft.x} ${baseLeft.y} Q ${tip.x} ${tip.y} ${baseRight.x} ${baseRight.y} Z`}
                        fill="rgba(245, 201, 119, 0.06)"
                        stroke="rgba(245, 201, 119, 0.28)"
                        strokeWidth={0.6}
                    />
                );
            })}

            {/* Star field inside mandala core */}
            {stars.map((s, i) => (
                <circle key={`star-${i}`} cx={s.x} cy={s.y} r={s.r} fill="#fef3c7" opacity={s.opacity}>
                    {!reducedMotion ? (
                        <animate
                            attributeName="opacity"
                            values={`${s.opacity};${s.opacity * 0.25};${s.opacity}`}
                            dur={`${3 + (i % 5)}s`}
                            repeatCount="indefinite"
                        />
                    ) : null}
                </circle>
            ))}

            {/* ॐ crown */}
            <text
                x={cx}
                y={cy - core * 0.45}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={core * 0.38}
                fill="url(#vmd-brass-light)"
                fontFamily="'Noto Serif Devanagari', serif"
                style={{ filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))" }}
            >
                ॐ
            </text>

            {/* Live time — split into fixed-position elements to prevent layout shift */}
            {(() => {
                const timeBaseline = cy + core * 0.05;
                const timeFontSize = core * 0.34;
                const secsFontSize = core * 0.18;
                const [hh = "00", mm = "00"] = currentLocalTime.split(":");
                const ss = String(secondsOffset).padStart(2, "0");
                // Fixed positions: HH right-aligned, colon centered, MM left-aligned, :SS further right
                const colonX = cx - core * 0.02;
                const hhX = colonX - core * 0.06;
                const mmX = colonX + core * 0.06;
                const secsColonX = mmX + core * 0.22;
                const timeFilter = "drop-shadow(0 0 6px rgba(255, 247, 237, 0.25))";
                const timeFont = "'Playfair Display', serif";
                const tabNums = { fontVariantNumeric: "tabular-nums" as const };
                return (
                    <g>
                        <text x={hhX} y={timeBaseline} textAnchor="end" dominantBaseline="alphabetic"
                            fontSize={timeFontSize} fill="#fff7ed" fontFamily={timeFont} fontWeight={700}
                            style={{ ...tabNums, filter: timeFilter }}>
                            {hh}
                        </text>
                        <text x={colonX} y={timeBaseline} textAnchor="middle" dominantBaseline="alphabetic"
                            fontSize={timeFontSize} fill="#fff7ed" fontFamily={timeFont} fontWeight={700}
                            style={{ filter: timeFilter }}>
                            :
                        </text>
                        <text x={mmX} y={timeBaseline} textAnchor="start" dominantBaseline="alphabetic"
                            fontSize={timeFontSize} fill="#fff7ed" fontFamily={timeFont} fontWeight={700}
                            style={{ ...tabNums, filter: timeFilter }}>
                            {mm}
                        </text>
                        <text x={secsColonX} y={timeBaseline} textAnchor="start" dominantBaseline="alphabetic"
                            fontSize={secsFontSize} fill="rgba(255,247,237,0.5)" fontFamily={timeFont} fontWeight={700}
                            style={tabNums}>
                            :{ss}
                        </text>
                    </g>
                );
            })()}

            {/* Active muhūrta name in Devanagari */}
            <text
                x={cx}
                y={cy + core * 0.22}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={core * 0.2}
                fill="#fde68a"
                fontFamily="'Noto Serif Devanagari', serif"
                fontWeight={600}
            >
                {muhurtaNames[currentMuhurtaIndex - 1]?.devanagari ?? ""}
            </text>

            {/* Muhūrta index + deity */}
            <text
                x={cx}
                y={cy + core * 0.44}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={core * 0.1}
                fill="rgba(253, 230, 138, 0.78)"
                letterSpacing="3"
                fontFamily="'Inter', sans-serif"
                fontWeight={600}
            >
                {`MUHŪRTA ${String(currentMuhurtaIndex).padStart(2, "0")} · ${(muhurtaNames[currentMuhurtaIndex - 1]?.name ?? "").toUpperCase()}`}
            </text>
            <text
                x={cx}
                y={cy + core * 0.6}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={core * 0.085}
                fill="rgba(245, 201, 119, 0.55)"
                letterSpacing="2"
                fontFamily="'Inter', sans-serif"
            >
                {`PRESIDED BY ${(muhurtaNames[currentMuhurtaIndex - 1]?.deity ?? "").toUpperCase()}`}
            </text>

            {/* Time hand (present moment) */}
            {(() => {
                const tip = polar(cx, cy, muhurtaInner - 4, handAngle);
                const base = polar(cx, cy, core + 4, handAngle);
                return (
                    <g style={{ filter: "url(#vmd-soft-glow)" }}>
                        <line
                            x1={base.x}
                            y1={base.y}
                            x2={tip.x}
                            y2={tip.y}
                            stroke="url(#vmd-brass-light)"
                            strokeWidth={3}
                            strokeLinecap="round"
                            style={{ transition: reducedMotion ? undefined : "all 220ms cubic-bezier(0.16,1,0.3,1)" }}
                        />
                        <circle
                            cx={tip.x}
                            cy={tip.y}
                            r={4}
                            fill="#fff7ed"
                            style={{ transition: reducedMotion ? undefined : "all 220ms cubic-bezier(0.16,1,0.3,1)" }}
                        >
                            {!reducedMotion ? <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" /> : null}
                        </circle>
                    </g>
                );
            })()}

            {/* Center pivot */}
            <circle cx={cx} cy={cy} r={6} fill="url(#vmd-brass-light)" />
            <circle cx={cx} cy={cy} r={3} fill="#fff7ed" />

            {/* Sun medallion (left — दिन) */}
            <g transform={`translate(${sunMedallionX}, ${cy})`}>
                <circle r={medallionR + 2} fill="#2d1808" stroke="url(#vmd-brass)" strokeWidth={2} />
                <circle r={medallionR - 4} fill="url(#vmd-sun)" />
                {/* Sun rays */}
                {Array.from({ length: 12 }, (_, i) => {
                    const a = (i / 12) * TAU;
                    const r1 = medallionR - 6;
                    const r2 = medallionR - 1;
                    return (
                        <line
                            key={`sray-${i}`}
                            x1={Math.cos(a) * r1}
                            y1={Math.sin(a) * r1}
                            x2={Math.cos(a) * r2}
                            y2={Math.sin(a) * r2}
                            stroke="#fef3c7"
                            strokeWidth={1}
                            opacity={0.8}
                        />
                    );
                })}
                <circle r={6} fill="#fde68a" />
                <text
                    y={medallionR + 14}
                    textAnchor="middle"
                    fontSize={11}
                    fill="#fde68a"
                    fontFamily="'Noto Serif Devanagari', serif"
                >
                    दिन
                </text>
                <text
                    y={medallionR + 25}
                    textAnchor="middle"
                    fontSize={6}
                    fill="rgba(245,201,119,0.7)"
                    fontFamily="'Inter', sans-serif"
                    letterSpacing="1.5"
                >
                    DAY
                </text>
            </g>

            {/* Moon medallion (right — रात्रि) */}
            <g transform={`translate(${moonMedallionX}, ${cy})`}>
                <circle r={medallionR + 2} fill="#0f0a1e" stroke="url(#vmd-brass)" strokeWidth={2} />
                <circle r={medallionR - 4} fill="url(#vmd-moon)" />
                {/* Crescent overlay */}
                <path
                    d={`M -4,-${medallionR - 10} A ${medallionR - 10} ${medallionR - 10} 0 1 0 -4,${medallionR - 10} A ${(medallionR - 10) * 0.7} ${(medallionR - 10) * 0.7} 0 1 1 -4,-${medallionR - 10} Z`}
                    fill="#0f0a1e"
                    opacity={0.7}
                />
                {/* A few stars in the moon halo */}
                {[
                    { x: 8, y: -8, r: 0.8 },
                    { x: 10, y: 2, r: 0.6 },
                    { x: 6, y: 10, r: 0.7 },
                ].map((s, i) => (
                    <circle key={`mstar-${i}`} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={0.9} />
                ))}
                <text
                    y={medallionR + 14}
                    textAnchor="middle"
                    fontSize={11}
                    fill="#c7d2fe"
                    fontFamily="'Noto Serif Devanagari', serif"
                >
                    रात्रि
                </text>
                <text
                    y={medallionR + 25}
                    textAnchor="middle"
                    fontSize={6}
                    fill="rgba(199,210,254,0.7)"
                    fontFamily="'Inter', sans-serif"
                    letterSpacing="1.5"
                >
                    NIGHT
                </text>
            </g>
        </svg>
    );
}

/**
 * Diya — a small brass oil-lamp with a flickering flame. Used at the top
 * corners of the dial frame to evoke the crown diyas on traditional
 * temple clocks.
 */
function Diya({ reducedMotion = false }: { reducedMotion?: boolean }) {
    return (
        <g>
            {/* Flame halo */}
            <ellipse cx={0} cy={-12} rx={6} ry={10} fill="url(#vmd-diya-flame)">
                {!reducedMotion ? <animate attributeName="ry" values="10;12;10" dur="2.4s" repeatCount="indefinite" /> : null}
                {!reducedMotion ? <animate attributeName="opacity" values="1;0.85;1" dur="2.4s" repeatCount="indefinite" /> : null}
            </ellipse>
            {/* Flame inner */}
            <ellipse cx={0} cy={-10} rx={2.5} ry={5} fill="#fef3c7">
                {!reducedMotion ? <animate attributeName="ry" values="5;6;5" dur="2.4s" repeatCount="indefinite" /> : null}
            </ellipse>
            {/* Wick */}
            <line x1={0} y1={-4} x2={0} y2={0} stroke="#1c1006" strokeWidth={1} />
            {/* Lamp body */}
            <path
                d="M -10,0 Q -12,4 -8,6 L 8,6 Q 12,4 10,0 Z"
                fill="url(#vmd-brass)"
                stroke="#2d1808"
                strokeWidth={0.6}
            />
            <path
                d="M -8,6 L 8,6 L 6,9 L -6,9 Z"
                fill="#6b3f12"
                stroke="#2d1808"
                strokeWidth={0.5}
            />
        </g>
    );
}
