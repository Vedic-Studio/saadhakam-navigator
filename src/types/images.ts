/**
 * Shared image type for all content types (articles, deities, concepts, etc.).
 * Dimensions fixed at 1200×630 — standard OG image size.
 */
export interface ContentImage {
    src: string; // e.g. "/assets/deities/shiva/featured.webp"
    alt: string; // SEO-optimised alt text, max 125 chars
    width: 1200;
    height: 630;
}
