"use client";

/**
 * Goal-gradient progress bar for a learning path.
 *
 * Goal-gradient effect: motivation rises as the finish line nears, so the bar is
 * the persistent, prominent signal of "how close am I". It shows completed/total
 * and a percentage, and announces progress to assistive tech via aria attributes.
 * Pure presentational: it takes already-computed numbers and renders them; the
 * owning client component holds the hydrated state.
 */

import { cn } from "@/lib/utils";

export interface PathProgressBarProps {
  /** Steps completed so far (0..total). */
  completed: number;
  /** Total steps in the path (>= 1). */
  total: number;
  /** Whole-number percentage 0..100 (precomputed by the caller). */
  pct: number;
  className?: string;
}

export function PathProgressBar({
  completed,
  total,
  pct,
  className,
}: PathProgressBarProps) {
  const done = pct >= 100;
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">
          {done ? "Path complete" : "Your progress"}
        </span>
        <span className="text-sm tabular-nums text-muted-foreground">
          {completed} of {total} &middot; {pct}%
        </span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Learning path progress: ${completed} of ${total} steps complete`}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            done ? "bg-emerald-500" : "bg-primary",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
