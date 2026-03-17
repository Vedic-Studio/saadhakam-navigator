"use client";

import { motion } from "framer-motion";
import { type ReactNode, Children } from "react";

interface StaggeredListProps {
  children: ReactNode;
  stagger?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const containerVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

const itemVariants = (duration: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.16, 1, 0.3, 1] },
  },
});

export function StaggeredList({
  children,
  stagger = 0.08,
  duration = 0.5,
  className,
  once = true,
}: StaggeredListProps) {
  return (
    <motion.div
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div variants={itemVariants(duration)}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
