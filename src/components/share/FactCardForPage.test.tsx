import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FactCardForPage } from "./FactCardForPage";
import { getFactCardById } from "./factCards";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt } = props as { src: string; alt: string };
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  },
}));

// next/link renders an <a> in tests; keep a light stub to avoid router needs.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("FactCardForPage", () => {
  it("renders nothing when no card is seeded for the path", () => {
    const { container } = render(
      <FactCardForPage path="/sanatan-history/evidence/does-not-exist" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the matching card for a seeded path", () => {
    render(
      <FactCardForPage path="/sanatan-history/evidence/rakhigarhi-largest-site" />,
    );
    const card = getFactCardById("rakhigarhi-vs-mohenjo-daro")!;
    expect(
      screen.getByRole("heading", { name: card.headline }),
    ).toBeInTheDocument();
  });

  it("links the Rakhigarhi size page to the DNA sibling card", () => {
    render(
      <FactCardForPage path="/sanatan-history/evidence/rakhigarhi-largest-site" />,
    );
    const dna = getFactCardById("rakhigarhi-dna")!;
    const link = screen.getByRole("link", { name: /related fact/i });
    expect(link).toHaveAttribute("href", dna.href);
    expect(link).toHaveTextContent(dna.headline);
  });

  it("does not render a sibling link for the standalone Brihadratha card", () => {
    render(
      <FactCardForPage path="/sanatan-history/dynasties/brihadratha" />,
    );
    // Brihadratha has no sibling in the map, so no related-fact link appears.
    expect(
      screen.queryByRole("link", { name: /related fact/i }),
    ).not.toBeInTheDocument();
  });
});
