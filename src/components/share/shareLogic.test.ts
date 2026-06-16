import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildTwitterUrl,
  buildWhatsAppUrl,
  buildShareUrl,
  canUseWebShare,
  copyToClipboard,
  performShare,
  shareToPlatform,
  tryNativeShare,
  type PerformShareArgs,
  type SharePayload,
} from "./shareLogic";

const payload: SharePayload = {
  title: "Rakhigarhi is bigger than Mohenjo-daro",
  text: "Rakhigarhi spans ~350 hectares vs Mohenjo-daro's ~250. The largest Indus-Saraswati city sits on the Saraswati, not the Indus.",
  url: "https://www.opensadhaka.com/sanatan-history/evidence/rakhigarhi-largest-site",
};

describe("share URL builders", () => {
  it("puts the URL in the dedicated twitter `url` param and keeps text link-free", () => {
    const url = buildTwitterUrl(payload, ["SanatanHistory", "Rakhigarhi"]);
    const parsed = new URL(url);
    expect(parsed.origin + parsed.pathname).toBe(
      "https://twitter.com/intent/tweet",
    );
    expect(parsed.searchParams.get("url")).toBe(payload.url);
    expect(parsed.searchParams.get("text")).toBe(payload.text);
    // text must not also embed the URL (would double-print the link in tweets)
    expect(parsed.searchParams.get("text")).not.toContain(payload.url);
  });

  it("normalises hashtags (strips leading # and blanks) into a comma list", () => {
    const url = buildTwitterUrl(payload, ["#SanatanHistory", " ", "Dwarka"]);
    expect(new URL(url).searchParams.get("hashtags")).toBe(
      "SanatanHistory,Dwarka",
    );
  });

  it("omits the hashtags param entirely when none are given", () => {
    const url = buildTwitterUrl(payload, []);
    expect(new URL(url).searchParams.has("hashtags")).toBe(false);
  });

  it("joins text + url into a single WhatsApp message", () => {
    const url = buildWhatsAppUrl(payload);
    const parsed = new URL(url);
    expect(parsed.origin + parsed.pathname).toBe("https://wa.me/");
    expect(parsed.searchParams.get("text")).toBe(
      `${payload.text} ${payload.url}`,
    );
  });

  it("buildShareUrl dispatches to the right builder per platform", () => {
    expect(buildShareUrl("twitter", payload)).toContain(
      "twitter.com/intent/tweet",
    );
    expect(buildShareUrl("whatsapp", payload)).toContain("wa.me");
  });
});

describe("canUseWebShare", () => {
  it("is true only when navigator.share is a function", () => {
    expect(canUseWebShare({ share: vi.fn() } as unknown as Navigator)).toBe(
      true,
    );
    expect(canUseWebShare({} as Navigator)).toBe(false);
    expect(canUseWebShare(undefined)).toBe(false);
  });
});

describe("tryNativeShare", () => {
  it("reports shared:true when navigator.share resolves", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const res = await tryNativeShare({
      payload,
      nav: { share } as unknown as Navigator,
    });
    expect(res).toEqual({ available: true, shared: true });
    expect(share).toHaveBeenCalledWith({
      title: payload.title,
      text: payload.text,
      url: payload.url,
    });
  });

  it("reports shared:false (not an error) when the user cancels (AbortError)", async () => {
    const share = vi
      .fn()
      .mockRejectedValue(new DOMException("cancelled", "AbortError"));
    const res = await tryNativeShare({
      payload,
      nav: { share } as unknown as Navigator,
    });
    expect(res).toEqual({ available: true, shared: false });
  });

  it("reports available:false when Web Share is absent", async () => {
    const res = await tryNativeShare({ payload, nav: {} as Navigator });
    expect(res).toEqual({ available: false, shared: false });
  });
});

describe("performShare (1-tap native path)", () => {
  it("emits native_share exactly once when the OS confirms the share", async () => {
    const emit = vi.fn();
    const share = vi.fn().mockResolvedValue(undefined);
    const args: PerformShareArgs = {
      payload,
      contentType: "fact_card",
      nav: { share } as unknown as Navigator,
      emit,
    };
    const res = await performShare(args);
    expect(res).toEqual({ usedNative: true, shared: true });
    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith("native_share");
  });

  it("emits NOTHING when the user cancels the native sheet", async () => {
    const emit = vi.fn();
    const share = vi
      .fn()
      .mockRejectedValue(new DOMException("cancelled", "AbortError"));
    const res = await performShare({
      payload,
      contentType: "fact_card",
      nav: { share } as unknown as Navigator,
      emit,
    });
    expect(res).toEqual({ usedNative: true, shared: false });
    expect(emit).not.toHaveBeenCalled();
  });

  it("signals usedNative:false (and emits nothing) when Web Share is unsupported", async () => {
    const emit = vi.fn();
    const res = await performShare({
      payload,
      contentType: "fact_card",
      nav: {} as Navigator,
      emit,
    });
    expect(res).toEqual({ usedNative: false, shared: false });
    expect(emit).not.toHaveBeenCalled();
  });
});

