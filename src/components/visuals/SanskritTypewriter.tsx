"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SanskritTypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  triggerOnce?: boolean;
}

export function SanskritTypewriter({
  text,
  speed = 60,
  className = "",
  triggerOnce = true,
}: SanskritTypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: 0.3 });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setDisplayCount(0);
      return;
    }

    const chars = [...text]; // handles multi-byte Devanagari correctly
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayCount(i);
      if (i >= chars.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text, speed]);

  const chars = [...text];
  const displayed = chars.slice(0, displayCount).join("");

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {displayed}
      {displayCount < chars.length && isInView && (
        <span className="inline-block w-[2px] h-[1em] bg-orange-400 ml-0.5 animate-pulse" />
      )}
    </motion.span>
  );
}
