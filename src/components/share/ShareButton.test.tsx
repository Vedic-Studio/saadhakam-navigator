import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ShareButton } from "./ShareButton";
import type { SharePayload } from "./shareLogic";

const payload: SharePayload = {
  title: "Rakhigarhi vs Mohenjo-daro",
  text: "Rakhigarhi (~350 ha) is larger than Mohenjo-daro (~250 ha).",
  url: "https://www.opensadhaka.com/sanatan-history/evidence/rakhigarhi-largest-site",
};

type GtagWindow = typeof window & { gtag: ReturnType<typeof vi.fn> };
type ShareNav = Navigator & {
  share?: (data: ShareData) => Promise<void>;
  clipboard: { writeText: (t: string) => Promise<void> };
};

function setGtag() {
  const gtag = vi.fn();
  (window as GtagWindow).gtag = gtag;
  return gtag;
}

afterEach(() => {
  vi.restoreAllMocks();
  delete (window as Partial<GtagWindow>).gtag;
  // Remove any share stub we attached so tests don't leak the API into each other.
  // (jsdom has no navigator.share by default.)
  // @ts-expect-error -- deleting an optional we added in a test
  delete (navigator as ShareNav).share;
});

describe("ShareButton — native path", () => {
  beforeEach(() => {
    // Simulate a device WITH the Web Share API (e.g. mobile Safari/Chrome).
    Object.defineProperty(navigator, "share", {
      configurable: true,
      writable: true,
      value: vi.fn().mockResolvedValue(undefined),
    });
  });

  it("fires outbound_share native_share with content_type=fact_card on tap", async () => {
    const gtag = setGtag();
    render(<ShareButton payload={payload} />);

    fireEvent.click(screen.getByRole("button", { name: /share this fact/i }));

    await waitFor(() => {
      expect((navigator as ShareNav).share).toHaveBeenCalledWith({
        title: payload.title,
        text: payload.text,
        url: payload.url,
      });
    });
    expect(gtag).toHaveBeenCalledWith("event", "outbound_share", {
      platform: "native_share",
      content_type: "fact_card",
      url: payload.url,
    });
  });

  it("does NOT reveal the fallback row when native share is available", async () => {
    setGtag();
    render(<ShareButton payload={payload} />);
    fireEvent.click(screen.getByRole("button", { name: /share this fact/i }));
    await waitFor(() =>
      expect((navigator as ShareNav).share).toHaveBeenCalled(),
    );
    expect(
      screen.queryByRole("group", { name: /share options/i }),
    ).not.toBeInTheDocument();
  });
});

describe("ShareButton — fallback path (no Web Share)", () => {
  beforeEach(() => {
    // jsdom has no navigator.share; assert it's truly absent so the component
    // takes the desktop fallback branch.
    // @ts-expect-error -- ensure no leftover stub
    delete (navigator as ShareNav).share;
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("shows 'More options' up-front and reveals X / WhatsApp / Copy on click", () => {
    setGtag();
    render(<ShareButton payload={payload} />);

    fireEvent.click(screen.getByRole("button", { name: /more options/i }));

    const group = screen.getByRole("group", { name: /share options/i });
    expect(group).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /post on x/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy link/i })).toBeInTheDocument();
  });

  it("opens the X intent in a new tab and fires platform=twitter", () => {
    const gtag = setGtag();
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ShareButton payload={payload} />);

    fireEvent.click(screen.getByRole("button", { name: /more options/i }));
    fireEvent.click(screen.getByRole("button", { name: /post on x/i }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy.mock.calls[0][0]).toContain("twitter.com/intent/tweet");
    expect(gtag).toHaveBeenCalledWith("event", "outbound_share", {
      platform: "twitter",
      content_type: "fact_card",
      url: payload.url,
    });
  });

  it("copies the link, fires platform=copy_link, and flips the label to 'Copied'", async () => {
    const gtag = setGtag();
    render(<ShareButton payload={payload} />);

    fireEvent.click(screen.getByRole("button", { name: /more options/i }));
    fireEvent.click(screen.getByRole("button", { name: /copy link/i }));

    await waitFor(() => {
      expect(
        (navigator as ShareNav).clipboard.writeText,
      ).toHaveBeenCalledWith(payload.url);
    });
    expect(gtag).toHaveBeenCalledWith("event", "outbound_share", {
      platform: "copy_link",
      content_type: "fact_card",
      url: payload.url,
    });
    await screen.findByRole("button", { name: /copied/i });
  });

  it("passes hashtags through to the X intent", () => {
    setGtag();
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ShareButton payload={payload} hashtags={["SanatanHistory"]} />);

    fireEvent.click(screen.getByRole("button", { name: /more options/i }));
    fireEvent.click(screen.getByRole("button", { name: /post on x/i }));

    expect(openSpy.mock.calls[0][0]).toContain("hashtags=SanatanHistory");
  });
});
