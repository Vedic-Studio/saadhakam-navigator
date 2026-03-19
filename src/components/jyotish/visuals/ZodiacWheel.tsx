"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { rashis } from "@/data/rashis";
import { RASHI_ICONS } from "@/components/jyotish/icons/rashis";

/* ───────────────────────── Constants ───────────────────────── */

const RASHI_COLORS: Record<string, { primary: string; glow: string }> = {
  Agni: { primary: "#ef4444", glow: "rgba(239, 68, 68, 0.4)" },
  Prithvi: { primary: "#84cc16", glow: "rgba(132, 204, 22, 0.4)" },
  Vayu: { primary: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)" },
  Jala: { primary: "#818cf8", glow: "rgba(129, 140, 248, 0.4)" },
};

const RASHI_SYMBOLS: Record<string, string> = {
  mesha: "\u2648", vrishabha: "\u2649", mithuna: "\u264A", karka: "\u264B",
  simha: "\u264C", kanya: "\u264D", tula: "\u264E", vrischika: "\u264F",
  dhanu: "\u2650", makara: "\u2651", kumbha: "\u2652", meena: "\u2653",
};

interface ZodiacWheelProps {
  activeSlug?: string;
  size?: number;
}

/* ───────────────────────── Star Renderer ───────────────────────── */

function generateStars(count: number, cx: number, cy: number, maxR: number) {
  const stars: { x: number; y: number; r: number; opacity: number; delay: number }[] = [];
  for (let i = 0; i < count; i++) {
    const seed1 = ((i * 7919 + 104729) % 10000) / 10000;
    const seed2 = ((i * 6271 + 32749) % 10000) / 10000;
    const seed3 = ((i * 4513 + 65521) % 10000) / 10000;
    const seed4 = ((i * 3571 + 91283) % 10000) / 10000;
    const angle = seed1 * Math.PI * 2;
    const dist = maxR * 0.1 + seed2 * maxR * 0.85;
    stars.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      r: 0.3 + seed3 * 1.0,
      opacity: 0.15 + seed4 * 0.35,
      delay: seed1 * 4,
    });
  }
  return stars;
}

/* ───────────────────────── Component ───────────────────────── */

