"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

export { getDeityColor } from "@/lib/deity-colors";

interface DeityAuraGlowProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function DeityAuraGlow({ children, color, className = "" }: DeityAuraGlowProps) {
  const rgb = color || "249, 115, 22";

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, rgba(${rgb}, 0.08) 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {children}
    </div>
  );
}

