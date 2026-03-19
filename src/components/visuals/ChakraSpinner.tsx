"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface ChakraSpinnerProps {
  size?: number;
  color?: string;
  petals?: number;
  speed?: number;
}

export function ChakraSpinner({
  size = 80,
  color = "#f97316",
  petals = 8,
  speed = 20,
}: ChakraSpinnerProps) {
  const petalAngle = 360 / petals;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 4;
  const innerR = outerR * 0.35;
  const midR = outerR * 0.65;

  // Generate the petal SVG paths
  const petalPaths = useMemo(() => {
    return Array.from({ length: petals }, (_, index) => {
      const angle = index * petalAngle * (Math.PI / 180);
      const nextAngle = (index + 1) * petalAngle * (Math.PI / 180);
      const midAngle = (angle + nextAngle) / 2;

      // Inner petal (smaller, rotated slightly for depth)
      const x1 = cx + innerR * Math.cos(angle);
      const y1 = cy + innerR * Math.sin(angle);
      const tipX = cx + outerR * Math.cos(midAngle);
      const tipY = cy + outerR * Math.sin(midAngle);
      const x2 = cx + innerR * Math.cos(nextAngle);
      const y2 = cy + innerR * Math.sin(nextAngle);

      // Mid-layer petal (offset)
      const mx1 = cx + innerR * 1.2 * Math.cos(angle + 0.05);
      const my1 = cy + innerR * 1.2 * Math.sin(angle + 0.05);
      const mtipX = cx + midR * Math.cos(midAngle);
      const mtipY = cy + midR * Math.sin(midAngle);
      const mx2 = cx + innerR * 1.2 * Math.cos(nextAngle + 0.05);
      const my2 = cy + innerR * 1.2 * Math.sin(nextAngle + 0.05);

      return {
        outer: `M ${x1} ${y1} Q ${tipX} ${tipY} ${x2} ${y2}`,
        inner: `M ${mx1} ${my1} Q ${mtipX} ${mtipY} ${mx2} ${my2}`,
      };
    });
  }, [petals, petalAngle, cx, cy, outerR, innerR, midR]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer ring — spins clockwise */}
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        animate={{ rotate: 360 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {/* Outer petal layer */}
        {petalPaths.map((paths, i) => (
          <path
            key={`outer-${i}`}
            d={paths.outer}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
            opacity={0.15 + (i % 2) * 0.08}
          />
        ))}

        {/* Decorative dots at petal tips */}
        {Array.from({ length: petals }, (_, i) => {
          const midAngle = ((i + 0.5) * petalAngle) * (Math.PI / 180);
          return (
            <circle
              key={`dot-${i}`}
              cx={cx + outerR * 0.95 * Math.cos(midAngle)}
              cy={cy + outerR * 0.95 * Math.sin(midAngle)}
              r={1}
              fill={color}
              opacity={0.2 + (i % 3) * 0.05}
            />
          );
        })}

        {/* Outer ring circle */}
        <circle cx={cx} cy={cy} r={outerR - 1} fill="none" stroke={color} strokeWidth={0.5} opacity={0.08} />
      </motion.svg>

      {/* Inner ring — spins counter-clockwise, slower */}
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        animate={{ rotate: -360 }}
        transition={{ duration: speed * 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {/* Inner petal layer */}
        {petalPaths.map((paths, i) => (
          <path
            key={`inner-${i}`}
            d={paths.inner}
            fill="none"
            stroke={color}
            strokeWidth={0.8}
            opacity={0.1 + (i % 2) * 0.05}
          />
        ))}

        {/* Inner ring circle */}
        <circle cx={cx} cy={cy} r={innerR * 1.1} fill="none" stroke={color} strokeWidth={0.5} opacity={0.1} />
      </motion.svg>

      {/* Center — static with pulse */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="absolute inset-0"
      >
        {/* Center circle */}
        <circle cx={cx} cy={cy} r={innerR * 0.5} fill="none" stroke={color} strokeWidth={0.8} opacity={0.12} />

        {/* Bindu (center dot with glow) */}
        <circle cx={cx} cy={cy} r={2} fill={color} opacity={0.25}>
          <animate
            attributeName="opacity"
            values="0.25;0.15;0.25"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx={cx} cy={cy} r={5} fill={color} opacity={0.06}>
          <animate
            attributeName="r"
            values="5;7;5"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.06;0.02;0.06"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
