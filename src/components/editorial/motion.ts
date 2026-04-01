/**
 * Shared motion configuration for the Living Manuscript reading experience.
 *
 * Every layout shift in the editorial system uses the same spring so the
 * whole page feels like a single physical surface — text parts to reveal
 * meaning, panels glide open, marginalia tracks its anchor.
 */
import type { Transition } from "framer-motion";

/** Physical but not bouncy — feels like thick paper unfolding. */
export const calmSpring: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.6,
};

/** Faster variant for small inline reveals (tooltips, icons rotating). */
export const quickSpring: Transition = {
  type: "spring",
  bounce: 0.05,
  duration: 0.35,
};

/** Opacity-only fade used alongside layout springs. */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
} as const;
