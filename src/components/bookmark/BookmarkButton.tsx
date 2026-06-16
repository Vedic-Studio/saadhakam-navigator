"use client";

/**
 * Verse bookmark (save) button.
 *
 * Wraps the foundation `useBookmarks()` hook. The store NEVER fires analytics,
 * so this component performs the two-call sequence the foundation mandates:
 *   1. useBookmarks().toggle(verseId, cluster)  — persist
 *   2. trackVerseBookmark(verseId, cluster)      — fire, ONLY on an add
 * We read `isBookmarked` before toggling to decide which way the toggle goes, so
 * the `verse_bookmark` event fires on a save and not on an un-save.
 *
 * SSR-safe: `useBookmarks` returns `false`/empty until it hydrates in an effect,
 * so the server render and first client render agree (the button just shows the
 * un-saved state until mount, then corrects). 'use client' is required.
 */

import { useCallback } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookmarks } from "@/lib/userState";
import { trackVerseBookmark } from "@/lib/analytics/events";

export interface BookmarkButtonProps {
  /** Stable verse id, e.g. `bg-6-11` or `vsn-shloka-83`. */
  verseId: string;
  /** Content-cluster id, e.g. `bhagavad-gita` or `vishnu-sahasranama`. */
  cluster: string;
  /** Short label for the thing being saved (used in the accessible name). */
  label?: string;
  className?: string;
}

export function BookmarkButton({
  verseId,
  cluster,
  label = "verse",
  className,
}: BookmarkButtonProps) {
  const { isBookmarked, toggle } = useBookmarks();
  const saved = isBookmarked(verseId);

  const handleClick = useCallback(() => {
    const wasSaved = isBookmarked(verseId);

    // 1) persist via the foundation store (does not fire analytics)
    toggle(verseId, cluster);

    // 2) fire the event SEPARATELY, only when this toggle is a save (add).
    if (!wasSaved) {
      trackVerseBookmark(verseId, cluster);
    }
  }, [verseId, cluster, isBookmarked, toggle]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={
        saved ? `Remove this ${label} from saved` : `Save this ${label}`
      }
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        saved
          ? "border-amber-500/50 bg-amber-500/10 text-amber-600 hover:bg-amber-500/15"
          : "border-border/60 bg-background text-muted-foreground hover:border-border hover:text-foreground",
        className,
      )}
    >
      {saved ? (
        <>
          <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
          Saved
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" aria-hidden="true" />
          Save
        </>
      )}
    </button>
  );
}
