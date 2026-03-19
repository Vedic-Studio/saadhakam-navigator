"use client";

import { type ReactNode, useMemo } from "react";
import { motion } from "framer-motion";

export { getDeityColor } from "@/lib/deity-colors";

interface DeityAuraGlowProps {
  children: ReactNode;
  color?: string;
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

export function DeityAuraGlow({
  children,
  color,
  className = "",
  intensity = "medium",
}: DeityAuraGlowProps) {
  const rgb = color || "249, 115, 22";

  const config = {
    subtle: { particleCount: 12, baseOpacity: 0.04, glowOpacity: 0.06 },
    medium: { particleCount: 20, baseOpacity: 0.06, glowOpacity: 0.1 },
    strong: { particleCount: 30, baseOpacity: 0.08, glowOpacity: 0.15 },
  }[intensity];

  // Generate floating particle positions
  const particles = useMemo(() => {
    return Array.from({ length: config.particleCount }, (_, i) => {
      const seed1 = ((i * 7919 + 104729) % 10000) / 10000;
      const seed2 = ((i * 6271 + 32749) % 10000) / 10000;
      const seed3 = ((i * 4513 + 65521) % 10000) / 10000;
      return {
        x: seed1 * 100,
        y: seed2 * 100,
        size: 2 + seed3 * 4,
        delay: seed1 * 6,
        duration: 4 + seed2 * 4,
        driftX: (seed3 - 0.5) * 20,
        driftY: -10 - seed2 * 15,
      };
    });
  }, [config.particleCount]);

  return (
    <div className={`relative ${className}`}>
      {/* Primary aura — layered radial gradients */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl pointer-events-none overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 25%, rgba(${rgb}, ${config.glowOpacity}) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 30% 70%, rgba(${rgb}, ${config.glowOpacity * 0.4}) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 70% 70%, rgba(${rgb}, ${config.glowOpacity * 0.3}) 0%, transparent 60%)
          `,
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary slow-moving aura layer */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl pointer-events-none overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 90% 50% at 50% 30%, rgba(${rgb}, ${config.baseOpacity}) 0%, transparent 80%)`,
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 rounded-3xl pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(${rgb}, 0.6) 0%, rgba(${rgb}, 0) 70%)`,
            }}
            animate={{
              x: [0, p.driftX, 0],
              y: [0, p.driftY, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {children}
    </div>
  );
}
