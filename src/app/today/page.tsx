import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Flower2, Moon, Sparkles, Sun } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { TodayPanchangView } from "@/components/today/TodayPanchangView";
import { TodayPractice } from "@/components/today/TodayPractice";
import { buildBreadcrumbSchema, buildWebPageSchema, buildPageMetadata, buildUrl } from "@/lib/seo";
import { getPanchangForDate, getGrahaBySlug } from "@/lib/jyotish";
import { getMantraBySlug } from "@/data/mantras";
import { getVerseForDay, getPracticeForDay, verseHref } from "./rotation";

export const metadata: Metadata = buildPageMetadata({
    title: "Aaj ka Sadhaka — Today's Tithi, Mantra & Practice",
    description:
        "Your daily spiritual anchor. Today's tithi, vara, and nakshatra, the planetary mantra for the day with a 108 mala counter, a verse to sit with, and one practice to begin. Build a daily streak.",
    path: "/today",
});

/**
 * "Aaj ka Sadhaka" — the daily Today surface and the returning visitor's home.
 *
 * Server Component: the panchang is computed server-side with the SSR-safe
 * `getPanchangForDate(new Date())` (Varanasi civil day), and the day's mantra is
 * bound from the vara's ruling graha. The rotating verse and practice are chosen
 * by a pure date function so they are stable per day but vary daily (the variable
 * reward). All interactivity and analytics live in the client islands.
 */
