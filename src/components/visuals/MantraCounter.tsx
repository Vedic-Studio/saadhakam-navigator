"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MantraCounterProps {
  mantraName?: string;
  targetCount?: number;
}

const MALA_COUNT = 108;

export function MantraCounter({
  mantraName = "Mantra",
  targetCount = MALA_COUNT,
}: MantraCounterProps) {
  const storageKey = `mantra-counter-${mantraName.toLowerCase().replace(/\s+/g, "-")}`;
  const [count, setCount] = useState(0);
  const [malaComplete, setMalaComplete] = useState(false);
  const [totalMalas, setTotalMalas] = useState(0);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        setCount(data.count || 0);
        setTotalMalas(data.totalMalas || 0);
      }
    } catch {
      // ignore parse errors
    }
  }, [storageKey]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ count, totalMalas }));
    } catch {
      // ignore storage errors
    }
  }, [count, totalMalas, storageKey]);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      if (next >= targetCount) {
        setMalaComplete(true);
        setTotalMalas((m) => m + 1);
        setTimeout(() => {
          setMalaComplete(false);
          setCount(0);
        }, 2000);
        return targetCount;
      }
      return next;
    });
  }, [targetCount]);

  const reset = useCallback(() => {
    setCount(0);
    setMalaComplete(false);
  }, []);

  const progress = count / targetCount;
  const circumference = 2 * Math.PI * 58;
  const strokeDash = circumference * progress;

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={increment}
        disabled={malaComplete}
        className="relative w-36 h-36 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 select-none"
        aria-label={`Count: ${count} of ${targetCount}`}
      >
        {/* Background ring */}
        <svg viewBox="0 0 128 128" className="absolute inset-0 w-full h-full">
          <circle
            cx={64}
            cy={64}
            r={58}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            opacity={0.1}
          />
          {/* Progress ring */}
          <motion.circle
            cx={64}
            cy={64}
            r={58}
            fill="none"
            stroke="rgb(249 115 22)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - strokeDash}
            transform="rotate(-90 64 64)"
            initial={false}
            animate={{ strokeDashoffset: circumference - strokeDash }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </svg>

        {/* Count display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-3xl font-display font-bold text-foreground"
            >
              {count}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs text-muted-foreground">/ {targetCount}</span>
        </div>
      </button>

      {/* Mala complete celebration */}
      <AnimatePresence>
        {malaComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <p className="text-orange-400 font-display font-bold">Mala Complete</p>
            <p className="text-xs text-muted-foreground">Om Shanti</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {totalMalas > 0 && <span>{totalMalas} mala{totalMalas > 1 ? "s" : ""} completed</span>}
        {count > 0 && !malaComplete && (
          <button onClick={reset} className="text-xs underline hover:text-foreground transition-colors">
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
