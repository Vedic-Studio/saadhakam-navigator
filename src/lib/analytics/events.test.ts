import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  trackStreakDay,
  trackMantraAudioPlay,
  trackPanchangView,
  trackPathStepComplete,
  trackVerseBookmark,
  trackOutboundShare,
} from "./events";

describe("analytics event wrappers", () => {
  let gtag: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    gtag = vi.fn();
    window.gtag = gtag as unknown as typeof window.gtag;
  });

  afterEach(() => {
    delete (window as { gtag?: unknown }).gtag;
    vi.restoreAllMocks();
  });

  it("trackStreakDay fires streak_day with streak_len and cluster", () => {
    trackStreakDay(7, "navagraha-mantra");
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "streak_day", {
      streak_len: 7,
      cluster: "navagraha-mantra",
    });
  });

  it("trackMantraAudioPlay fires mantra_audio_play with mantra_id, deity, duration_pct", () => {
    trackMantraAudioPlay("om-bram-brim", "budha", 100);
    expect(gtag).toHaveBeenCalledWith("event", "mantra_audio_play", {
      mantra_id: "om-bram-brim",
      deity: "budha",
      duration_pct: 100,
    });
  });

  it("trackMantraAudioPlay preserves a legitimate duration_pct of 0", () => {
    trackMantraAudioPlay("om-bram-brim", "budha", 0);
    expect(gtag).toHaveBeenCalledWith("event", "mantra_audio_play", {
      mantra_id: "om-bram-brim",
      deity: "budha",
      duration_pct: 0,
    });
  });

  it("trackPanchangView fires panchang_view with all four properties", () => {
    trackPanchangView({
      date: "2026-06-15",
      tithi: "shukla-panchami",
      vara: "budhavara",
      nakshatra: "pushya",
    });
    expect(gtag).toHaveBeenCalledWith("event", "panchang_view", {
      date: "2026-06-15",
      tithi: "shukla-panchami",
      vara: "budhavara",
      nakshatra: "pushya",
    });
  });

  it("trackPanchangView drops nakshatra when it is undefined", () => {
    trackPanchangView({ date: "2026-06-15", tithi: "shukla-panchami", vara: "budhavara" });
    expect(gtag).toHaveBeenCalledWith("event", "panchang_view", {
      date: "2026-06-15",
      tithi: "shukla-panchami",
      vara: "budhavara",
    });
    const params = gtag.mock.calls[0][2] as Record<string, unknown>;
    expect("nakshatra" in params).toBe(false);
  });

  it("trackPathStepComplete fires path_step_complete with path_id, step_n, total_steps", () => {
    trackPathStepComplete("darshanas-foundations", 3, 8);
    expect(gtag).toHaveBeenCalledWith("event", "path_step_complete", {
      path_id: "darshanas-foundations",
      step_n: 3,
      total_steps: 8,
    });
  });

  it("trackVerseBookmark fires verse_bookmark with verse_id and cluster", () => {
    trackVerseBookmark("vsn-shloka-83", "vishnu-sahasranama");
    expect(gtag).toHaveBeenCalledWith("event", "verse_bookmark", {
      verse_id: "vsn-shloka-83",
      cluster: "vishnu-sahasranama",
    });
  });

  it("trackOutboundShare fires outbound_share with platform, content_type, url", () => {
    trackOutboundShare({
      platform: "whatsapp",
      contentType: "fact_card",
      url: "https://opensadhaka.com/sanatan-history/evidence/rakhigarhi",
    });
    expect(gtag).toHaveBeenCalledWith("event", "outbound_share", {
      platform: "whatsapp",
      content_type: "fact_card",
      url: "https://opensadhaka.com/sanatan-history/evidence/rakhigarhi",
    });
  });

  it("drops empty-string properties so gtag never receives blanks", () => {
    trackVerseBookmark("bg-6-11", "");
    const params = gtag.mock.calls[0][2] as Record<string, unknown>;
    expect(params).toEqual({ verse_id: "bg-6-11" });
    expect("cluster" in params).toBe(false);
  });
});

describe("analytics event wrappers — guards", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not throw when window.gtag is absent", () => {
    delete (window as { gtag?: unknown }).gtag;
    expect(() => trackStreakDay(1, "panchang")).not.toThrow();
  });

  it("does not call a non-function gtag", () => {
    // gtag present but not callable (e.g. partially initialised dataLayer shim).
    (window as { gtag?: unknown }).gtag = {} as unknown;
    expect(() => trackStreakDay(1, "panchang")).not.toThrow();
    delete (window as { gtag?: unknown }).gtag;
  });
});
