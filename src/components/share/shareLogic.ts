/**
 * Pure, SSR-safe share helpers for the 1-tap ShareButton.
 *
 * This module holds the logic worth testing in isolation: building each
 * platform's intent URL and dispatching a share while firing the
 * `outbound_share` event exactly once with the correct platform. The React
 * component (`ShareButton.tsx`) is a thin `'use client'` wrapper around
 * `performShare` / `shareToPlatform`.
 *
 * SSR-safety: no module-top-level or render-time access to `window` /
 * `navigator`. Every such access happens inside a function the component calls
 * from an event handler, and each browser global is read lazily at call time.
 */

import {
  trackOutboundShare,
  type SharePlatform,
  type ShareContentType,
} from "@/lib/analytics/events";

/** The shareable content, resolved by the caller (server or client). */
export interface SharePayload {
  /** Short, argument-winning headline. Becomes the native-share `title`. */
  title: string;
  /** One-line share text (the fact + why it matters). Native-share `text`. */
  text: string;
  /** Absolute URL to the page the card lives on. */
  url: string;
}

/** Platforms a user can explicitly pick (everything except the native sheet). */
export type ExplicitSharePlatform = Exclude<SharePlatform, "native_share">;

/**
 * Build the `twitter.com/intent/tweet` URL. Twitter renders the URL itself from
 * the dedicated `url` param, so `text` stays clean (no trailing link). Hashtags
 * reinforce the civilizational-evidence identity of the share.
 */
export function buildTwitterUrl(
  payload: SharePayload,
  hashtags: string[] = [],
): string {
  const params = new URLSearchParams({
    text: payload.text,
    url: payload.url,
  });
  const tags = hashtags.map((t) => t.replace(/^#/, "").trim()).filter(Boolean);
  if (tags.length > 0) {
    params.set("hashtags", tags.join(","));
  }
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * Build the WhatsApp share URL. WhatsApp accepts a single `text` blob, so the
 * share text and the URL are joined into one message.
 */
export function buildWhatsAppUrl(payload: SharePayload): string {
  const message = `${payload.text} ${payload.url}`;
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/?${params.toString()}`;
}

/** Build the intent URL for a link-opening platform (twitter | whatsapp). */
export function buildShareUrl(
  platform: Extract<ExplicitSharePlatform, "twitter" | "whatsapp">,
  payload: SharePayload,
  hashtags: string[] = [],
): string {
  return platform === "twitter"
    ? buildTwitterUrl(payload, hashtags)
    : buildWhatsAppUrl(payload);
}

/** Resolve the navigator without throwing on the server. */
function resolveNavigator(): Navigator | undefined {
  if (typeof navigator === "undefined") return undefined;
  return navigator;
}

/** Whether the Web Share API is usable in this environment. */
export function canUseWebShare(
  nav: Pick<Navigator, "share"> | undefined = resolveNavigator(),
): boolean {
  return !!nav && typeof nav.share === "function";
}

/** Open a URL in a new tab (the default `openUrl`). */
function defaultOpenUrl(url: string): void {
  if (typeof window === "undefined") return;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Arguments accepted by the share dispatchers. `contentType` is fixed to
 * `fact_card` at this feature's call sites but kept general.
 *
 * The `nav` / `openUrl` / `emit` fields are injectable seams for tests; in
 * production they default to the real browser globals (read at call time) and
 * the real `trackOutboundShare`.
 */
export interface PerformShareArgs {
  payload: SharePayload;
  contentType: ShareContentType;
  /** Hashtags for the Twitter intent (with or without a leading '#'). */
  hashtags?: string[];
  /** Test seam: navigator-like object. Defaults to the real `navigator`. */
  nav?: Pick<Navigator, "share" | "clipboard"> | undefined;
  /** Test seam: URL opener. Defaults to `window.open(..., _blank)`. */
  openUrl?: (url: string) => void;
  /** Test seam: analytics emit. Defaults to `trackOutboundShare`. */
  emit?: (platform: SharePlatform) => void;
}

/** Fire `outbound_share` with the resolved platform + content type + url. */
function emitShare(platform: SharePlatform, args: PerformShareArgs): void {
  if (args.emit) {
    args.emit(platform);
    return;
  }
  trackOutboundShare({
    platform,
    contentType: args.contentType,
    url: args.payload.url,
  });
}

/**
 * Attempt the native Web Share sheet. Resolves to `{ available, shared }`:
 * `available` is false when the Web Share API is absent (caller should fall
 * back); `shared` is true only when the OS reported a completed share, so a
 * cancelled sheet (AbortError) never over-counts.
 */
export async function tryNativeShare(args: {
  payload: SharePayload;
  nav?: Pick<Navigator, "share"> | undefined;
}): Promise<{ available: boolean; shared: boolean }> {
  const nav = args.nav ?? resolveNavigator();
  if (!canUseWebShare(nav)) {
    return { available: false, shared: false };
  }
  try {
    await nav!.share({
      title: args.payload.title,
      text: args.payload.text,
      url: args.payload.url,
    });
    return { available: true, shared: true };
  } catch {
    // AbortError = user dismissed the sheet. Any throw means nothing was
    // shared, so we do not fire analytics and let the caller reveal fallbacks.
    return { available: true, shared: false };
  }
}

/** Copy a URL to the clipboard, SSR-safe. Returns whether the write succeeded. */
export async function copyToClipboard(
  url: string,
  nav: Pick<Navigator, "clipboard"> | undefined = resolveNavigator(),
): Promise<boolean> {
  if (!nav || !nav.clipboard || typeof nav.clipboard.writeText !== "function") {
    return false;
  }
  try {
    await nav.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fire a share to a specific (non-native) platform and emit the event exactly
 * once with that platform. Used by the explicit fallback buttons.
 *
 * For `copy_link` the event fires on the user's click regardless of whether the
 * Clipboard API was reachable (it is gesture-driven and succeeds in real
 * browsers); `ok` reports whether the write itself succeeded.
 */
export async function shareToPlatform(
  platform: ExplicitSharePlatform,
  args: PerformShareArgs,
): Promise<{ ok: boolean }> {
  const openUrl = args.openUrl ?? defaultOpenUrl;

  if (platform === "copy_link") {
    const ok = await copyToClipboard(
      args.payload.url,
      args.nav as Navigator | undefined,
    );
    emitShare("copy_link", args);
    return { ok };
  }

  const url = buildShareUrl(platform, args.payload, args.hashtags ?? []);
  openUrl(url);
  emitShare(platform, args);
  return { ok: true };
}

/**
 * The 1-tap entry point. Tries the native share sheet first; only emits
 * `native_share` when the OS confirms a completed share. Returns the outcome so
 * the component can decide whether to reveal explicit fallback buttons.
 *
 * - `usedNative: false` -> Web Share unsupported; show fallbacks.
 * - `usedNative: true, shared: false` -> user cancelled; emit nothing.
 * - `usedNative: true, shared: true` -> `native_share` emitted once.
 */
export async function performShare(
  args: PerformShareArgs,
): Promise<{ usedNative: boolean; shared: boolean }> {
  const result = await tryNativeShare({
    payload: args.payload,
    nav: args.nav as Navigator | undefined,
  });
  if (!result.available) {
    return { usedNative: false, shared: false };
  }
  if (result.shared) {
    emitShare("native_share", args);
  }
  return { usedNative: true, shared: result.shared };
}
