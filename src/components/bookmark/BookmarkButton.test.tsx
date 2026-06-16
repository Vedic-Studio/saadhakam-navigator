import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookmarkButton } from "./BookmarkButton";
import { USER_STATE_STORAGE_KEY, readUserState } from "@/lib/userState";

function gtagMock() {
  return (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag;
}

describe("BookmarkButton", () => {
  beforeEach(() => {
    window.localStorage.clear();
    (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the un-saved state initially (server-equivalent empty state)", () => {
    render(<BookmarkButton verseId="bg-2-47" cluster="bhagavad-gita" />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(btn).toHaveTextContent("Save");
  });

  it("saving persists the bookmark AND fires verse_bookmark with correct args", () => {
    render(<BookmarkButton verseId="bg-2-47" cluster="bhagavad-gita" />);
    fireEvent.click(screen.getByRole("button"));

    // 1) persisted through the foundation store
    const saved = readUserState().bookmarks;
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({
      verseId: "bg-2-47",
      cluster: "bhagavad-gita",
    });

    // 2) analytics fired separately
    expect(gtagMock()).toHaveBeenCalledWith("event", "verse_bookmark", {
      verse_id: "bg-2-47",
      cluster: "bhagavad-gita",
    });

    // and the button now reflects the saved state
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button")).toHaveTextContent("Saved");
  });

  it("un-saving removes the bookmark and does NOT fire another event", () => {
    render(<BookmarkButton verseId="bg-2-47" cluster="bhagavad-gita" />);
    fireEvent.click(screen.getByRole("button")); // save
    expect(gtagMock()).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button")); // un-save
    expect(readUserState().bookmarks).toHaveLength(0);
    expect(gtagMock()).toHaveBeenCalledTimes(1); // no event on remove
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("hydrates an already-saved verse from storage on mount", () => {
    window.localStorage.setItem(
      USER_STATE_STORAGE_KEY,
      JSON.stringify({
        streak: { count: 0, lastActiveYmd: null, graceUsed: false },
        bookmarks: [
          { verseId: "vsn-shloka-83", cluster: "vishnu-sahasranama", savedAt: 1 },
        ],
      }),
    );
    render(<BookmarkButton verseId="vsn-shloka-83" cluster="vishnu-sahasranama" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("uses the label in the accessible name", () => {
    render(
      <BookmarkButton verseId="bg-2-47" cluster="bhagavad-gita" label="shloka" />,
    );
    expect(
      screen.getByRole("button", { name: /Save this shloka/ }),
    ).toBeInTheDocument();
  });

  it("keeps two different verses independent", () => {
    const { rerender } = render(
      <BookmarkButton verseId="bg-2-47" cluster="bhagavad-gita" />,
    );
    fireEvent.click(screen.getByRole("button")); // save bg-2-47

    rerender(
      <BookmarkButton verseId="vsn-shloka-1" cluster="vishnu-sahasranama" />,
    );
    // The second verse is not saved yet.
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(screen.getByRole("button")); // save vsn-shloka-1
    const ids = readUserState().bookmarks.map((b) => b.verseId);
    expect(ids).toEqual(["bg-2-47", "vsn-shloka-1"]);
  });
});
