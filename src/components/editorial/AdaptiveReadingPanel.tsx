"use client";

import { motion } from "framer-motion";
import { calmSpring } from "./motion";

interface AdaptiveReadingPanelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main prose container that animates smoothly when content inside expands
 * or collapses — verse translations opening, marginalia panels appearing,
 * etc. Instead of the page snapping, everything glides.
 *
 * Wrap the article body in this component. Every direct child that may
 * change size should also use `<motion.div layout>` so Framer Motion can
 * interpolate positions across the entire subtree.
 */
export function AdaptiveReadingPanel({
  children,
  className,
}: AdaptiveReadingPanelProps) {
  return (
    <motion.article
      layout
      transition={calmSpring}
      className={className}
      style={{ borderRadius: 0 }}
    >
      {children}
    </motion.article>
  );
}

const motionElements = {
  div: motion.div,
  section: motion.section,
  aside: motion.aside,
  header: motion.header,
  footer: motion.footer,
} as const;

/**
 * Wrap each section/paragraph in this so it participates in the layout
 * animation tree. Without this, children would snap while only the outer
 * article animates.
 */
export function LayoutBlock({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof motionElements;
}) {
  const MotionTag = motionElements[as];
  return (
    <MotionTag layout transition={calmSpring} className={className}>
      {children}
    </MotionTag>
  );
}
