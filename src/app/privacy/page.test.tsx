import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PrivacyPage, { metadata } from "./page";

describe("PrivacyPage", () => {
    it("renders the h1 heading", () => {
        render(<PrivacyPage />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Privacy Policy");
    });

    it("contains a last updated date", () => {
        render(<PrivacyPage />);
        expect(screen.getByText(/18 April 2026/)).toBeTruthy();
    });

    it("includes contact section", () => {
        render(<PrivacyPage />);
        const contactHeading = screen.getByRole("heading", { name: /contact/i });
        expect(contactHeading).toBeTruthy();
    });

    it("metadata has a self-referential canonical path", () => {
        const alternates = (metadata as { alternates?: { canonical?: string } }).alternates;
        expect(alternates?.canonical).toMatch(/\/privacy$/);
    });

    it("metadata title contains Sadhaka once", () => {
        const title = metadata.title as string;
        const matches = (title.match(/Sadhaka/g) ?? []).length;
        expect(matches).toBe(1);
    });
});
