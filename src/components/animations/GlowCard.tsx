"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  as?: "div" | "article" | "section";
}

export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(249,115,22,0.12)",
  as = "div",
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  function handleMove(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y, active: true });
  }

  function handleLeave() {
    setGlow((prev) => ({ ...prev, active: false }));
  }

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.015, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: glow.active
          ? `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, ${glowColor}, transparent 50%)`
          : undefined,
      }}
    >
      {children}
    </Component>
  );
}
