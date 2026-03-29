/**
 * Welcome email sent when a user joins the Sadhaka waitlist.
 * Uses shared layout system for consistent design across all emails.
 */

import { wrapEmail, card, p, divider } from './layout';

export function buildWaitlistWelcomeEmail(name: string): string {
  const greeting = name ? `Hi ${name},` : 'Namaste,';

  const body = [
    p(greeting),
    p("We're building an AI tutor trained on primary Sanskrit texts, commentaries, and living philosophical traditions. Not summaries. Not Wikipedia. The actual source material, made navigable."),

    card(
      'The knowledge library is live',
      '73 in-depth articles, 60 philosophical comparisons, and 1,000+ verse-by-verse analyses from the Bhagavad Gita, Vishnu Sahasranama, and more. Start reading today.'
    ),

    p("The AI tutor is in development. We'll write when it's ready."),

    divider(),

    p('One click. Start anywhere.', { dim: true, small: true }),
  ].join('\n');

  return wrapEmail({
    headerTitle: 'Welcome to Sadhaka',
    headerSubtitle: 'The encyclopaedia for Sanatan Dharma',
    body,
    cta: { url: 'https://www.opensadhaka.com', text: 'Explore the Library \u2192' },
    footerReason: 'You received this because you joined the waitlist on <a href="https://www.opensadhaka.com" style="color:#d97706;text-decoration:none;">opensadhaka.com</a>.',
    preheader: 'The knowledge library is live. 73 articles, 60 comparisons, 1000+ verse analyses.',
  });
}

export const WAITLIST_WELCOME_SUBJECT = 'Welcome to Sadhaka';
