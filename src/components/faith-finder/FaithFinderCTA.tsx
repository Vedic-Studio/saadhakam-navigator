"use client";

import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FaithFinderCTAProps {
  /**
   * The page-template surface this CTA lives on. Forwarded to the analytics
   * bridge as `source_template` so quiz starts can be attributed to the leaky
   * page that drove them. Use a canonical value (e.g. "concept-essay",
   * "biography", "comparison").
   */
  sourceTemplate: string;
  className?: string;
}

/**
 * Inline "next step" card that routes dead-end readers into the Faith Finder
 * quiz. Tagged with `source_template` on click so we can see which page is
 * feeding the converting quiz.
 */
export function FaithFinderCTA({ sourceTemplate, className }: FaithFinderCTAProps) {
  const href = `/faith-finder?src=${encodeURIComponent(sourceTemplate)}`;

  const handleClick = () => {
    const sadhaka = window.sadhaka;
    if (!sadhaka?.ctaClick) return;
    // The prop is intentionally a plain string for ergonomics; callers pass a
    // canonical source_template value (e.g. "concept-essay", "biography",
    // "comparison"), which the bridge types as a narrower union.
    sadhaka.ctaClick(
      "faith_finder_cta",
      "/faith-finder",
      {},
      sourceTemplate as Parameters<NonNullable<typeof sadhaka.ctaClick>>[3],
    );
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/[0.07] to-background p-8 md:p-10",
        className,
      )}
    >
      <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
            <Compass className="h-4 w-4" />
            Faith Finder
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            A 2-minute quiz reads how you relate to inquiry, devotion, action,
            and discipline, then points you to a personalized path through the
            tradition.
          </p>
        </div>
        <Link href={href} onClick={handleClick} className="shrink-0">
          <Button
            size="lg"
            className="h-13 gap-2 rounded-full bg-orange-600 px-8 text-base text-white shadow-lg shadow-orange-900/20 transition-transform hover:scale-105 hover:bg-orange-700"
          >
            Take the quiz
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
