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

import { useMemo } from "react";

interface MuhurtaSegment {
    index: number;
    startTime: string;
    endTime: string;
    phase: "day" | "night";
    isActive: boolean;
}

interface VedicMuhurtaDialProps {
    muhurtas: MuhurtaSegment[];
    currentLocalTime: string;
    sunriseTime: string;
    sunsetTime: string;
    currentMuhurtaIndex: number;
    muhurtaNames: { name: string; devanagari: string; deity: string }[];
    size?: number;
}

const TAU = Math.PI * 2;

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

function timeToMinutes(time: string) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

// Four day-periods. Arc spans are approximate equal quarters of the civil day.
const CATURYAMA = [
    { name: "Prātaḥ", devanagari: "प्रातःकाल" },
    { name: "Madhyāhna", devanagari: "मध्याह्न" },
    { name: "Sāyam", devanagari: "सायंकाल" },
    { name: "Niśītha", devanagari: "निशीथ" },
];

export function VedicMuhurtaDial({
    muhurtas,
    currentLocalTime,
    sunriseTime,
    sunsetTime,
    currentMuhurtaIndex,
    muhurtaNames,
    size = 620,
}: VedicMuhurtaDialProps) {
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

    // Time hand rotation based on fraction of elapsed minutes since sunrise.
    const handAngle = useMemo(() => {
        const nowMin = timeToMinutes(currentLocalTime);
        const sunriseMin = timeToMinutes(sunriseTime);
        let delta = nowMin - sunriseMin;
        if (delta < 0) delta += 1440;
        const fraction = (delta % 1440) / 1440;
        return startOffset + fraction * TAU;
    }, [currentLocalTime, sunriseTime, startOffset]);

    // Sunset fraction (for the moon marker and caturyāma anchoring).
    const sunsetFraction = useMemo(() => {
        const sunriseMin = timeToMinutes(sunriseTime);
        const sunsetMin = timeToMinutes(sunsetTime);
        let delta = sunsetMin - sunriseMin;
        if (delta <= 0) delta += 1440;
        return delta / 1440;
    }, [sunriseTime, sunsetTime]);

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
    const caturyamaArcs = useMemo(() => {
        const half = sunsetFraction / 2;
        const nightHalf = (1 - sunsetFraction) / 2;
        const p0 = 0;
        const p1 = half;
        const p2 = sunsetFraction;
        const p3 = sunsetFraction + nightHalf;
        const p4 = 1;
        return [
            { ...CATURYAMA[0], start: p0, end: p1, phase: "day" as const },
            { ...CATURYAMA[1], start: p1, end: p2, phase: "day" as const },
            { ...CATURYAMA[2], start: p2, end: p3, phase: "night" as const },
            { ...CATURYAMA[3], start: p3, end: p4, phase: "night" as const },
        ];
    }, [sunsetFraction]);

    // Sun / moon medallion positions — outside the dial, 9 o'clock & 3 o'clock
    const sunMedallionX = cx - frameOuter - 6;
    const moonMedallionX = cx + frameOuter + 6;
    const medallionR = 24;

    return (
        <svg
            viewBox={`-${medallionR + 18} 0 ${size + 2 * (medallionR + 18)} ${size + 30}`}
            width="100%"
            height="100%"
            className="mx-auto max-w-full h-auto drop-shadow-[0_0_60px_rgba(245,158,11,0.22)]"
            aria-label="Vedic muhūrta dial with 30 segments from sunrise to sunrise"
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
                <Diya />
            </g>
            <g transform={`translate(${cx + frameOuter * 0.72}, 18)`}>
                <Diya />
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
                            stroke="rgba(245,201,119,0.4)"
                            strokeWidth={0.8}
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
                            stroke={isActive ? "#fde68a" : "rgba(245,201,119,0.35)"}
                            strokeWidth={isActive ? 1.6 : 0.5}
                            style={{
                                filter: isActive ? "url(#vmd-glow)" : undefined,
                                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                            }}
                        />
                        <text
                            x={devPos.x}
                            y={devPos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={12}
                            fill={isActive ? "#fffbeb" : "rgba(253, 230, 138, 0.85)"}
                            fontFamily="'Noto Serif Devanagari', serif"
                            transform={`rotate(${rotate + rotateAdjust} ${devPos.x} ${devPos.y})`}
                            style={{
                                filter: isActive ? "drop-shadow(0 0 3px rgba(255,251,235,0.7))" : undefined,
                            }}
                        >
                            {meta?.devanagari ?? ""}
                        </text>
                        <text
                            x={latPos.x}
                            y={latPos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={6.6}
                            letterSpacing="1"
                            fill={isActive ? "#fff7ed" : "rgba(226, 200, 140, 0.65)"}
                            fontFamily="'Inter', sans-serif"
                            fontWeight={isActive ? 700 : 500}
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
                    <animate
                        attributeName="opacity"
                        values={`${s.opacity};${s.opacity * 0.25};${s.opacity}`}
                        dur={`${3 + (i % 5)}s`}
                        repeatCount="indefinite"
                    />
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

            {/* Live time */}
            <text
                x={cx}
                y={cy - core * 0.02}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={core * 0.34}
                fill="#fff7ed"
                fontFamily="'Playfair Display', serif"
                fontWeight={700}
                letterSpacing="2"
                style={{ filter: "drop-shadow(0 0 6px rgba(255, 247, 237, 0.25))" }}
            >
                {currentLocalTime}
            </text>

            {/* Active muhūrta name in Devanagari */}
            <text
                x={cx}
                y={cy + core * 0.3}
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
                y={cy + core * 0.52}
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
                y={cy + core * 0.68}
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
                        />
                        <circle cx={tip.x} cy={tip.y} r={4} fill="#fff7ed">
                            <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
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
function Diya() {
    return (
        <g>
            {/* Flame halo */}
            <ellipse cx={0} cy={-12} rx={6} ry={10} fill="url(#vmd-diya-flame)">
                <animate attributeName="ry" values="10;12;10" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.85;1" dur="2.4s" repeatCount="indefinite" />
            </ellipse>
            {/* Flame inner */}
            <ellipse cx={0} cy={-10} rx={2.5} ry={5} fill="#fef3c7">
                <animate attributeName="ry" values="5;6;5" dur="2.4s" repeatCount="indefinite" />
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
