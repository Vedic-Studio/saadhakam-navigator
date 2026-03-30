"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calmSpring, quickSpring } from "./motion";

interface AnchoredMarginaliaProps {
  /** The word or phrase displayed inline in the prose. */
  children: React.ReactNode;
  /** Content revealed when the marginalia icon is activated. */
  panel: React.ReactNode;
  /** Icon element shown in the margin (defaults to a small circle). */
  icon?: React.ReactNode;
  /** Where the panel opens: below the word or in the right margin. */
  placement?: "inline" | "margin";
}

/**
 * Wraps a word in the text and anchors an interactive icon to it.
 * Clicking the icon expands a mini-panel inline — the icon tracks
 * perfectly with the text as the layout reflows.
 *
 * Usage in an article:
 * ```tsx
 * <AnchoredMarginalia
 *   panel={<p>धर्म — righteous duty; the cosmic order that sustains existence.</p>}
 * >
 *   dharma
 * </AnchoredMarginalia>
 * ```
 */
export function AnchoredMarginalia({
  children,
  panel,
  icon,
  placement = "inline",
}: AnchoredMarginaliaProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.span
      layout
      transition={calmSpring}
      className="relative inline"
    >
      {/* The word itself */}
      <motion.span
        layout
        className={`
          underline decoration-dotted decoration-[#C15C3D]/40 underline-offset-4
          cursor-pointer transition-colors
          ${isOpen ? "text-[#C15C3D]" : ""}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </motion.span>

      {/* Anchored icon — positioned in the right margin */}
      <motion.button
        layout
        transition={quickSpring}
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-7 top-0 w-5 h-5 flex items-center justify-center text-[#C15C3D]/60 hover:text-[#C15C3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C15C3D]/40 rounded-full"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close definition" : "Show definition"}
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={quickSpring}
          className="text-sm select-none"
        >
          {icon ?? "＋"}
        </motion.span>
      </motion.button>

      {/* Expandable panel */}
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.span
            layout
            className={`
              block overflow-hidden
              ${placement === "margin"
                ? "lg:absolute lg:-right-64 lg:top-0 lg:w-56"
                : "mt-2 mb-2"
              }
            `}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={calmSpring}
          >
            <span
              className={`
                block rounded-lg border border-[#C15C3D]/15 bg-[#F9F8F6]
                px-4 py-3 text-sm leading-relaxed text-[#2C2A29]
                shadow-sm
              `}
            >
              {panel}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
}
