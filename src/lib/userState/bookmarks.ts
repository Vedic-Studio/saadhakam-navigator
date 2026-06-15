/**
 * Pure verse-bookmark set operations for the client user-state store.
 *
 * No side effects: the caller owns persistence and analytics. Bookmarks are a
 * list de-duplicated by `verseId`; the first save of a given verse wins (its
 * `savedAt` and `cluster` are kept), so toggling on then off then on again does
 * not silently mutate the original timestamp within a single add. Order is
 * insertion order (oldest first) so callers can render a stable saved list.
 */

/** A single saved verse. */
export type Bookmark = {
  /** Verse id, e.g. `bg-6-11` or `vsn-shloka-83`. Unique key for dedupe. */
  verseId: string;
  /** Content-cluster id the verse belongs to, e.g. `bhagavad-gita`. */
  cluster: string;
  /** Epoch-ms when the verse was first bookmarked. */
  savedAt: number;
};

/** True when `verseId` is already bookmarked. */
export function hasBookmark(bookmarks: Bookmark[], verseId: string): boolean {
  return bookmarks.some((bookmark) => bookmark.verseId === verseId);
}

/**
 * Add a bookmark. Idempotent: if `verseId` is already present the list is
 * returned unchanged (the existing entry, including its `savedAt`, is kept).
 *
 * @param savedAt Epoch-ms to stamp on a newly added bookmark. Defaults to now.
 */
export function addBookmark(
  bookmarks: Bookmark[],
  verseId: string,
  cluster: string,
  savedAt: number = Date.now(),
): Bookmark[] {
  if (hasBookmark(bookmarks, verseId)) {
    return bookmarks;
  }
  return [...bookmarks, { verseId, cluster, savedAt }];
}

/**
 * Remove a bookmark by `verseId`. Returns the same array reference unchanged
 * when the verse is not present, so callers can skip a needless write.
 */
export function removeBookmark(bookmarks: Bookmark[], verseId: string): Bookmark[] {
  if (!hasBookmark(bookmarks, verseId)) {
    return bookmarks;
  }
  return bookmarks.filter((bookmark) => bookmark.verseId !== verseId);
}

/**
 * Toggle a bookmark: remove it when present, otherwise add it. Returns the next
 * list. Pair with `hasBookmark` on the result to know which way it went.
 *
 * @param savedAt Epoch-ms to stamp when the toggle results in an add.
 */
export function toggleBookmark(
  bookmarks: Bookmark[],
  verseId: string,
  cluster: string,
  savedAt: number = Date.now(),
): Bookmark[] {
  if (hasBookmark(bookmarks, verseId)) {
    return removeBookmark(bookmarks, verseId);
  }
  return addBookmark(bookmarks, verseId, cluster, savedAt);
}

/**
 * Coerce arbitrary stored input into a clean, de-duplicated Bookmark list. Drops
 * entries that are not objects or lack a usable `verseId`/`cluster`, and keeps
 * the first occurrence of each `verseId`. Used by the persistence layer when
 * reading possibly-corrupt localStorage.
 */
export function normalizeBookmarks(stored: unknown): Bookmark[] {
  if (!Array.isArray(stored)) {
    return [];
  }
  const seen = new Set<string>();
  const result: Bookmark[] = [];
  for (const item of stored) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const candidate = item as Record<string, unknown>;
    const verseId = candidate.verseId;
    const cluster = candidate.cluster;
    if (typeof verseId !== "string" || verseId.length === 0) {
      continue;
    }
    if (typeof cluster !== "string" || cluster.length === 0) {
      continue;
    }
    if (seen.has(verseId)) {
      continue;
    }
    const savedAt =
      typeof candidate.savedAt === "number" && Number.isFinite(candidate.savedAt)
        ? candidate.savedAt
        : 0;
    seen.add(verseId);
    result.push({ verseId, cluster, savedAt });
  }
  return result;
}
