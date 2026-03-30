"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { calmSpring, quickSpring } from "./motion";

interface InteractiveVerseBlockProps {
  /** Sanskrit text in Devanagari script. */
  sanskrit?: string;
  /** IAST romanised transliteration. */
  transliteration: string;
  /** English translation revealed on expand. */
  translation: string;
  /** Commentary or contextual note revealed on expand. */
  commentary?: string;
  /** Source attribution, e.g. "Bhagavad Gita 2.47". */
  source?: string;
  /** Link to the full verse page. */
  sourceHref?: string;
}

/**
 * A Sanskrit verse that behaves like a living manuscript panel.
 *
 * Default state: shows the transliteration (and optionally Devanagari)
 * with a subtle "expand" affordance anchored to the right.
 *
 * Expanded state: the container fluidly morphs open — the original text
 * glides upward, the English translation and commentary reveal themselves
 * below. The icon rotates into a "close" state. No page jump; the text
 * physically parts to reveal deeper meaning.
 */
export function InteractiveVerseBlock({
  sanskrit,
  transliteration,
  translation,
  commentary,
  source,
  sourceHref,
}: InteractiveVerseBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.figure
      layout
      transition={calmSpring}
      className="not-prose my-10 mx-auto max-w-[60ch]"
      style={{ borderRadius: 12 }}
    >
      <motion.div
        layout
        transition={calmSpring}
        className="relative border border-[#C15C3D]/15 bg-[#F9F8F6] overflow-hidden cursor-pointer"
        style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Collapse verse" : "Expand verse translation"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <motion.div layout transition={calmSpring} className="px-6 py-6 sm:px-8 sm:py-8">
          {/* Sanskrit (Devanagari) */}
          {sanskrit && (
            <motion.p
              layout
              transition={calmSpring}
              className="font-sanskrit text-xl sm:text-2xl leading-loose tracking-wide text-center text-[#2C2A29]/85 mb-3"
            >
              {sanskrit}
            </motion.p>
          )}

          {/* Transliteration — always visible */}
          <motion.p
            layout
            transition={calmSpring}
            className="text-center font-serif italic text-base sm:text-lg text-[#2C2A29]/70 leading-relaxed"
          >
            {transliteration}
          </motion.p>

          {/* Expand/collapse affordance */}
          <motion.div
            layout
            transition={calmSpring}
            className="flex items-center justify-center mt-4 gap-2"
          >
            <span className="text-xs tracking-wider uppercase text-[#C15C3D]/60 select-none">
              {isExpanded ? "Close" : "Translation"}
            </span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={quickSpring}
              className="text-[#C15C3D]/60"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Expanded content — translation + commentary */}
        <AnimatePresence mode="sync">
          {isExpanded && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={calmSpring}
              className="overflow-hidden"
            >
              <div className="border-t border-[#C15C3D]/10 mx-6 sm:mx-8" />

              <div className="px-6 py-6 sm:px-8 sm:py-6 space-y-4">
                {/* Translation */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...calmSpring, delay: 0.1 }}
                  className="font-display text-lg sm:text-xl leading-relaxed text-center text-[#2C2A29]"
                >
                  &ldquo;{translation}&rdquo;
                </motion.p>

                {/* Commentary */}
                {commentary && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...calmSpring, delay: 0.2 }}
                    className="text-sm leading-relaxed text-[#2C2A29]/65 text-center max-w-[50ch] mx-auto"
                  >
                    {commentary}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Source attribution — below the card */}
      {source && (
        <motion.figcaption
          layout
          transition={calmSpring}
          className="text-center mt-3 text-xs text-[#2C2A29]/45"
        >
          {sourceHref ? (
            <a
              href={sourceHref}
              className="hover:text-[#C15C3D] transition-colors"
            >
              <cite>{source}</cite>
            </a>
          ) : (
            <cite>{source}</cite>
          )}
        </motion.figcaption>
      )}
    </motion.figure>
  );
}
