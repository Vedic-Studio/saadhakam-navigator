import { describe, it, expect } from 'vitest';
import { buildNewsletterEmail, buildNewsletterSubject } from './newsletterEmail';
import { p, essaySectionHeader, pullQuote, quote, footnoteRef } from './layout';

describe('buildNewsletterEmail', () => {
  const sampleBody = [
    p('Opening paragraph of the essay.'),
    essaySectionHeader('The Core Argument'),
    p('Body text with a reference' + footnoteRef(1) + '.'),
    pullQuote('A key insight for emphasis.'),
    quote('Scripture text.', 'Bhagavad Gita 2.47'),
    p('Closing paragraph.'),
  ].join('\n');

  const html = buildNewsletterEmail({
    title: 'The Architecture of Attention',
    subtitle: 'What Patanjali understood about focus.',
    author: 'Sadhaka',
    date: 'March 29, 2026',
    readTime: '8 min read',
    body: sampleBody,
    footnotes: ['Yoga Sutras 1.2'],
    webUrl: 'https://www.opensadhaka.com/newsletter/architecture-of-attention',
  });

  it('returns a complete HTML document', () => {
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('</html>');
  });

  it('includes the essay title in header', () => {
    expect(html).toContain('The Architecture of Attention');
  });

  it('includes newsletter header subtitle', () => {
    expect(html).toContain('Sadhaka Newsletter');
  });

  it('includes byline with author, date, and read time', () => {
    expect(html).toContain('Sadhaka');
    expect(html).toContain('March 29, 2026');
    expect(html).toContain('8 min read');
  });

  it('includes the essay body content', () => {
    expect(html).toContain('Opening paragraph of the essay.');
    expect(html).toContain('The Core Argument');
    expect(html).toContain('A key insight for emphasis.');
    expect(html).toContain('Scripture text.');
    expect(html).toContain('Closing paragraph.');
  });

  it('includes footnotes section', () => {
    expect(html).toContain('References');
    expect(html).toContain('Yoga Sutras 1.2');
  });

  it('includes web URL link', () => {
    expect(html).toContain('https://www.opensadhaka.com/newsletter/architecture-of-attention');
    expect(html).toContain('Read this essay on opensadhaka.com');
  });

  it('uses newsletter variant (wider line-height)', () => {
    expect(html).toContain('line-height:1.85');
  });

  it('includes newsletter-specific footer reason', () => {
    expect(html).toContain('biweekly newsletter');
  });

  it('uses subtitle as preheader', () => {
    expect(html).toContain('What Patanjali understood about focus.');
  });

  it('does not include a CTA button (essay is the content)', () => {
    // No bulletproof button table
    expect(html).not.toContain('bgcolor="#d97706"');
  });
});

describe('buildNewsletterEmail — without optional fields', () => {
  const html = buildNewsletterEmail({
    title: 'Simple Essay',
    subtitle: 'A short one.',
    author: 'Author',
    date: 'April 1, 2026',
    readTime: '3 min read',
    body: p('Just a paragraph.'),
  });

  it('omits footnotes section when not provided', () => {
    expect(html).not.toContain('References');
  });

  it('omits web URL link when not provided', () => {
    expect(html).not.toContain('Read this essay on opensadhaka.com');
  });
});

describe('buildNewsletterSubject', () => {
  it('appends newsletter branding to title', () => {
    const subject = buildNewsletterSubject('The Architecture of Attention');
    expect(subject).toBe('The Architecture of Attention — Sadhaka Newsletter');
  });
});
