/**
 * Typed, SSR-safe wrappers for the six DEFERRED growth-instrumentation events.
 *
 * This is the canonical TypeScript contract for those events. Feature components
 * import these wrappers and call them from event handlers; they must NOT be
 * inlined into the layout.tsx bridge (that inline script cannot import modules).
 * Each wrapper mirrors `src/components/AnalyticsTracker.tsx`: it guards
 * `typeof window`, calls `window.gtag?.('event', name, params)`, and drops
 * properties whose value is undefined (gtag itself drops undefined, so this keeps
 * payloads clean and matches the taxonomy's "value || undefined" convention).
 *
 * Event names and properties match docs/analytics/event-taxonomy.md EXACTLY. Keep
 * the two in sync. A legitimate numeric 0 (for example duration_pct: 0) is kept;
 * only undefined and empty-string optionals are dropped.
 */

/** Where an outbound share went. */
export type SharePlatform =
  | "twitter"
  | "whatsapp"
  | "facebook"
  | "copy_link"
  | "native_share"
  | "other";

/** The kind of content that was shared. */
export type ShareContentType =
  | "comparison"
  | "fact_card"
  | "article"
  | "verse"
  | "mantra";

/**
 * Fire a gtag event, SSR-safe, dropping properties whose value is undefined or an
 * empty string. Numeric zero is preserved (gtag keeps 0; it only drops undefined).
 */
function sendEvent(name: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined") {
    return;
  }
  if (typeof window.gtag !== "function") {
    return;
  }
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") {
      continue;
    }
    clean[key] = value;
  }
  window.gtag("event", name, clean);
}

/**
 * `streak_day` — fires once per day when the user completes the daily practice.
 * Persona 1 (Practitioner), HABIT loop.
 *
 * @param streakLen Current consecutive-day streak length including today (>= 1).
 * @param cluster   Content-cluster id the day's practice belonged to.
 */
export function trackStreakDay(streakLen: number, cluster: string): void {
  sendEvent("streak_day", {
    streak_len: streakLen,
    cluster: cluster || undefined,
  });
}

/**
 * `mantra_audio_play` — fires when mantra audio is played (and on progress
 * milestones via durationPct). Persona 1 (Practitioner), HABIT loop.
 *
 * @param mantraId    Mantra slug, e.g. `om-bram-brim`.
 * @param deity       Planetary deity / graha the mantra addresses, e.g. `budha`.
 * @param durationPct Percent of audio listened to at fire time (0 to 100).
 */
export function trackMantraAudioPlay(
  mantraId: string,
  deity: string,
  durationPct: number,
): void {
  sendEvent("mantra_audio_play", {
    mantra_id: mantraId || undefined,
    deity: deity || undefined,
    duration_pct: durationPct,
  });
}

/** Arguments for `trackPanchangView`, mirroring the panchang_view properties. */
export type PanchangViewParams = {
  /** ISO date YYYY-MM-DD being viewed. */
  date: string;
  /** Tithi name (or slug), e.g. `shukla-panchami`. */
  tithi: string;
  /** Vara / weekday name, e.g. `budhavara`. */
  vara: string;
  /** Nakshatra name, e.g. `pushya`. Optional; dropped when absent. */
  nakshatra?: string;
};

/**
 * `panchang_view` — fires on view of a Panchang / Today surface. Defines the
 * daily-return cohort. Persona 1 (Practitioner), HABIT / daily-return loop.
 */
export function trackPanchangView({ date, tithi, vara, nakshatra }: PanchangViewParams): void {
  sendEvent("panchang_view", {
    date: date || undefined,
    tithi: tithi || undefined,
    vara: vara || undefined,
    nakshatra: nakshatra || undefined,
  });
}

/**
 * `path_step_complete` — fires when a learning-path step is marked complete.
 * Persona 2 (Verse Student), MASTERY-PATH loop.
 *
 * @param pathId     Learning-path slug.
 * @param stepN      The step just completed, 1-indexed (>= 1).
 * @param totalSteps Total steps in the path, for goal-gradient progress (>= 1).
 */
export function trackPathStepComplete(
  pathId: string,
  stepN: number,
  totalSteps: number,
): void {
  sendEvent("path_step_complete", {
    path_id: pathId || undefined,
    step_n: stepN,
    total_steps: totalSteps,
  });
}

/**
 * `verse_bookmark` — fires when a user bookmarks (saves) a verse.
 * Persona 2 (Verse Student), MASTERY-PATH loop.
 *
 * @param verseId Verse id, e.g. `bg-6-11` or `vsn-shloka-83`.
 * @param cluster Content-cluster id the verse belongs to.
 */
export function trackVerseBookmark(verseId: string, cluster: string): void {
  sendEvent("verse_bookmark", {
    verse_id: verseId || undefined,
    cluster: cluster || undefined,
  });
}

/** Arguments for `trackOutboundShare`, mirroring the outbound_share properties. */
export type OutboundShareParams = {
  /** The share destination. */
  platform: SharePlatform;
  /** The kind of content shared. */
  contentType: ShareContentType;
  /** The URL that was shared (absolute or path). */
  url: string;
};

/**
 * `outbound_share` — fires when content is shared outward. Persona 3
 * (Civilizational Arguer), IDENTITY-SHARE loop.
 */
export function trackOutboundShare({ platform, contentType, url }: OutboundShareParams): void {
  sendEvent("outbound_share", {
    platform: platform || undefined,
    content_type: contentType || undefined,
    url: url || undefined,
  });
}
