/**
 * Public surface of the client user-state store (Phase 2 foundation).
 *
 * Feature components should import hooks from here:
 *   import { useStreak, useBookmarks, useVisitCount } from "@/lib/userState";
 *
 * Pure functions and the persistence accessors are also re-exported for tests
 * and for any non-React caller. The grace-day rule lives in `recordActiveDay`
 * (see `./streak`). See docs/agents/phase2-foundation-api.md for the contract.
 */

export { useStreak, useBookmarks, useVisitCount } from "@/lib/userState/hooks";

export {
  recordActiveDay,
  calendarDaysBetween,
  INITIAL_STREAK_STATE,
  type StreakState,
} from "@/lib/userState/streak";

export {
  addBookmark,
  removeBookmark,
  toggleBookmark,
  hasBookmark,
  normalizeBookmarks,
  type Bookmark,
} from "@/lib/userState/bookmarks";

export {
  USER_STATE_STORAGE_KEY,
  RETURN_VISIT_STORAGE_KEY,
  createInitialUserState,
  normalizeUserState,
  readUserState,
  writeUserState,
  readVisitCount,
  type UserState,
} from "@/lib/userState/storage";
