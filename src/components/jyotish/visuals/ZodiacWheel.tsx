"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { rashis } from "@/data/rashis";
import { RASHI_ICONS } from "@/components/jyotish/icons/rashis";

const RASHI_COLORS: Record<string, string> = {
  Agni: "#ef4444",
  Prithvi: "#84cc16",
  Vayu: "#38bdf8",
  Jala: "#6366f1",
};

interface ZodiacWheelProps {
  activeSlug?: string;
  size?: number;
}

export function ZodiacWheel({ activeSlug, size = 400 }: ZodiacWheelProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 4;
  const innerR = outerR * 0.55;
  const labelR = (outerR + innerR) / 2;

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
        className="mx-auto rounded-2xl bg-slate-950/20 flex items-center justify-center text-muted-foreground text-sm"
        style={{ width: size, height: size, maxWidth: "100%" }}
      >
        Loading wheel...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -30 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="mx-auto max-w-full h-auto"
      >
        {rashis.map((rashi, i) => {
          const isActive = rashi.slug === activeSlug;
          const isHover = rashi.slug === hovered;
          const color = RASHI_COLORS[rashi.element] || "#666";
          const pos = labelPos(i);
          const iconSrc = RASHI_ICONS[rashi.slug];
          const iconSize = size > 300 ? 22 : 16;

          return (
            <Link key={rashi.slug} href={`/jyotish/rashis/${rashi.slug}`}>
              <g
                onMouseEnter={() => setHovered(rashi.slug)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <path
                  d={segmentPath(i, outerR, innerR)}
                  fill={isActive || isHover ? color : "transparent"}
                  fillOpacity={isActive ? 0.3 : isHover ? 0.15 : 0}
                  stroke={color}
                  strokeWidth={isActive ? 2.5 : 1}
                  strokeOpacity={isActive || isHover ? 1 : 0.4}
                  style={{ transition: "all 0.3s ease" }}
                />
                {iconSrc && (
                  <image
                    href={iconSrc}
                    x={pos.x - iconSize / 2}
                    y={pos.y - iconSize / 2 - 4}
                    width={iconSize}
                    height={iconSize}
                    style={{
                      opacity: isActive || isHover ? 1 : 0.7,
                      transition: "opacity 0.3s",
                    }}
                  />
                )}
                <text
                  x={pos.x}
                  y={pos.y + iconSize / 2 + 4}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-current text-muted-foreground"
                  fontSize={size > 300 ? 10 : 8}
                  style={{
                    opacity: isActive || isHover ? 1 : 0.5,
                    transition: "opacity 0.3s",
                  }}
                >
                  {rashi.name}
                </text>
              </g>
            </Link>
          );
        })}

        {/* Center label */}
        <circle cx={cx} cy={cy} r={innerR - 2} fill="none" stroke="currentColor" strokeOpacity={0.1} />
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          className="fill-current text-muted-foreground"
          fontSize={11}
        >
          {hovered
            ? rashis.find((r) => r.slug === hovered)?.name
            : "Rashi Chakra"}
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          className="fill-current text-orange-400"
          fontSize={9}
        >
          {hovered
            ? rashis.find((r) => r.slug === hovered)?.element
            : "12 Signs"}
        </text>
      </svg>
    </motion.div>
  );
}