describe("shareToPlatform (explicit fallbacks)", () => {
  it("opens the twitter intent and emits platform=twitter once", async () => {
    const emit = vi.fn();
    const openUrl = vi.fn();
    const res = await shareToPlatform("twitter", {
      payload,
      contentType: "fact_card",
      hashtags: ["SanatanHistory"],
      openUrl,
      emit,
    });
    expect(res.ok).toBe(true);
    expect(openUrl).toHaveBeenCalledTimes(1);
    expect(openUrl.mock.calls[0][0]).toContain("twitter.com/intent/tweet");
    expect(emit).toHaveBeenCalledOnce();
    expect(emit).toHaveBeenCalledWith("twitter");
  });

  it("opens the whatsapp intent and emits platform=whatsapp once", async () => {
    const emit = vi.fn();
    const openUrl = vi.fn();
    await shareToPlatform("whatsapp", {
      payload,
      contentType: "fact_card",
      openUrl,
      emit,
    });
    expect(openUrl.mock.calls[0][0]).toContain("wa.me");
    expect(emit).toHaveBeenCalledOnce();
    expect(emit).toHaveBeenCalledWith("whatsapp");
  });

  it("writes to the clipboard and emits platform=copy_link once", async () => {
    const emit = vi.fn();
    const writeText = vi.fn().mockResolvedValue(undefined);
    const res = await shareToPlatform("copy_link", {
      payload,
      contentType: "fact_card",
      nav: { clipboard: { writeText } } as unknown as Navigator,
      emit,
    });
    expect(writeText).toHaveBeenCalledWith(payload.url);
    expect(res.ok).toBe(true);
    expect(emit).toHaveBeenCalledOnce();
    expect(emit).toHaveBeenCalledWith("copy_link");
  });

  it("still emits copy_link (ok:false) when the Clipboard API is unavailable", async () => {
    const emit = vi.fn();
    const res = await shareToPlatform("copy_link", {
      payload,
      contentType: "fact_card",
      nav: {} as Navigator,
      emit,
    });
    expect(res.ok).toBe(false);
    expect(emit).toHaveBeenCalledOnce();
    expect(emit).toHaveBeenCalledWith("copy_link");
  });

  it("does NOT open a URL for copy_link", async () => {
    const openUrl = vi.fn();
    await shareToPlatform("copy_link", {
      payload,
      contentType: "fact_card",
      nav: { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } } as unknown as Navigator,
      openUrl,
      emit: vi.fn(),
    });
    expect(openUrl).not.toHaveBeenCalled();
  });
});

describe("copyToClipboard", () => {
  it("returns false (no throw) when writeText rejects", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    const ok = await copyToClipboard(payload.url, {
      clipboard: { writeText },
    } as unknown as Navigator);
    expect(ok).toBe(false);
  });
});

describe("end-to-end analytics wiring through window.gtag", () => {
  // This verifies the DEFAULT emit path (no `emit` seam) actually calls
  // window.gtag with the foundation's outbound_share contract, since the whole
  // point of the feature is firing that event with content_type: fact_card.
  beforeEach(() => {
    (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag = vi.fn();
  });
  afterEach(() => {
    delete (window as unknown as { gtag?: unknown }).gtag;
  });

  it("fires outbound_share with platform=copy_link and content_type=fact_card", async () => {
    const gtag = (window as unknown as { gtag: ReturnType<typeof vi.fn> })
      .gtag;
    await shareToPlatform("copy_link", {
      payload,
      contentType: "fact_card",
      nav: { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } } as unknown as Navigator,
    });
    expect(gtag).toHaveBeenCalledWith("event", "outbound_share", {
      platform: "copy_link",
      content_type: "fact_card",
      url: payload.url,
    });
  });

  it("fires outbound_share with platform=native_share when native share completes", async () => {
    const gtag = (window as unknown as { gtag: ReturnType<typeof vi.fn> })
      .gtag;
    await performShare({
      payload,
      contentType: "fact_card",
      nav: { share: vi.fn().mockResolvedValue(undefined) } as unknown as Navigator,
    });
    expect(gtag).toHaveBeenCalledWith("event", "outbound_share", {
      platform: "native_share",
      content_type: "fact_card",
      url: payload.url,
    });
  });
});