export function ZodiacWheel({ activeSlug, size = 420 }: ZodiacWheelProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => setMounted(true), []);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 8;
  const innerR = outerR * 0.52;
  const labelR = (outerR + innerR) / 2;
  const decorR = outerR + 4;

  const stars = useCallback(() => generateStars(80, cx, cy, innerR * 0.9), [cx, cy, innerR]);

  function segmentPath(index: number, rOuter: number, rInner: number) {
    const startAngle = (index * 30 - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * 30 - 90) * (Math.PI / 180);
    const x1 = cx + rOuter * Math.cos(startAngle);
    const y1 = cy + rOuter * Math.sin(startAngle);
    const x2 = cx + rOuter * Math.cos(endAngle);
    const y2 = cy + rOuter * Math.sin(endAngle);
    const x3 = cx + rInner * Math.cos(endAngle);
    const y3 = cy + rInner * Math.sin(endAngle);
    const x4 = cx + rInner * Math.cos(startAngle);
    const y4 = cy + rInner * Math.sin(startAngle);
    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;
  }

  function labelPos(index: number) {
    const angle = ((index + 0.5) * 30 - 90) * (Math.PI / 180);
    return { x: cx + labelR * Math.cos(angle), y: cy + labelR * Math.sin(angle) };
  }

  if (!mounted) {
    return (
      <div
        className="mx-auto rounded-2xl bg-black flex items-center justify-center text-muted-foreground text-sm"
        style={{ width: size, height: size, maxWidth: "100%" }}
      >
        <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const activeRashi = rashis.find((r) => r.slug === (hovered || activeSlug));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="mx-auto max-w-full h-auto"
      >
        <defs>
          {/* Glow filters for each element */}
          {Object.entries(RASHI_COLORS).map(([element, { primary }]) => (
            <filter key={element} id={`glow-${element}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor={primary} floodOpacity="0.5" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="shadow" />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}

          {/* Radial gradient for the center void */}
          <radialGradient id="center-void" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="70%" stopColor="#020617" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
          </radialGradient>

          {/* Star twinkle animation */}
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>

        {/* Dark background circle */}
        <circle cx={cx} cy={cy} r={outerR + 6} fill="#020617" />

        {/* Outer decorative ring — fine ticks for degrees */}
        {Array.from({ length: 72 }).map((_, i) => {
          const angle = (i / 72) * Math.PI * 2 - Math.PI / 2;
          const isMajor = i % 6 === 0;
          const tickInner = isMajor ? outerR - 2 : outerR;
          const tickOuter = outerR + (isMajor ? 5 : 3);
          return (
            <line
              key={`tick-${i}`}
              x1={cx + tickInner * Math.cos(angle)}
              y1={cy + tickInner * Math.sin(angle)}
              x2={cx + tickOuter * Math.cos(angle)}
              y2={cy + tickOuter * Math.sin(angle)}
              stroke="#334155"
              strokeWidth={isMajor ? 1 : 0.5}
              strokeOpacity={isMajor ? 0.4 : 0.15}
            />
          );
        })}

        {/* Starfield in center */}
        {stars().map((star, i) => (
          <circle
            key={`star-${i}`}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#e2e8f0"
            opacity={star.opacity}
          >
            <animate
              attributeName="opacity"
              values={`${star.opacity};${star.opacity * 0.3};${star.opacity}`}
              dur={`${2 + star.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Zodiac segments */}
        {rashis.map((rashi, i) => {
          const isActive = rashi.slug === activeSlug;
          const isHover = rashi.slug === hovered;
          const highlighted = isActive || isHover;
          const colors = RASHI_COLORS[rashi.element] || { primary: "#666", glow: "rgba(100,100,100,0.3)" };
          const pos = labelPos(i);
          const iconSrc = RASHI_ICONS[rashi.slug];
          const iconSize = size > 300 ? 22 : 16;

          return (
            <Link key={rashi.slug} href={`/jyotish/rashis/${rashi.slug}`}>
              <g
                onMouseEnter={() => setHovered(rashi.slug)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
                style={{ filter: highlighted ? `url(#glow-${rashi.element})` : "none" }}
              >
                {/* Segment fill */}
                <path
                  d={segmentPath(i, outerR, innerR)}
                  fill={colors.primary}
                  fillOpacity={isActive ? 0.25 : isHover ? 0.15 : 0.03}
                  stroke={colors.primary}
                  strokeWidth={isActive ? 2 : isHover ? 1.5 : 0.5}
                  strokeOpacity={highlighted ? 0.9 : 0.2}
                  style={{ transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />

                {iconSrc && (
                  <image
                    href={iconSrc}
                    x={pos.x - iconSize / 2}
                    y={pos.y - iconSize / 2 - 10}
                    width={iconSize}
                    height={iconSize}
                    style={{
                      opacity: isActive || isHover ? 1 : 0.7,
                      transition: "opacity 0.3s",
                    }}
                  />
                )}
                {/* Zodiac symbol */}
                <text
                  x={pos.x}
                  y={pos.y + 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={size > 300 ? 14 : 11}
                  fill={highlighted ? colors.primary : "#94a3b8"}
                  style={{
                    transition: "all 0.3s ease",
                    filter: highlighted ? `drop-shadow(0 0 4px ${colors.glow})` : "none",
                  }}
                >
                  {RASHI_SYMBOLS[rashi.slug] || ""}
                </text>

                {/* Rashi name */}
                <text
                  x={pos.x}
                  y={pos.y + 14}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={size > 300 ? 8 : 6.5}
                  fill={highlighted ? "#e2e8f0" : "#64748b"}
                  fontWeight={highlighted ? "600" : "400"}
                  letterSpacing="0.5"
                  style={{ transition: "all 0.3s ease" }}
                >
                  {rashi.name.toUpperCase()}
                </text>
              </g>
            </Link>
          );
        })}

        {/* Inner circle — dark void */}
        <circle cx={cx} cy={cy} r={innerR - 2} fill="url(#center-void)" />
        <circle cx={cx} cy={cy} r={innerR - 2} fill="none" stroke="#1e293b" strokeWidth={1} />

        {/* Center content */}
        <text
          x={cx}
          y={cy - 14}
          textAnchor="middle"
          fontSize={11}
          fill="#94a3b8"
          letterSpacing="1.5"
        >
          {activeRashi ? activeRashi.name.toUpperCase() : "RASHI CHAKRA"}
        </text>
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontSize={activeRashi ? 22 : 14}
          fill={activeRashi ? (RASHI_COLORS[activeRashi.element]?.primary || "#f97316") : "#f97316"}
          style={{
            filter: activeRashi
              ? `drop-shadow(0 0 6px ${RASHI_COLORS[activeRashi.element]?.glow || "rgba(249, 115, 22, 0.5)"})`
              : "none",
          }}
        >
          {activeRashi ? (RASHI_SYMBOLS[activeRashi.slug] || "") : "\u2609"}
        </text>
        <text
          x={cx}
          y={cy + 22}
          textAnchor="middle"
          fontSize={8}
          fill="#475569"
          letterSpacing="0.5"
        >
          {activeRashi ? activeRashi.element : "12 SIGNS"}
        </text>

        {/* Outer ring — thin decorative */}
        <circle cx={cx} cy={cy} r={outerR + 2} fill="none" stroke="#1e293b" strokeWidth={0.5} />
      </svg>
    </motion.div>
  );
}
