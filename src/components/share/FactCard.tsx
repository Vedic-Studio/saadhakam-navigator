/**
 * FactCard — a branded, citation-backed "win the argument" card.
 *
 * Server-renderable (no client hooks of its own); it embeds the client
 * `ShareButton`, which owns all `navigator`/`window` access. Designed to drop
 * onto evidence / site / dynasty pages in the Civilizational cluster.
 *
 * Psychology (marketing-psychology skill): the headline is the contrast, the
 * `fact` is the single quotable number (availability heuristic), the citation
 * makes the share credible (authority), and one-tap share keeps activation
 * energy near zero. The card pre-packages the argument so the sharer doesn't
 * have to (inverted curse-of-knowledge).
 */

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShareButton } from "./ShareButton";
import { shareUrlFor, type FactCard as FactCardData } from "./factCards";

const confidenceStyles: Record<FactCardData["confidence"], string> = {
  confirmed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
  strong: "bg-amber-500/10 text-amber-300 border-amber-500/25",
  open: "bg-sky-500/10 text-sky-300 border-sky-500/25",
};

const confidenceLabels: Record<FactCardData["confidence"], string> = {
  confirmed: "Confirmed",
  strong: "Strong evidence",
  open: "Open question",
};

export interface FactCardProps {
  card: FactCardData;
  /**
   * Optional eyebrow shown above the headline, e.g. "Share the receipt".
   * Keeps the share intent explicit without crowding the headline.
   */
  eyebrow?: string;
  className?: string;
  /** Pass priority to the card art when it sits above the fold. */
  priority?: boolean;
}

export function FactCard({
  card,
  eyebrow = "Settles the argument",
  className,
  priority = false,
}: FactCardProps) {
  const shareUrl = shareUrlFor(card);

  return (
    <section
      className={cn(
        "glass-card overflow-hidden rounded-2xl border border-orange-500/15",
        "bg-gradient-to-br from-orange-500/[0.06] to-transparent",
        className,
      )}
      aria-label={`Shareable fact: ${card.headline}`}
    >
      {/* Branded art */}
      <div className="relative aspect-[1200/630] w-full border-b border-white/5 bg-background/40">
        <Image
          src={card.art}
          alt={card.artAlt}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
          priority={priority}
        />
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400/80">
            {eyebrow}
          </span>
          <span
            className={cn(
              "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
              confidenceStyles[card.confidence],
            )}
          >
            {confidenceLabels[card.confidence]}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold leading-snug text-foreground">
          {card.headline}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-foreground/90">
          {card.fact}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {card.context}
        </p>

        <p className="mt-4 text-xs text-muted-foreground/70">
          <span className="font-medium text-foreground/70">Source:</span>{" "}
          {card.citation}
        </p>

        <div className="mt-5">
          <ShareButton
            payload={{
              title: card.headline,
              text: card.fact,
              url: shareUrl,
            }}
            hashtags={card.hashtags}
            size="sm"
          />
        </div>
      </div>
    </section>
  );
}
