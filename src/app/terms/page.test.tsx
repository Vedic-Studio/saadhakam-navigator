import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TermsPage, { metadata } from "./page";

describe("TermsPage", () => {
    it("renders the h1 heading", () => {
        render(<TermsPage />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Terms of Use");
    });

    it("contains a last updated date", () => {
        render(<TermsPage />);
        expect(screen.getByText(/18 April 2026/)).toBeTruthy();
    });

    it("includes contact section", () => {
        render(<TermsPage />);
        const contactHeading = screen.getByRole("heading", { name: /contact/i });
        expect(contactHeading).toBeTruthy();
    });

    it("metadata has a self-referential canonical path", () => {
        const alternates = (metadata as { alternates?: { canonical?: string } }).alternates;
        expect(alternates?.canonical).toMatch(/\/terms$/);
    });

    it("metadata title contains Sadhaka once", () => {
        const title = metadata.title as string;
        const matches = (title.match(/Sadhaka/g) ?? []).length;
        expect(matches).toBe(1);
    });
});
