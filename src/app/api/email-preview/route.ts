/**
 * Email template preview — dev-only route for visual QA.
 * GET /api/email-preview?template=waitlist|faith-finder-0..5|newsletter
 */

import { NextResponse } from 'next/server';
import { buildWaitlistWelcomeEmail } from '@/lib/email/waitlistWelcomeEmail';
import { buildEmail } from '@/lib/email/faithFinderEmails';
import { buildNewsletterEmail } from '@/lib/email/newsletterEmail';
import {
  p,
  essaySectionHeader,
  pullQuote,
  quote,
  footnoteRef,
} from '@/lib/email/layout';

function sampleNewsletterBody(): string {
  return [
    p('Every contemplative tradition arrives at the same architectural problem: the human mind, left to itself, fragments attention across dozens of objects per minute. The Yoga Sutras open with a definition that is also a diagnosis. The entire system that follows is an engineering response to that diagnosis.'),

    essaySectionHeader('The Problem Patanjali Identified'),

    p('The second sutra' + footnoteRef(1) + ' states the goal with surgical brevity: <em>yogas citta vrtti nirodhah</em>. Yoga is the cessation of the fluctuations of the mind-field. Not a philosophy. Not a lifestyle. A technical specification for what the mind looks like when it stops fragmenting.'),

    p('Modern neuroscience calls this "sustained selective attention." Patanjali called it <em>dharana</em>. The difference is that Patanjali also mapped what happens after sustained attention stabilizes: it deepens into absorption (<em>dhyana</em>), and absorption deepens into unity (<em>samadhi</em>). Neuroscience stops at attention. Patanjali kept going.'),

    pullQuote('The mind is not the enemy. It is the instrument. The question is whether the instrument is calibrated or uncalibrated.'),

    essaySectionHeader('The Eight-Limbed Architecture'),

    p('The eight limbs are not eight separate practices. They are eight layers of a single architecture, each one enabling the next. You cannot sustain meditation (<em>dhyana</em>) without first stabilizing concentration (<em>dharana</em>). You cannot stabilize concentration without first regulating the breath (<em>pranayama</em>). You cannot regulate the breath without a stable seat (<em>asana</em>). And none of it holds without the ethical foundation of <em>yama</em> and <em>niyama</em>.'),

    p('This is not a moral prescription. It is an engineering constraint' + footnoteRef(2) + '. Patanjali observed that certain behaviours destabilize the mind-field, making concentration impossible regardless of technique. The yamas and niyamas remove those destabilizers.'),

    quote('When a man is established in non-violence, all hostility ceases in his presence.', 'Yoga Sutras 2.35'),

    essaySectionHeader('What Neuroscience Is Catching Up To'),

    p('The default mode network, identified in fMRI studies in the early 2000s, describes the brain\u2019s activity during mind-wandering. Patanjali described the same phenomenon two millennia earlier as <em>vrtti</em> \u2014 the ceaseless fluctuations that consume most waking life.'),

    p('The convergence is not coincidental. Both traditions are observing the same system. They differ in ambition: neuroscience aims to describe; Patanjali aimed to transform. The eight-limbed path is a transformation protocol. It was written to be followed, not just understood.'),

    pullQuote('Two thousand years apart, two traditions mapped the same terrain. One published papers. The other published a practice.'),

    p('The invitation is not to choose between them. It is to notice that the older map includes territory the newer one has not yet reached \u2014 and to consider walking it.'),
  ].join('\n');
}

const MOCK_QUIZ_RESULT = {
  primaryPath: 'inquiry' as const,
  scores: { inquiry: 9, devotion: 5, ritual: 3, discipline: 7 },
  recommendations: {
    traditions: ['Advaita Vedanta', 'Zen Buddhism', 'Dzogchen'],
    practices: ['Self-Inquiry', 'Neti Neti meditation', 'Silent sitting'],
    philosophies: ['Advaita Vedanta'],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const template = searchParams.get('template') || 'waitlist';

  let html: string;

  if (template === 'waitlist') {
    html = buildWaitlistWelcomeEmail('Arjuna');
  } else if (template === 'newsletter') {
    html = buildNewsletterEmail({
      title: 'The Architecture of Attention',
      subtitle: 'What Patanjali understood about focus that neuroscience is just catching up to.',
      author: 'Sadhaka',
      date: 'March 29, 2026',
      readTime: '8 min read',
      body: sampleNewsletterBody(),
      footnotes: [
        'Yoga Sutras 1.2 \u2014 yogas citta vrtti nirodhah. See I.K. Taimni, <em>The Science of Yoga</em>, for a detailed etymological analysis.',
        'See B.K.S. Iyengar\u2019s commentary on the yamas in <em>Light on the Yoga Sutras of Patanjali</em>, Chapter II.',
      ],
      webUrl: 'https://www.opensadhaka.com/newsletter/architecture-of-attention',
    });
  } else if (template.startsWith('faith-finder-')) {
    const idx = parseInt(template.replace('faith-finder-', ''), 10);
    html = buildEmail(idx, MOCK_QUIZ_RESULT) || '<p>Invalid email index</p>';
  } else {
    html = `<html><body><h1>Available templates</h1>
      <ul>
        <li><a href="?template=waitlist">Waitlist Welcome</a></li>
        <li><a href="?template=faith-finder-0">Faith Finder: Email 0 (Results)</a></li>
        <li><a href="?template=faith-finder-1">Faith Finder: Email 1 (Day 1)</a></li>
        <li><a href="?template=faith-finder-2">Faith Finder: Email 2 (Day 3)</a></li>
        <li><a href="?template=faith-finder-3">Faith Finder: Email 3 (Day 7)</a></li>
        <li><a href="?template=faith-finder-4">Faith Finder: Email 4 (Day 14)</a></li>
        <li><a href="?template=faith-finder-5">Faith Finder: Email 5 (Day 30)</a></li>
        <li><a href="?template=newsletter">Newsletter</a></li>
      </ul></body></html>`;
  }

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
