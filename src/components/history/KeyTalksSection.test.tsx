import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { KeyTalksSection } from "@/components/history/KeyTalksSection";

describe("KeyTalksSection", () => {
  it("renders nothing when keyTalks is empty", () => {
    const { container } = render(<KeyTalksSection keyTalks={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders talk titles", () => {
    render(
      <KeyTalksSection
        keyTalks={[
          { title: "Talk Alpha" },
          { title: "Talk Beta" },
        ]}
      />
    );
    expect(screen.getByText("Talk Alpha")).toBeDefined();
    expect(screen.getByText("Talk Beta")).toBeDefined();
  });

  it("renders an anchor with correct attributes when url is present", () => {
    render(
      <KeyTalksSection
        keyTalks={[
          { title: "Linked Talk", url: "https://example.com/talk" },
        ]}
      />
    );
    const link = screen.getByText("Linked Talk").closest("a");
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("https://example.com/talk");
    expect(link!.getAttribute("target")).toBe("_blank");
    expect(link!.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("renders a span (no link) when url is absent", () => {
    render(
      <KeyTalksSection
        keyTalks={[{ title: "No Link Talk" }]}
      />
    );
    const el = screen.getByText("No Link Talk");
    expect(el.tagName).toBe("SPAN");
    expect(el.closest("a")).toBeNull();
  });

  it("renders platform text when present", () => {
    render(
      <KeyTalksSection
        keyTalks={[
          { title: "Platform Talk", platform: "YouTube" },
        ]}
      />
    );
    expect(screen.getByText("YouTube")).toBeDefined();
  });
});
