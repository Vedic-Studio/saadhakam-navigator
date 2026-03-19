"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { varas } from "@/data/panchang";
import { GRAHA_ICONS } from "@/components/jyotish/icons/grahas";

interface PanchangClockProps {
  size?: number;
  nakshatra?: string;
  tithi?: string;
}

const VARA_COLORS = [
  "#ef4444", // Sunday - Surya (red/gold)
  "#e2e8f0", // Monday - Chandra (silver)
  "#f97316", // Tuesday - Mangala (orange)
  "#22c55e", // Wednesday - Budha (green)
  "#eab308", // Thursday - Brihaspati (yellow)
  "#ec4899", // Friday - Shukra (pink)
  "#6366f1", // Saturday - Shani (indigo)
];

export function PanchangClock({ size = 320, nakshatra, tithi }: PanchangClockProps) {
  const [dayIndex, setDayIndex] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setDayIndex(now.getDay());
    setTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    const interval = setInterval(() => {
      const d = new Date();
      setDayIndex(d.getDay());
      setTime(d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 4;
  const varaR = outerR * 0.85;
  const innerR = outerR * 0.55;

  function varaArc(index: number) {
    const segAngle = 360 / 7;
    const start = (index * segAngle - 90) * (Math.PI / 180);
    const end = ((index + 1) * segAngle - 90) * (Math.PI / 180);

    const x1 = cx + outerR * Math.cos(start);
    const y1 = cy + outerR * Math.sin(start);
    const x2 = cx + outerR * Math.cos(end);
    const y2 = cy + outerR * Math.sin(end);
    const x3 = cx + varaR * Math.cos(end);
    const y3 = cy + varaR * Math.sin(end);
    const x4 = cx + varaR * Math.cos(start);
    const y4 = cy + varaR * Math.sin(start);

    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${varaR} ${varaR} 0 0 0 ${x4} ${y4} Z`;
  }

  function varaLabelPos(index: number) {
    const segAngle = 360 / 7;
    const angle = ((index + 0.5) * segAngle - 90) * (Math.PI / 180);
    const r = (outerR + varaR) / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  const currentVara = varas[dayIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="mx-auto max-w-full h-auto"
      >
        {/* Vara ring */}
        {varas.map((vara, i) => {
          const isActive = i === dayIndex;
          const color = VARA_COLORS[i];
          const pos = varaLabelPos(i);

          return (
            <Link key={vara.slug} href={`/jyotish/panchang/varas/${vara.slug}`}>
              <g className="cursor-pointer">
                <path
                  d={varaArc(i)}
                  fill={color}
                  fillOpacity={isActive ? 0.3 : 0.06}
                  stroke={color}
                  strokeWidth={isActive ? 2 : 0.5}
                  strokeOpacity={isActive ? 1 : 0.3}
                  style={{ transition: "all 0.4s ease" }}
                />
                {(() => {
                  const iconSrc = GRAHA_ICONS[vara.rulingGraha];
                  const iconSize = size > 280 ? 14 : 10;
                  return iconSrc ? (
                    <image
                      href={iconSrc}
                      x={pos.x - iconSize / 2}
                      y={pos.y - iconSize / 2 - 6}
                      width={iconSize}
                      height={iconSize}
                      style={{ opacity: isActive ? 1 : 0.4, transition: "opacity 0.4s ease" }}
                    />
                  ) : null;
                })()}
                <text
                  x={pos.x}
                  y={pos.y + 6}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={size > 280 ? 8 : 6}
                  className="fill-current text-foreground"
                  style={{ opacity: isActive ? 1 : 0.5 }}
                >
                  {vara.name.split(" ")[0]}
                </text>
              </g>
            </Link>
          );
        })}

        {/* Inner circle */}
        <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="currentColor" strokeOpacity={0.1} />

        {/* Center info */}
        <text x={cx} y={cy - 24} textAnchor="middle" className="fill-current text-muted-foreground" fontSize={9}>
          {time}
        </text>
        <text x={cx} y={cy - 8} textAnchor="middle" className="fill-current text-foreground font-bold" fontSize={14}>
          {currentVara?.name.split(" ")[0] || ""}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" className="fill-current text-orange-400" fontSize={9}>
          {currentVara?.rulingGraha || ""}
        </text>

        {nakshatra && (
          <text x={cx} y={cy + 28} textAnchor="middle" className="fill-current text-muted-foreground" fontSize={8}>
            {nakshatra}
          </text>
        )}
        {tithi && (
          <text x={cx} y={cy + 42} textAnchor="middle" className="fill-current text-muted-foreground" fontSize={8}>
            {tithi}
          </text>
        )}

        {/* Pulsing indicator on active vara */}
        {(() => {
          const pos = varaLabelPos(dayIndex);
          const r = (outerR + varaR) / 2;
          const angle = ((dayIndex + 0.5) * (360 / 7) - 90) * (Math.PI / 180);
          return (
            <circle
              cx={cx + (r + 12) * Math.cos(angle)}
              cy={cy + (r + 12) * Math.sin(angle)}
              r={3}
              fill={VARA_COLORS[dayIndex]}
              className="animate-pulse-slow"
            />
          );
        })()}
      </svg>
    </motion.div>
  );
}
