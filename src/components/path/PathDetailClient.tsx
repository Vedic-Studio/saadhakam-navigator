"use client";

/**
 * Client owner of a learning-path detail view: progress bar + step cards.
 *
 * It holds the hydrated progress for ONE path. Server renders an empty,
 * deterministic state (nothing complete) so there is no hydration mismatch; the
 * real persisted progress is read in an effect after mount. Marking a step
 * complete is a two-call sequence, matching the foundation contract:
 *   1. persist via the feature progress module (writePathProgress);
 *   2. fire trackPathStepComplete(pathId, stepN, totalSteps) SEPARATELY.
 * The persistence module never fires analytics, exactly like the foundation store.
 *
 * UX (onboarding-cro): a single goal-gradient progress bar pinned at the top
 * (Zeigarnik open loop — the unfinished bar pulls the reader on), one explicit
 * commitment action per step, and a celebration block once the loop closes.
 */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { trackPathStepComplete } from "@/lib/analytics/events";
import { PathProgressBar } from "@/components/path/PathProgressBar";
import {
  createInitialPathProgress,
  isStepComplete,
  markStepComplete,
  progressPct,
  readPathProgress,
  unmarkStep,
  writePathProgress,
  type PathProgress,
} from "@/components/path/progress";
import type { LearningPath } from "@/components/path/paths";

export interface PathDetailClientProps {
  path: LearningPath;
}

export function PathDetailClient({ path }: PathDetailClientProps) {
  const totalSteps = path.steps.length;

  // Start empty so server and first client render agree (no hydration mismatch).
  const [progress, setProgress] = useState<PathProgress>(
    createInitialPathProgress,
  );

  useEffect(() => {
    setProgress(readPathProgress());
  }, []);

  const completedHere = path.steps.filter((s) =>
    isStepComplete(progress, path.id, s.step),
  ).length;
  const pct = progressPct(progress, path.id, totalSteps);
  const allDone = completedHere === totalSteps;

  const handleToggle = useCallback(
    (stepN: number) => {
      // Read fresh from storage so other surfaces in the session do not get
      // clobbered by a stale in-memory copy (mirrors the foundation hooks).
      const current = readPathProgress();
      const wasComplete = isStepComplete(current, path.id, stepN);
      const next = wasComplete
        ? unmarkStep(current, path.id, stepN)
        : markStepComplete(current, path.id, stepN);

      // 1) persist
      setProgress(next);
      writePathProgress(next);

      // 2) fire analytics SEPARATELY, only on a completion (not on undo).
      if (!wasComplete) {
        trackPathStepComplete(path.id, stepN, totalSteps);
      }
    },
    [path.id, totalSteps],
  );

  return (
    <div className="space-y-8">
      <div className="sticky top-20 z-10 rounded-2xl border border-border/60 bg-background/85 p-5 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <PathProgressBar completed={completedHere} total={totalSteps} pct={pct} />
      </div>

      <ol className="space-y-5">
        {path.steps.map((step) => {
          const complete = isStepComplete(progress, path.id, step.step);
          return (
            <li key={step.step}>
              <div
                className={cn(
                  "rounded-2xl border p-6 transition-colors",
                  complete
                    ? "border-emerald-500/40 bg-emerald-500/[0.05]"
                    : "border-border/50 bg-card/40",
                )}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      complete
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-muted-foreground",
                    )}
                    aria-hidden="true"
                  >
                    {complete ? <Check className="h-4 w-4" /> : step.step}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="text-xl font-display font-bold text-foreground">
                        {step.title}
                      </h2>
                      <span className="text-xs italic text-muted-foreground">
                        {step.source}
                      </span>
                    </div>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {step.intro}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {step.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          {link.label}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-5">
                      <Button
                        type="button"
                        variant={complete ? "ghost" : "default"}
                        size="sm"
                        onClick={() => handleToggle(step.step)}
                        aria-pressed={complete}
                        className={cn(
                          complete && "text-emerald-600 hover:text-emerald-700",
                        )}
                      >
                        {complete ? (
                          <>
                            <Check className="mr-1.5 h-4 w-4" />
                            Completed &middot; undo
                          </>
                        ) : (
                          <>
                            <Circle className="mr-1.5 h-4 w-4" />
                            Mark step complete
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {allDone && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.06] p-6 text-center">
          <p className="text-lg font-display font-bold text-foreground">
            All six darshanas, read in order.
          </p>
          <p className="mt-2 text-muted-foreground">
            You now have the frame the whole tradition argues inside. Next: see
            the three schools of Vedanta disagree about the self.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/advaita-vs-dvaita" className="font-medium text-primary hover:underline">
              Advaita vs Dvaita
            </Link>
            <Link href="/philosophies" className="font-medium text-primary hover:underline">
              All philosophies
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
