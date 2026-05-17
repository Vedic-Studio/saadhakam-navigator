import React from "react";
import { AlertTriangle, BookText } from "lucide-react";
import { ArticleLayout } from "@/components/ArticleLayout";
import {
    getDestroyedTempleById,
    type DestroyedTemple,
} from "@/data/templesDestroyed";
import type { ArticleMeta } from "@/features/articles";

export interface DestroyedTempleCaseProps {
    /** Article metadata, used by the wrapping ArticleLayout. */
    meta: ArticleMeta;
    /** ID into `destroyedTemples`. Throws if not found. */
    templeId: string;
    /** Long-form narrative body (Sections 1-6). Rendered inside ArticleLayout's prose container. */
    bodySlot: React.ReactNode;
    /** Optional callout for partially-supported / interpretive sub-claims. */
    contestedNote?: React.ReactNode;
    /** Optional related KB claim file slug(s), shown in Sources section as a reference cue. */
    kbClaimSlugs?: string[];
}

/**
 * The synchronous, easily testable inner shell. Pure presentational. The async
 * `DestroyedTempleCaseLayout` wraps this with `ArticleLayout` (which fetches
 * CMS content and renders header/footer/JSON-LD).
 *
 * Exported so unit tests can render it directly without mocking the async
 * CMS-fetching ArticleLayout.
 */
export function DestroyedTempleCaseShell({
    temple,
    bodySlot,
    contestedNote,
    kbClaimSlugs,
}: {
    temple: DestroyedTemple;
    bodySlot: React.ReactNode;
    contestedNote?: React.ReactNode;
    kbClaimSlugs?: string[];
}) {
    const { name, deity, location, destroyer, modernStatus, primarySource, quote } = temple;
    const locationStr = [location.place, location.district, location.state]
        .filter(Boolean)
        .join(", ");

    return (
        <div data-testid="destroyed-temple-case">
            {/* Fact card — quick-scan summary */}
            <aside
                data-testid="temple-fact-card"
                className="not-prose mb-10 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 md:p-7"
            >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400 mb-4">
                    The Case at a Glance
                </p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div>
                        <dt className="font-semibold text-foreground/70 uppercase tracking-wider text-[0.7rem] mb-1">
                            Temple
                        </dt>
                        <dd data-testid="fact-temple-name" className="text-foreground">
                            {name}
                        </dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-foreground/70 uppercase tracking-wider text-[0.7rem] mb-1">
                            Deity
                        </dt>
                        <dd data-testid="fact-deity" className="text-foreground">
                            {deity}
                        </dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-foreground/70 uppercase tracking-wider text-[0.7rem] mb-1">
                            Location
                        </dt>
                        <dd data-testid="fact-location" className="text-foreground">
                            {locationStr}
                        </dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-foreground/70 uppercase tracking-wider text-[0.7rem] mb-1">
                            Year
                        </dt>
                        <dd data-testid="fact-year" className="text-foreground">
                            {destroyer.year} CE
                        </dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-foreground/70 uppercase tracking-wider text-[0.7rem] mb-1">
                            Destroyer
                        </dt>
                        <dd data-testid="fact-destroyer" className="text-foreground">
                            {destroyer.name}{" "}
                            <span className="text-muted-foreground">({destroyer.dynasty})</span>
                        </dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-foreground/70 uppercase tracking-wider text-[0.7rem] mb-1">
                            Primary Chronicle
                        </dt>
                        <dd data-testid="fact-chronicle" className="text-foreground">
                            <em>{primarySource.chronicle}</em>
                            <span className="text-muted-foreground"> — {primarySource.author}</span>
                        </dd>
                    </div>
                    <div className="sm:col-span-2">
                        <dt className="font-semibold text-foreground/70 uppercase tracking-wider text-[0.7rem] mb-1">
                            Today on the Site
                        </dt>
                        <dd data-testid="fact-modern-status" className="text-foreground">
                            {modernStatus}
                        </dd>
                    </div>
                </dl>
            </aside>

            {/* Primary-source quotation */}
            <blockquote
                data-testid="temple-primary-quote"
                className="my-8 not-prose rounded-2xl border border-border/40 bg-card/40 p-6 md:p-7 shadow-sm"
            >
                <p className="italic text-lg leading-relaxed text-foreground/90 mb-4">
                    &ldquo;{quote}&rdquo;
                </p>
                <footer className="text-sm text-muted-foreground">
                    — <span className="font-semibold text-foreground">{primarySource.chronicle}</span>
                    , {primarySource.author}
                    {primarySource.note ? (
                        <span className="block mt-1 text-xs">{primarySource.note}</span>
                    ) : null}
                </footer>
            </blockquote>

            {/* Optional contested-claims callout */}
            {contestedNote ? (
                <aside
                    data-testid="temple-contested-note"
                    className="not-prose my-8 rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] p-6"
                >
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm leading-relaxed text-foreground/90">
                            <p className="font-semibold text-amber-300 mb-2 uppercase tracking-wider text-xs">
                                Where the evidence is contested
                            </p>
                            {contestedNote}
                        </div>
                    </div>
                </aside>
            ) : null}

            {/* Long-form narrative body */}
            <div data-testid="temple-body-slot">{bodySlot}</div>

            {/* Sources */}
            <section
                data-testid="temple-sources"
                className="not-prose mt-12 pt-8 border-t border-border/40"
            >
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookText className="w-5 h-5 text-orange-400" />
                    Sources
                </h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
                    <li>
                        <strong className="text-foreground">{primarySource.chronicle}</strong> —{" "}
                        {primarySource.author}
                        {primarySource.note ? ` (${primarySource.note})` : ""}
                    </li>
                    {kbClaimSlugs && kbClaimSlugs.length > 0 ? (
                        <li>
                            Sadhaka Knowledge Base claim file(s):{" "}
                            {kbClaimSlugs.map((slug, i) => (
                                <React.Fragment key={slug}>
                                    <code className="text-foreground text-xs bg-muted/40 px-1.5 py-0.5 rounded">
                                        {slug}
                                    </code>
                                    {i < kbClaimSlugs.length - 1 ? ", " : ""}
                                </React.Fragment>
                            ))}
                        </li>
                    ) : null}
                </ul>
            </section>
        </div>
    );
}

/**
 * Server component that renders a standardised case-page for a single
 * documented medieval temple destruction. Wraps `ArticleLayout` for full
 * SEO/JSON-LD/CMS-fallback support.
 *
 * Throws if the templeId is not in the dataset — caught by Next's error
 * boundary so the build fails loudly rather than rendering an empty card.
 */
export async function DestroyedTempleCaseLayout({
    meta,
    templeId,
    bodySlot,
    contestedNote,
    kbClaimSlugs,
}: DestroyedTempleCaseProps) {
    const temple = getDestroyedTempleById(templeId);
    if (!temple) {
        throw new Error(
            `DestroyedTempleCaseLayout: no temple found for id "${templeId}". Check src/data/templesDestroyed.ts.`,
        );
    }

    return (
        <ArticleLayout meta={meta}>
            <DestroyedTempleCaseShell
                temple={temple}
                bodySlot={bodySlot}
                contestedNote={contestedNote}
                kbClaimSlugs={kbClaimSlugs}
            />
        </ArticleLayout>
    );
}
