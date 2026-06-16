import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FactCard } from "./FactCard";
import { factCards, getFactCardById, shareUrlFor } from "./factCards";

// Mock next/image to a plain <img> so the test exercises THIS component's
// content + wiring rather than Next's image runtime (which is noisy in jsdom).
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt } = props as { src: string; alt: string };
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  },
}));

const flagship = getFactCardById("rakhigarhi-vs-mohenjo-daro")!;

afterEach(() => {
  vi.restoreAllMocks();
  delete (window as { gtag?: unknown }).gtag;
});

describe("FactCard", () => {
  it("renders the headline, the quotable fact, the context and the citation", () => {
    render(<FactCard card={flagship} />);
    expect(
      screen.getByRole("heading", { name: flagship.headline }),
    ).toBeInTheDocument();
    expect(screen.getByText(flagship.fact)).toBeInTheDocument();
    expect(screen.getByText(flagship.context)).toBeInTheDocument();
    // citation must be visible on the card (it's what makes the share credible)
    expect(
      screen.getByText(flagship.citation, { exact: false }),
    ).toBeInTheDocument();
  });

  it("renders the branded art with descriptive alt text", () => {
    render(<FactCard card={flagship} />);
    const img = screen.getByRole("img", { name: flagship.artAlt });
    expect(img).toHaveAttribute("src", flagship.art);
  });

  it("shows the confidence label that matches the card's confidence", () => {
    render(<FactCard card={flagship} />);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });

  it("renders 'Strong evidence' for the strong-confidence Brihadratha card", () => {
    const brihadratha = getFactCardById("brihadratha-dynasty")!;
    render(<FactCard card={brihadratha} />);
    expect(screen.getByText("Strong evidence")).toBeInTheDocument();
  });

  it("embeds a ShareButton that fires outbound_share with the card's absolute URL", async () => {
    // Provide a native share API so the 1-tap path fires native_share.
    Object.defineProperty(navigator, "share", {
      configurable: true,
      writable: true,
      value: vi.fn().mockResolvedValue(undefined),
    });
    const gtag = vi.fn();
    (window as { gtag?: unknown }).gtag = gtag;

    render(<FactCard card={flagship} />);
    fireEvent.click(screen.getByRole("button", { name: /share this fact/i }));

    await waitFor(() => {
      expect(gtag).toHaveBeenCalledWith("event", "outbound_share", {
        platform: "native_share",
        content_type: "fact_card",
        url: shareUrlFor(flagship),
      });
    });

    // @ts-expect-error -- clean up the stub we added
    delete navigator.share;
  });

  it("renders for every seeded card without throwing", () => {
    for (const card of factCards) {
      const { unmount } = render(<FactCard card={card} />);
      expect(
        screen.getByRole("heading", { name: card.headline }),
      ).toBeInTheDocument();
      unmount();
    }
  });
});
