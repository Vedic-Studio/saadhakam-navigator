import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DestroyedTempleCaseShell, DestroyedTempleCaseLayout } from "./DestroyedTempleCaseLayout";
import { getDestroyedTempleById } from "@/data/templesDestroyed";

describe("DestroyedTempleCaseShell", () => {
    const somnath = getDestroyedTempleById("somnath-mahmud-1026");

    it("ensures the Somnath fixture exists in the dataset", () => {
        expect(somnath).toBeDefined();
    });

    it("renders the fact card with the expected fields", () => {
        if (!somnath) throw new Error("test setup: somnath fixture missing");
        render(
            <DestroyedTempleCaseShell
                temple={somnath}
                bodySlot={<p>body content</p>}
                kbClaimSlugs={["somnath-destruction-claim"]}
            />,
        );

        // Fact card structural fields
        expect(screen.getByTestId("temple-fact-card")).toBeInTheDocument();
        expect(screen.getByTestId("fact-temple-name").textContent).toContain("Somnath");
        expect(screen.getByTestId("fact-deity").textContent).toContain("Shiva");
        // Location combines place + district + state
        expect(screen.getByTestId("fact-location").textContent).toContain("Prabhas Patan");
        expect(screen.getByTestId("fact-location").textContent).toContain("Gujarat");
        expect(screen.getByTestId("fact-year").textContent).toContain("1026 CE");
        expect(screen.getByTestId("fact-destroyer").textContent).toContain("Mahmud of Ghazni");
        expect(screen.getByTestId("fact-destroyer").textContent).toContain("Ghaznavid");
        expect(screen.getByTestId("fact-chronicle").textContent).toContain("Tabaqat-i-Nasiri");
        expect(screen.getByTestId("fact-modern-status").textContent).toContain("1951");
    });

    it("renders the primary-source quote and attribution", () => {
        if (!somnath) throw new Error("test setup: somnath fixture missing");
        render(
            <DestroyedTempleCaseShell
                temple={somnath}
                bodySlot={<p>body</p>}
            />,
        );
        const quote = screen.getByTestId("temple-primary-quote");
        expect(quote.textContent).toContain("Sultan Mahmud");
        expect(quote.textContent).toContain("Tabaqat-i-Nasiri");
        expect(quote.textContent).toContain("Minhaj-us-Siraj");
    });

    it("renders the body slot content passed in", () => {
        if (!somnath) throw new Error("test setup: somnath fixture missing");
        render(
            <DestroyedTempleCaseShell
                temple={somnath}
                bodySlot={
                    <div data-testid="external-body">
                        <p>narrative paragraph one</p>
                        <p>narrative paragraph two</p>
                    </div>
                }
            />,
        );
        const slot = screen.getByTestId("temple-body-slot");
        expect(slot).toBeInTheDocument();
        // External body is nested inside the slot
        expect(screen.getByTestId("external-body")).toBeInTheDocument();
        expect(screen.getByText("narrative paragraph one")).toBeInTheDocument();
        expect(screen.getByText("narrative paragraph two")).toBeInTheDocument();
    });

    it("renders the optional contested-claims callout only when provided", () => {
        if (!somnath) throw new Error("test setup: somnath fixture missing");
        const { rerender } = render(
            <DestroyedTempleCaseShell temple={somnath} bodySlot={<p>x</p>} />,
        );
        expect(screen.queryByTestId("temple-contested-note")).not.toBeInTheDocument();

        rerender(
            <DestroyedTempleCaseShell
                temple={somnath}
                bodySlot={<p>x</p>}
                contestedNote={<p>motivation is debated</p>}
            />,
        );
        const note = screen.getByTestId("temple-contested-note");
        expect(note).toBeInTheDocument();
        expect(note.textContent).toContain("motivation is debated");
    });

    it("renders a Sources section listing the primary chronicle and KB claim slugs", () => {
        if (!somnath) throw new Error("test setup: somnath fixture missing");
        render(
            <DestroyedTempleCaseShell
                temple={somnath}
                bodySlot={<p>x</p>}
                kbClaimSlugs={["somnath-destruction-claim"]}
            />,
        );
        const sources = screen.getByTestId("temple-sources");
        expect(sources).toBeInTheDocument();
        expect(sources.textContent).toContain("Tabaqat-i-Nasiri");
        expect(sources.textContent).toContain("somnath-destruction-claim");
    });
});

describe("DestroyedTempleCaseLayout (async server component)", () => {
    it("throws when given an invalid temple id", async () => {
        await expect(
            DestroyedTempleCaseLayout({
                meta: {
                    slug: "x",
                    route: "/x",
                    title: "x",
                    metaDescription: "x".repeat(80),
                    pillar: "spiritual-traditions",
                    publishDate: "2026-05-17",
                    readingTime: 1,
                    primaryKeyword: "x",
                    relatedLinks: [],
                    faqs: [],
                },
                templeId: "this-id-does-not-exist-in-the-dataset",
                bodySlot: <p>x</p>,
            }),
        ).rejects.toThrow(/no temple found/);
    });
});
