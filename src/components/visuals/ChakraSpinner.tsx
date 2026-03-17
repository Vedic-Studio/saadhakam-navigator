"use client";

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

  function petalPath(index: number) {
    const angle = index * petalAngle * (Math.PI / 180);
    const nextAngle = (index + 1) * petalAngle * (Math.PI / 180);
    const midAngle = (angle + nextAngle) / 2;

    const x1 = cx + innerR * Math.cos(angle);
    const y1 = cy + innerR * Math.sin(angle);
    const tipX = cx + outerR * Math.cos(midAngle);
    const tipY = cy + outerR * Math.sin(midAngle);
    const x2 = cx + innerR * Math.cos(nextAngle);
    const y2 = cy + innerR * Math.sin(nextAngle);

    return `M ${x1} ${y1} Q ${tipX} ${tipY} ${x2} ${y2}`;
  }

  return (
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="opacity-20"
    >
      {Array.from({ length: petals }).map((_, i) => (
        <path
          key={i}
          d={petalPath(i)}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          opacity={0.6 + (i % 2) * 0.2}
        />
      ))}
      <circle cx={cx} cy={cy} r={innerR * 0.6} fill="none" stroke={color} strokeWidth={1} opacity={0.4} />
      <circle cx={cx} cy={cy} r={2} fill={color} opacity={0.5} />
    </motion.svg>
  );
}
