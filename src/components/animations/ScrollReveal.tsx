"use client";

import { motion, type Variant } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  const offset = offsets[direction];

  const hidden: Variant = { opacity: 0, x: offset.x, y: offset.y };
  const visible: Variant = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
