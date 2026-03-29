/**
 * Newsletter email template — long-form essay format for biweekly
 * Sadhaka newsletter. Uses shared layout system with 'newsletter' variant
 * for wider line-height and more breathing room.
 */

import { wrapEmail, byline, divider, footnotesSection } from './layout';

export interface NewsletterContent {
  /** Essay title — displayed in the email header */
  title: string;
  /** Deck/subtitle — used for inbox preview (preheader) and header subtitle */
  subtitle: string;
  /** Author name */
  author: string;
  /** Formatted date string (e.g. "March 29, 2026") */
  date: string;
  /** Reading time estimate (e.g. "8 min read") */
  readTime: string;
  /**
   * Pre-built HTML body using layout component helpers.
   * The caller assembles this using essaySectionHeader(), pullQuote(),
   * quote(), p(), etc. from layout.ts.
   */
  body: string;
  /** Optional ordered reference/footnote list */
  footnotes?: string[];
  /** "Read on web" fallback URL */
  webUrl?: string;
}

/**
 * Builds a complete newsletter email HTML document.
 *
 * Usage:
 * ```ts
 * import { essaySectionHeader, pullQuote, quote, p } from './layout';
 *
 * const body = [
 *   p('Opening paragraph...'),
 *   essaySectionHeader('The Core Argument'),
 *   p('Body text with a footnote' + footnoteRef(1) + '...'),
 *   pullQuote('A key insight pulled out for emphasis.'),
 *   quote('Scripture text here.', 'Bhagavad Gita 2.47'),
 *   p('Closing paragraph...'),
 * ].join('\n');
 *
 * const html = buildNewsletterEmail({
 *   title: 'The Architecture of Attention',
 *   subtitle: 'What Patanjali understood about focus that neuroscience is just catching up to.',
 *   author: 'Sadhaka',
 *   date: 'March 29, 2026',
 *   readTime: '8 min read',
 *   body,
 *   footnotes: ['Yoga Sutras 1.2 — yogas citta vrtti nirodhah'],
 *   webUrl: 'https://www.opensadhaka.com/newsletter/architecture-of-attention',
 * });
 * ```
 */
export function buildNewsletterEmail(content: NewsletterContent): string {
  const {
    title,
    subtitle,
    author,
    date,
    readTime,
    body,
    footnotes,
    webUrl,
  } = content;

  const parts: string[] = [
    byline(author, date, readTime),
    body,
  ];

  if (footnotes && footnotes.length > 0) {
    parts.push(divider());
    parts.push(footnotesSection(footnotes));
  }

  if (webUrl) {
    parts.push(divider());
    parts.push(
      `<p style="text-align:center;font-size:13px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">` +
        `<a href="${webUrl}" style="color:#d97706;text-decoration:none;">Read this essay on opensadhaka.com &rarr;</a></p>`
    );
  }

  return wrapEmail({
    headerTitle: title,
    headerSubtitle: 'Sadhaka Newsletter',
    body: parts.join('\n'),
    footerReason:
      'You receive this biweekly newsletter because you subscribed on <a href="https://www.opensadhaka.com" style="color:#d97706;text-decoration:none;">opensadhaka.com</a>.',
    preheader: subtitle,
    variant: 'newsletter',
  });
}

/** Generates a newsletter subject line. */
export function buildNewsletterSubject(title: string): string {
  return `${title} — Sadhaka Newsletter`;
}
