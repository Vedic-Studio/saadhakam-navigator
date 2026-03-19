"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { varas } from "@/data/panchang";
import { GRAHA_ICONS } from "@/components/jyotish/icons/grahas";

/* ───────────────────────── Types ───────────────────────── */

interface PanchangClockProps {
  size?: number;
  nakshatra?: string;
  tithi?: string;
}

/* ───────────────────────── Constants ───────────────────────── */

const VARA_CONFIG = [
  { color: "#ef4444", glow: "rgba(239, 68, 68, 0.4)", symbol: "\u2609" },  // Sunday - Surya
  { color: "#e2e8f0", glow: "rgba(226, 232, 240, 0.4)", symbol: "\u263D" }, // Monday - Chandra
  { color: "#f97316", glow: "rgba(249, 115, 22, 0.4)", symbol: "\u2642" },  // Tuesday - Mangala
  { color: "#22c55e", glow: "rgba(34, 197, 94, 0.4)", symbol: "\u263F" },   // Wednesday - Budha
  { color: "#eab308", glow: "rgba(234, 179, 8, 0.4)", symbol: "\u2643" },   // Thursday - Brihaspati
  { color: "#ec4899", glow: "rgba(236, 72, 153, 0.4)", symbol: "\u2640" },  // Friday - Shukra
  { color: "#818cf8", glow: "rgba(129, 140, 248, 0.4)", symbol: "\u2644" }, // Saturday - Shani
];

/* ───────────────────────── Component ───────────────────────── */