export default function TodayPage() {
    const now = new Date();
    const panchang = getPanchangForDate(now);

    // Bind the day's mantra: vara -> ruling graha -> its first (beej) mantra.
    const graha = getGrahaBySlug(panchang.vara.rulingGraha);
    const mantraSlug = graha?.mantraSlugs[0];
    const mantra = mantraSlug ? getMantraBySlug(mantraSlug) : undefined;

    const verse = getVerseForDay(now);
    const practice = getPracticeForDay(now);

    // A human, locale-stable long date for the header (computed for the resolved
    // civil day so it matches the panchang, not the server's wall clock).
    const displayDate = new Date(`${panchang.date}T12:00:00Z`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Today", href: "/today" },
    ];
    const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
    const webPageSchema = buildWebPageSchema({
        name: "Aaj ka Sadhaka — Today's Tithi, Mantra & Practice",
        description:
            "Today's tithi, vara, and nakshatra, the planetary mantra for the day with a 108 mala counter, a verse to sit with, and one practice to begin.",
        url: buildUrl("/today"),
        breadcrumbItems,
    });

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Side-effect island: report the daily view exactly once. */}
            <TodayPanchangView
                date={panchang.date}
                tithi={panchang.tithi.slug}
                vara={panchang.vara.slug}
                nakshatra={panchang.nakshatra?.slug}
            />

            <Header />

            <main className="relative flex-1 overflow-hidden pt-28 pb-20">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.08),transparent_55%)]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.06),transparent_60%)]"
                />

                <div className="container-padding relative mx-auto max-w-3xl">
                    <header className="text-center">
                        <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-500/5 px-4 py-1.5 backdrop-blur-md">
                            <span className="font-sanskrit text-sm text-amber-200/90">आज का साधक</span>
                            <span className="h-1 w-1 rounded-full bg-amber-400/60" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">
                                Aaj ka Sadhaka
                            </span>
                        </div>

                        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
                            <span className="bg-gradient-to-r from-amber-200 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                                Today
                            </span>
                        </h1>
                        <p className="mt-4 text-sm uppercase tracking-[0.24em] text-muted-foreground">{displayDate}</p>
                        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                            One place to begin the day. The rhythm of the panchang, a mantra to chant, a verse to sit
                            with, and a single practice to keep the thread of sadhana unbroken.
                        </p>
                    </header>

                    <div className="mt-12 space-y-6">
                        {/* Streak + one-tap mala (the daily loop). */}
                        <section className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-md md:p-8">
                            <TodayPractice mantraName={mantra?.name ?? "the day's mantra"} />
                        </section>

                        {/* Panchang of the day. */}
                        <section className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-md md:p-8">
                            <div className="mb-5 flex items-center gap-2">
                                <Moon className="h-4 w-4 text-amber-300" aria-hidden />
                                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                                    Today&apos;s Panchang
                                </h2>
                            </div>
                            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <Link
                                    href={`/jyotish/panchang/tithis/${panchang.tithi.slug}`}
                                    className="group rounded-2xl border border-border/60 bg-background/40 p-4 transition-colors hover:border-amber-400/50"
                                >
                                    <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">Tithi</dt>
                                    <dd className="mt-1 font-display text-lg font-bold text-foreground group-hover:text-amber-200">
                                        {panchang.tithi.name}
                                    </dd>
                                    <dd className="text-xs text-muted-foreground">{panchang.tithi.paksha} Paksha</dd>
                                </Link>
                                <Link
                                    href={`/jyotish/panchang/varas/${panchang.vara.slug}`}
                                    className="group rounded-2xl border border-border/60 bg-background/40 p-4 transition-colors hover:border-amber-400/50"
                                >
                                    <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">Vara</dt>
                                    <dd className="mt-1 font-display text-lg font-bold text-foreground group-hover:text-amber-200">
                                        {panchang.vara.name}
                                    </dd>
                                    <dd className="text-xs text-muted-foreground">
                                        {graha ? `Ruled by ${graha.name}` : "Weekday"}
                                    </dd>
                                </Link>
                                {panchang.nakshatra ? (
                                    <Link
                                        href={`/jyotish/nakshatras/${panchang.nakshatra.slug}`}
                                        className="group rounded-2xl border border-border/60 bg-background/40 p-4 transition-colors hover:border-amber-400/50"
                                    >
                                        <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
                                            Nakshatra
                                        </dt>
                                        <dd className="mt-1 font-display text-lg font-bold text-foreground group-hover:text-amber-200">
                                            {panchang.nakshatra.name}
                                        </dd>
                                        <dd className="text-xs text-muted-foreground">Lunar mansion</dd>
                                    </Link>
                                ) : (
                                    <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                                        <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
                                            Nakshatra
                                        </dt>
                                        <dd className="mt-1 font-display text-lg font-bold text-muted-foreground">—</dd>
                                    </div>
                                )}
                            </dl>
                            <p className="mt-4 text-xs text-muted-foreground">
                                Computed for Varanasi (Kashi), the tradition&apos;s reference horizon.{" "}
                                <Link href="/vedic-clock" className="text-amber-300 underline-offset-4 hover:underline">
                                    See the live Vedic clock
                                </Link>
                                .
                            </p>
                        </section>

                        {/* The day's planetary mantra (header for the practice loop above). */}
                        {mantra && (
                            <section className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-md md:p-8">
                                <div className="mb-4 flex items-center gap-2">
                                    <Sun className="h-4 w-4 text-amber-300" aria-hidden />
                                    <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                                        Mantra of the Day
                                    </h2>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {graha ? `${graha.name}, the graha of ${panchang.vara.name}` : panchang.vara.name}
                                </p>
                                {mantra.devanagari && (
                                    <p className="mt-3 font-serif text-2xl leading-relaxed text-foreground md:text-3xl">
                                        {mantra.devanagari}
                                    </p>
                                )}
                                <p className="mt-2 text-sm text-muted-foreground">{mantra.transliteration}</p>
                                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                                    {mantra.oneLineMeaning}
                                </p>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Tap the bead above with each repetition. One full round is 108. The first tap keeps
                                    today&apos;s streak alive.
                                </p>
                                <Link
                                    href={`/mantras/${mantra.slug}`}
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 underline-offset-4 hover:underline"
                                >
                                    Meaning, pronunciation, and method
                                    <ArrowRight className="h-4 w-4" aria-hidden />
                                </Link>
                            </section>
                        )}

                        {/* Rotating verse — the variable daily reward. */}
                        <section className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-md md:p-8">
                            <div className="mb-4 flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-amber-300" aria-hidden />
                                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                                    Verse for Today
                                </h2>
                            </div>
                            <p className="font-display text-xl leading-relaxed text-foreground md:text-2xl">
                                &ldquo;{verse.gloss}&rdquo;
                            </p>
                            <p className="mt-3 text-sm text-muted-foreground">
                                Bhagavad Gita {verse.chapter}.{verse.verse}
                            </p>
                            <Link
                                href={verseHref(verse)}
                                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 underline-offset-4 hover:underline"
                            >
                                Read the verse, word by word
                                <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                        </section>

                        {/* Rotating practice — one small thing to do today. */}
                        <section className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-md md:p-8">
                            <div className="mb-4 flex items-center gap-2">
                                <Flower2 className="h-4 w-4 text-amber-300" aria-hidden />
                                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                                    Practice for Today
                                </h2>
                            </div>
                            <p className="font-display text-xl font-bold text-foreground">{practice.title}</p>
                            <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{practice.prompt}</p>
                            <Link
                                href={practice.href}
                                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 underline-offset-4 hover:underline"
                            >
                                How to begin
                                <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                        </section>

                        <div className="flex items-center justify-center gap-2 pt-2 text-center text-xs text-muted-foreground">
                            <Sparkles className="h-3.5 w-3.5 text-amber-400/70" aria-hidden />
                            <span>Come back tomorrow. The verse and practice change with the day.</span>
                        </div>

                        <JyotishDisclaimer compact />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
