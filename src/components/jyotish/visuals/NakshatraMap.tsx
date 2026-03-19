"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { nakshatras } from "@/data/nakshatras";
import { NAKSHATRA_ICONS } from "@/components/jyotish/icons/nakshatras";

/* ───────────────────────── Constants ───────────────────────── */

interface NakshatraMapProps {
  activeSlug?: string;
  size?: number;
  compact?: boolean;
}

const GANA_COLORS: Record<string, { primary: string; glow: string }> = {
  Deva: { primary: "#facc15", glow: "rgba(250, 204, 21, 0.4)" },
  Manushya: { primary: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)" },
  Rakshasa: { primary: "#ef4444", glow: "rgba(239, 68, 68, 0.4)" },
};

/* ───────────────────────── Component ───────────────────────── */

export function NakshatraMap({ activeSlug, size = 460, compact = false }: NakshatraMapProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 10;
  const innerR = outerR * 0.55;
  const labelR = (outerR + innerR) / 2;
  const segmentAngle = 360 / 27;

  // Generate constellation star patterns for the center
  const constellationStars = useMemo(() => {
    const stars: { x: number; y: number; r: number; opacity: number; group: number; delay: number }[] = [];
    // Create 9 "constellation" clusters of 3-5 stars each
    for (let g = 0; g < 9; g++) {
      const baseAngle = (g / 9) * Math.PI * 2;
      const baseDist = innerR * 0.25 + ((g * 7919) % 100) / 100 * innerR * 0.25;
      const starCount = 3 + ((g * 31) % 3);

      for (let s = 0; s < starCount; s++) {
        const offsetAngle = baseAngle + ((s * 2654 + g * 8191) % 1000) / 1000 * 0.5 - 0.25;
        const offsetDist = baseDist + ((s * 4271 + g * 3137) % 1000) / 1000 * innerR * 0.12;
        stars.push({
          x: cx + Math.cos(offsetAngle) * offsetDist,
          y: cy + Math.sin(offsetAngle) * offsetDist,
          r: 0.8 + ((s * 7 + g * 13) % 10) / 10 * 1.2,
          opacity: 0.3 + ((s * 11 + g * 17) % 10) / 10 * 0.5,
          group: g,
          delay: g * 0.4 + s * 0.2,
        });
      }
    }
    return stars;
  }, [cx, cy, innerR]);

  // Constellation connecting lines
  const constellationLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; group: number }[] = [];
    const groups: Record<number, typeof constellationStars> = {};
    constellationStars.forEach((s) => {
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(s);
    });
    Object.values(groups).forEach((group) => {
      for (let i = 0; i < group.length - 1; i++) {
        lines.push({
          x1: group[i].x,
          y1: group[i].y,
          x2: group[i + 1].x,
          y2: group[i + 1].y,
          group: group[0].group,
        });
      }
    });
    return lines;
  }, [constellationStars]);

  // Background scattered stars
  const bgStars = useMemo(() => {
    const stars: { x: number; y: number; r: number; opacity: number; twinkleDelay: number }[] = [];
    for (let i = 0; i < 120; i++) {
      const seed1 = ((i * 7919 + 104729) % 10000) / 10000;
      const seed2 = ((i * 6271 + 32749) % 10000) / 10000;
      const seed3 = ((i * 4513 + 65521) % 10000) / 10000;
      const angle = seed1 * Math.PI * 2;
      const dist = innerR * 0.05 + seed2 * innerR * 0.9;
      stars.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: 0.2 + seed3 * 0.6,
        opacity: 0.08 + seed3 * 0.15,
        twinkleDelay: seed1 * 5,
      });
    }
    return stars;
  }, [cx, cy, innerR]);

  function segmentPath(index: number) {
    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
    const x1 = cx + outerR * Math.cos(startAngle);
    const y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);
    const x3 = cx + innerR * Math.cos(endAngle);
    const y3 = cy + innerR * Math.sin(endAngle);
    const x4 = cx + innerR * Math.cos(startAngle);
    const y4 = cy + innerR * Math.sin(startAngle);
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 0 ${x4} ${y4} Z`;
  }

  function labelPos(index: number) {
    const angle = ((index + 0.5) * segmentAngle - 90) * (Math.PI / 180);
    return { x: cx + labelR * Math.cos(angle), y: cy + labelR * Math.sin(angle) };
  }

  function labelRotation(index: number) {
    const angle = (index + 0.5) * segmentAngle;
    return angle > 90 && angle < 270 ? angle + 180 : angle;
  }

  if (!mounted) {
    return (
      <div
        className="mx-auto rounded-2xl bg-black flex items-center justify-center text-muted-foreground text-sm"
        style={{ width: size, height: size, maxWidth: "100%" }}
      >
        <div className="w-6 h-6 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
      </div>
    );
  }

  const activeNak = nakshatras.find((n) => n.slug === (hovered || activeSlug));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="mx-auto max-w-full h-auto"
      >
        <defs>
          {/* Glow filters */}
          {Object.entries(GANA_COLORS).map(([gana, { primary }]) => (
            <filter key={gana} id={`nak-glow-${gana}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feFlood floodColor={primary} floodOpacity="0.4" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="shadow" />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}

          <radialGradient id="nak-center-void" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="80%" stopColor="#020617" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* Background */}
        <circle cx={cx} cy={cy} r={outerR + 8} fill="#020617" />

        {/* Fine degree ticks */}
        {Array.from({ length: 108 }).map((_, i) => {
          const angle = (i / 108) * Math.PI * 2 - Math.PI / 2;
          const isMajor = i % 4 === 0;
          return (
            <line
              key={`ntick-${i}`}
              x1={cx + (outerR + 1) * Math.cos(angle)}
              y1={cy + (outerR + 1) * Math.sin(angle)}
              x2={cx + (outerR + (isMajor ? 5 : 3)) * Math.cos(angle)}
              y2={cy + (outerR + (isMajor ? 5 : 3)) * Math.sin(angle)}
              stroke="#334155"
              strokeWidth={isMajor ? 0.8 : 0.3}
              strokeOpacity={isMajor ? 0.3 : 0.12}
            />
          );
        })}

        {/* Background scattered stars with twinkle */}
        {bgStars.map((star, i) => (
          <circle key={`bgstar-${i}`} cx={star.x} cy={star.y} r={star.r} fill="#cbd5e1" opacity={star.opacity}>
            <animate
              attributeName="opacity"
              values={`${star.opacity};${star.opacity * 0.2};${star.opacity}`}
              dur={`${3 + star.twinkleDelay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Constellation connecting lines */}
        {constellationLines.map((line, i) => (
          <line
            key={`cline-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#475569"
            strokeWidth={0.5}
            strokeOpacity={0.2}
            strokeDasharray="2,3"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.2;0.08;0.2"
              dur={`${4 + line.group * 0.5}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Constellation stars */}
        {constellationStars.map((star, i) => (
          <g key={`cstar-${i}`}>
            <circle cx={star.x} cy={star.y} r={star.r} fill="#facc15" opacity={star.opacity}>
              <animate
                attributeName="opacity"
                values={`${star.opacity};${star.opacity * 0.4};${star.opacity}`}
                dur={`${2.5 + star.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={star.x} cy={star.y} r={star.r * 2.5} fill="#facc15" opacity={star.opacity * 0.15}>
              <animate
                attributeName="opacity"
                values={`${star.opacity * 0.15};${star.opacity * 0.05};${star.opacity * 0.15}`}
                dur={`${2.5 + star.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Nakshatra segments */}
        {nakshatras.map((nak, i) => {
          const isActive = nak.slug === activeSlug;
          const isHover = nak.slug === hovered;
          const highlighted = isActive || isHover;
          const colors = GANA_COLORS[nak.gana] || { primary: "#888", glow: "rgba(136,136,136,0.3)" };
          const pos = labelPos(i);
          const rotation = labelRotation(i);

          return (
            <Link key={nak.slug} href={`/jyotish/nakshatras/${nak.slug}`}>
              <g
                onMouseEnter={() => setHovered(nak.slug)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
                style={{ filter: highlighted ? `url(#nak-glow-${nak.gana})` : "none" }}
              >
                <path
                  d={segmentPath(i)}
                  fill={colors.primary}
                  fillOpacity={isActive ? 0.25 : isHover ? 0.12 : 0.02}
                  stroke={colors.primary}
                  strokeWidth={isActive ? 2 : isHover ? 1.5 : 0.4}
                  strokeOpacity={highlighted ? 0.9 : 0.15}
                  style={{ transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />

                {/* Active glow dot */}
                {isActive && (
                  <g>
                    <circle cx={pos.x} cy={pos.y} r={3} fill={colors.primary} opacity={0.9}>
                      <animate
                        attributeName="r"
                        values="3;4.5;3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.9;0.5;0.9"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx={pos.x} cy={pos.y} r={7} fill={colors.primary} opacity={0.15}>
                      <animate
                        attributeName="r"
                        values="7;10;7"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.15;0.05;0.15"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                )}
                {(() => {
                  const iconSrc = NAKSHATRA_ICONS[nak.slug];
                  const iconSize = size > 380 ? 12 : 9;
                  return iconSrc ? (
                    <image
                      href={iconSrc}
                      x={pos.x - iconSize / 2}
                      y={pos.y - iconSize / 2 - (compact ? 0 : 4)}
                      width={iconSize}
                      height={iconSize}
                      transform={`rotate(${rotation}, ${pos.x}, ${pos.y})`}
                      style={{
                        opacity: isActive || isHover ? 0.9 : 0.4,
                        transition: "opacity 0.3s",
                      }}
                    />
                  ) : null;
                })()}
                {!compact && (
                  <text
                    x={pos.x}
                    y={pos.y + 6}
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${rotation}, ${pos.x}, ${pos.y})`}
                    fontSize={size > 380 ? 7 : 5.5}
                    fill={highlighted ? "#e2e8f0" : "#64748b"}
                    fontWeight={highlighted ? "600" : "400"}
                    letterSpacing="0.3"
                    style={{
                      opacity: isActive || isHover ? 1 : 0.5,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {nak.name}
                  </text>
                )}
              </g>
            </Link>
          );
        })}

        {/* Inner void */}
        <circle cx={cx} cy={cy} r={innerR - 4} fill="url(#nak-center-void)" />
        <circle cx={cx} cy={cy} r={innerR - 4} fill="none" stroke="#1e293b" strokeWidth={0.8} />

        {/* Center info */}
        <text x={cx} y={cy - 18} textAnchor="middle" fontSize={10} fill="#94a3b8" letterSpacing="1.5">
          {activeNak ? activeNak.name.toUpperCase() : "27 NAKSHATRAS"}
        </text>
        <text
          x={cx}
          y={cy + 2}
          textAnchor="middle"
          fontSize={9}
          fill={activeNak ? (GANA_COLORS[activeNak.gana]?.primary || "#f97316") : "#f97316"}
          style={{
            filter: activeNak
              ? `drop-shadow(0 0 4px ${GANA_COLORS[activeNak.gana]?.glow || "rgba(249,115,22,0.4)"})`
              : "none",
          }}
        >
          {activeNak ? activeNak.rulingGraha : "LUNAR MANSIONS"}
        </text>
        {activeNak && (
          <text x={cx} y={cy + 18} textAnchor="middle" fontSize={8} fill="#475569">
            {activeNak.gana} gana
          </text>
        )}

        {/* Outer decorative ring */}
        <circle cx={cx} cy={cy} r={outerR + 2} fill="none" stroke="#1e293b" strokeWidth={0.5} />
      </svg>
    </motion.div>
  );
}
