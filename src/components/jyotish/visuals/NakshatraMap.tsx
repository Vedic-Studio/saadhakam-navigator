"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { nakshatras } from "@/data/nakshatras";
import { NAKSHATRA_ICONS } from "@/components/jyotish/icons/nakshatras";

interface NakshatraMapProps {
  activeSlug?: string;
  size?: number;
  compact?: boolean;
}

const GANA_COLORS: Record<string, string> = {
  Deva: "#facc15",
  Manushya: "#38bdf8",
  Rakshasa: "#ef4444",
};

export function NakshatraMap({ activeSlug, size = 440, compact = false }: NakshatraMapProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 6;
  const innerR = outerR * 0.6;
  const labelR = (outerR + innerR) / 2;
  const segmentAngle = 360 / 27;

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
        className="mx-auto rounded-2xl bg-slate-950/20 flex items-center justify-center text-muted-foreground text-sm"
        style={{ width: size, height: size, maxWidth: "100%" }}
      >
        Loading map...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="mx-auto max-w-full h-auto"
      >
        {/* Decorative starfield dots — deterministic pseudo-random */}
        {Array.from({ length: 60 }).map((_, i) => {
          const seed = ((i * 7919 + 104729) % 1000) / 1000;
          const seed2 = ((i * 6271 + 32749) % 1000) / 1000;
          const seed3 = ((i * 4513 + 65521) % 1000) / 1000;
          const angle = (i / 60) * Math.PI * 2;
          const r = innerR * 0.3 + seed * innerR * 0.2;
          return (
            <circle
              key={`star-${i}`}
              cx={cx + r * Math.cos(angle)}
              cy={cy + r * Math.sin(angle)}
              r={0.8 + seed2 * 1.2}
              fill="currentColor"
              opacity={0.1 + seed3 * 0.15}
            />
          );
        })}

        {nakshatras.map((nak, i) => {
          const isActive = nak.slug === activeSlug;
          const isHover = nak.slug === hovered;
          const color = GANA_COLORS[nak.gana] || "#888";
          const pos = labelPos(i);
          const rotation = labelRotation(i);

          return (
            <Link key={nak.slug} href={`/jyotish/nakshatras/${nak.slug}`}>
              <g
                onMouseEnter={() => setHovered(nak.slug)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <path
                  d={segmentPath(i)}
                  fill={isActive || isHover ? color : "transparent"}
                  fillOpacity={isActive ? 0.25 : isHover ? 0.12 : 0}
                  stroke={color}
                  strokeWidth={isActive ? 2 : 0.5}
                  strokeOpacity={isActive || isHover ? 0.8 : 0.25}
                  style={{ transition: "all 0.3s ease" }}
                />
                {/* Active nakshatra gets a glow dot */}
                {isActive && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={3}
                    fill={color}
                    opacity={0.8}
                    className="animate-pulse-slow"
                  />
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
                    className="fill-current text-foreground"
                    fontSize={size > 380 ? 6 : 5}
                    style={{
                      opacity: isActive || isHover ? 1 : 0.5,
                      transition: "opacity 0.3s",
                    }}
                  >
                    {nak.name}
                  </text>
                )}
              </g>
            </Link>
          );
        })}

        {/* Center info */}
        <circle cx={cx} cy={cy} r={innerR - 4} fill="none" stroke="currentColor" strokeOpacity={0.08} />
        <text x={cx} y={cy - 10} textAnchor="middle" className="fill-current text-muted-foreground" fontSize={10}>
          {hovered ? nakshatras.find((n) => n.slug === hovered)?.name : "27 Nakshatras"}
        </text>
        <text x={cx} y={cy + 6} textAnchor="middle" className="fill-current text-orange-400" fontSize={8}>
          {hovered
            ? nakshatras.find((n) => n.slug === hovered)?.rulingGraha
            : "Lunar Mansions"}
        </text>
        {hovered && (
          <text x={cx} y={cy + 20} textAnchor="middle" className="fill-current text-muted-foreground" fontSize={7}>
            {nakshatras.find((n) => n.slug === hovered)?.gana} gana
          </text>
        )}
      </svg>
    </motion.div>
  );
}