export function PanchangClock({ size = 360, nakshatra, tithi }: PanchangClockProps) {
  const [dayIndex, setDayIndex] = useState(0);
  const [time, setTime] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    function update() {
      const now = new Date();
      setDayIndex(now.getDay());
      setTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      setSeconds(now.getSeconds());
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 10;
  const varaOuterR = outerR;
  const varaInnerR = outerR * 0.82;
  const innerR = outerR * 0.5;

  // Clock hand angles
  const now = new Date();
  const hourAngle = ((now.getHours() % 12) / 12) * 360 + (now.getMinutes() / 60) * 30 - 90;
  const minuteAngle = (now.getMinutes() / 60) * 360 - 90;
  const secondAngle = (seconds / 60) * 360 - 90;

  // Stars in the center area
  const centerStars = useMemo(() => {
    const stars: { x: number; y: number; r: number; opacity: number; delay: number }[] = [];
    for (let i = 0; i < 50; i++) {
      const seed1 = ((i * 7919 + 104729) % 10000) / 10000;
      const seed2 = ((i * 6271 + 32749) % 10000) / 10000;
      const seed3 = ((i * 4513 + 65521) % 10000) / 10000;
      const angle = seed1 * Math.PI * 2;
      const dist = innerR * 0.1 + seed2 * innerR * 0.85;
      stars.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: 0.3 + seed3 * 0.7,
        opacity: 0.1 + seed3 * 0.2,
        delay: seed1 * 5,
      });
    }
    return stars;
  }, [cx, cy, innerR]);

  function varaArc(index: number) {
    const segAngle = 360 / 7;
    const start = (index * segAngle - 90) * (Math.PI / 180);
    const end = ((index + 1) * segAngle - 90) * (Math.PI / 180);
    const x1 = cx + varaOuterR * Math.cos(start);
    const y1 = cy + varaOuterR * Math.sin(start);
    const x2 = cx + varaOuterR * Math.cos(end);
    const y2 = cy + varaOuterR * Math.sin(end);
    const x3 = cx + varaInnerR * Math.cos(end);
    const y3 = cy + varaInnerR * Math.sin(end);
    const x4 = cx + varaInnerR * Math.cos(start);
    const y4 = cy + varaInnerR * Math.sin(start);
    return `M ${x1} ${y1} A ${varaOuterR} ${varaOuterR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${varaInnerR} ${varaInnerR} 0 0 0 ${x4} ${y4} Z`;
  }

  function varaLabelPos(index: number) {
    const segAngle = 360 / 7;
    const angle = ((index + 0.5) * segAngle - 90) * (Math.PI / 180);
    const r = (varaOuterR + varaInnerR) / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  const currentVara = varas[dayIndex];
  const currentConfig = VARA_CONFIG[dayIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="mx-auto max-w-full h-auto"
      >
        <defs>
          {VARA_CONFIG.map((config, i) => (
            <filter key={i} id={`vara-glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor={config.color} floodOpacity="0.5" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="shadow" />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}

          <radialGradient id="clock-void" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="85%" stopColor="#020617" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* Dark background */}
        <circle cx={cx} cy={cy} r={outerR + 8} fill="#020617" />

        {/* Outer decorative ticks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const isMajor = i % 5 === 0;
          return (
            <line
              key={`ctick-${i}`}
              x1={cx + (varaInnerR - (isMajor ? 6 : 3)) * Math.cos(angle)}
              y1={cy + (varaInnerR - (isMajor ? 6 : 3)) * Math.sin(angle)}
              x2={cx + (varaInnerR - 1) * Math.cos(angle)}
              y2={cy + (varaInnerR - 1) * Math.sin(angle)}
              stroke={isMajor ? "#475569" : "#1e293b"}
              strokeWidth={isMajor ? 1 : 0.5}
            />
          );
        })}

        {/* Vara ring segments */}
        {varas.map((vara, i) => {
          const isActive = i === dayIndex;
          const config = VARA_CONFIG[i];
          const pos = varaLabelPos(i);

          return (
            <Link key={vara.slug} href={`/jyotish/panchang/varas/${vara.slug}`}>
              <g
                className="cursor-pointer"
                style={{ filter: isActive ? `url(#vara-glow-${i})` : "none" }}
              >
                <path
                  d={varaArc(i)}
                  fill={config.color}
                  fillOpacity={isActive ? 0.3 : 0.04}
                  stroke={config.color}
                  strokeWidth={isActive ? 2 : 0.5}
                  strokeOpacity={isActive ? 1 : 0.2}
                  style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
                {(() => {
                  const iconSrc = GRAHA_ICONS[vara.rulingGraha];
                  const iconSize = size > 280 ? 14 : 10;
                  return iconSrc ? (
                    <image
                      href={iconSrc}
                      x={pos.x - iconSize / 2}
                      y={pos.y - iconSize / 2 - 10}
                      width={iconSize}
                      height={iconSize}
                      style={{ opacity: isActive ? 1 : 0.4, transition: "opacity 0.4s ease" }}
                    />
                  ) : (
                    <text
                      x={pos.x}
                      y={pos.y - 4}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={size > 280 ? 14 : 11}
                      fill={isActive ? config.color : "#64748b"}
                      style={{
                        transition: "all 0.3s ease",
                        filter: isActive ? `drop-shadow(0 0 4px ${config.glow})` : "none",
                      }}
                    >
                      {config.symbol}
                    </text>
                  );
                })()}
                {/* Day name */}
                <text
                  x={pos.x}
                  y={pos.y + 10}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={size > 280 ? 7 : 6}
                  fill={isActive ? "#e2e8f0" : "#475569"}
                  letterSpacing="0.5"
                  fontWeight={isActive ? "600" : "400"}
                  style={{ transition: "all 0.3s ease" }}
                >
                  {vara.name.split(" ")[0].toUpperCase()}
                </text>
              </g>
            </Link>
          );
        })}

        {/* Inner circle — clock face */}
        <circle cx={cx} cy={cy} r={varaInnerR - 1} fill="url(#clock-void)" />
        <circle cx={cx} cy={cy} r={varaInnerR - 1} fill="none" stroke="#1e293b" strokeWidth={0.8} />

        {/* Center stars */}
        {centerStars.map((star, i) => (
          <circle key={`cstar-${i}`} cx={star.x} cy={star.y} r={star.r} fill="#cbd5e1" opacity={star.opacity}>
            <animate
              attributeName="opacity"
              values={`${star.opacity};${star.opacity * 0.2};${star.opacity}`}
              dur={`${3 + star.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Clock hands */}
        {/* Hour hand */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(hourAngle * Math.PI / 180) * innerR * 0.55}
          y2={cy + Math.sin(hourAngle * Math.PI / 180) * innerR * 0.55}
          stroke={currentConfig?.color || "#f97316"}
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.8}
        />
        {/* Minute hand */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(minuteAngle * Math.PI / 180) * innerR * 0.75}
          y2={cy + Math.sin(minuteAngle * Math.PI / 180) * innerR * 0.75}
          stroke="#94a3b8"
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.7}
        />
        {/* Second hand */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(secondAngle * Math.PI / 180) * innerR * 0.8}
          y2={cy + Math.sin(secondAngle * Math.PI / 180) * innerR * 0.8}
          stroke="#ef4444"
          strokeWidth={0.8}
          strokeLinecap="round"
          opacity={0.5}
        />
        {/* Center dot */}
        <circle cx={cx} cy={cy} r={3} fill={currentConfig?.color || "#f97316"}>
          <animate
            attributeName="r"
            values="3;3.5;3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx={cx} cy={cy} r={6} fill={currentConfig?.color || "#f97316"} opacity={0.15}>
          <animate
            attributeName="opacity"
            values="0.15;0.08;0.15"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Time display */}
        <text
          x={cx}
          y={cy + innerR * 0.45}
          textAnchor="middle"
          fontSize={13}
          fill="#e2e8f0"
          fontWeight="600"
          letterSpacing="2"
        >
          {time}
        </text>

        {/* Vara name */}
        <text
          x={cx}
          y={cy - innerR * 0.5}
          textAnchor="middle"
          fontSize={10}
          fill={currentConfig?.color || "#f97316"}
          letterSpacing="2"
          fontWeight="600"
          style={{
            filter: `drop-shadow(0 0 4px ${currentConfig?.glow || "rgba(249,115,22,0.3)"})`,
          }}
        >
          {currentVara?.name.split(" ")[0].toUpperCase() || ""}
        </text>
        <text
          x={cx}
          y={cy - innerR * 0.35}
          textAnchor="middle"
          fontSize={7}
          fill="#475569"
          letterSpacing="1"
        >
          {currentVara?.rulingGraha || ""}
        </text>

        {/* Nakshatra / tithi info below time */}
        {nakshatra && (
          <text x={cx} y={cy + innerR * 0.6} textAnchor="middle" fontSize={8} fill="#64748b">
            {nakshatra}
          </text>
        )}
        {tithi && (
          <text x={cx} y={cy + innerR * 0.72} textAnchor="middle" fontSize={8} fill="#64748b">
            {tithi}
          </text>
        )}

        {/* Active vara indicator dot */}
        {(() => {
          const segAngle = 360 / 7;
          const angle = ((dayIndex + 0.5) * segAngle - 90) * (Math.PI / 180);
          const indicatorR = varaOuterR + 6;
          return (
            <g>
              <circle
                cx={cx + indicatorR * Math.cos(angle)}
                cy={cy + indicatorR * Math.sin(angle)}
                r={3}
                fill={currentConfig?.color || "#f97316"}
              >
                <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={cx + indicatorR * Math.cos(angle)}
                cy={cy + indicatorR * Math.sin(angle)}
                r={7}
                fill={currentConfig?.color || "#f97316"}
                opacity={0.15}
              >
                <animate attributeName="r" values="7;10;7" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0.03;0.15" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })()}

        {/* Outer decorative ring */}
        <circle cx={cx} cy={cy} r={outerR + 3} fill="none" stroke="#1e293b" strokeWidth={0.5} />
      </svg>
    </motion.div>
  );
}
