import { describe, it, expect } from 'vitest';
import {
  wrapEmail,
  card,
  quote,
  numberedSteps,
  arrowList,
  dayBadge,
  categoryBadge,
  divider,
  heading,
  subheading,
  p,
  scoreTable,
  pullQuote,
  byline,
  essaySectionHeader,
  footnoteRef,
  footnotesSection,
  TOKEN,
} from './layout';

describe('layout.ts — design tokens', () => {
  it('exports TOKEN with required brand values', () => {
    expect(TOKEN.gradientStart).toBe('#b45309');
    expect(TOKEN.gradientEnd).toBe('#f59e0b');
    expect(TOKEN.pageBg).toBe('#f7f4ef');
    expect(TOKEN.maxWidth).toBe(600);
    expect(TOKEN.fontFamily).toContain('Georgia');
  });
});

describe('wrapEmail', () => {
  const minimal = wrapEmail({
    headerTitle: 'Test Title',
    body: '<p>Hello</p>',
    footerReason: 'Test footer',
  });

  it('returns a complete HTML document', () => {
    expect(minimal).toContain('<!DOCTYPE html>');
    expect(minimal).toContain('</html>');
  });

  it('includes the header title', () => {
    expect(minimal).toContain('Test Title');
  });

  it('includes the body content', () => {
    expect(minimal).toContain('<p>Hello</p>');
  });

  it('includes the footer reason', () => {
    expect(minimal).toContain('Test footer');
  });

  it('includes default unsubscribe link', () => {
    expect(minimal).toContain('opensadhaka.com/unsubscribe');
  });

  it('includes header subtitle when provided', () => {
    const html = wrapEmail({
      headerTitle: 'T',
      headerSubtitle: 'My Subtitle',
      body: '',
      footerReason: '',
    });
    expect(html).toContain('My Subtitle');
  });

  it('includes CTA button when provided', () => {
    const html = wrapEmail({
      headerTitle: 'T',
      body: '',
      footerReason: '',
      cta: { url: 'https://example.com', text: 'Click Me' },
    });
    expect(html).toContain('https://example.com');
    expect(html).toContain('Click Me');
  });

  it('omits CTA when not provided', () => {
    expect(minimal).not.toContain('btn');
  });

  it('includes preheader text when provided', () => {
    const html = wrapEmail({
      headerTitle: 'T',
      body: '',
      footerReason: '',
      preheader: 'Preview text for inbox',
    });
    expect(html).toContain('Preview text for inbox');
    // Preheader should be hidden
    expect(html).toContain('display:none');
  });

  it('uses wider line-height for newsletter variant', () => {
    const html = wrapEmail({
      headerTitle: 'T',
      body: '',
      footerReason: '',
      variant: 'newsletter',
    });
    expect(html).toContain('line-height:1.85');
  });

  it('uses standard line-height for transactional variant', () => {
    expect(minimal).toContain('line-height:1.75');
  });

  it('includes Outlook VML conditional comments for gradient', () => {
    expect(minimal).toContain('<!--[if gte mso 9]>');
    expect(minimal).toContain('<v:rect');
  });

  it('uses table-based layout for Outlook compatibility', () => {
    expect(minimal).toContain('cellpadding="0"');
    expect(minimal).toContain('cellspacing="0"');
    expect(minimal).toContain(`width="${TOKEN.maxWidth}"`);
  });
});

describe('component helpers', () => {
  describe('card', () => {
    const html = card('My Title', 'My content');
    it('renders title and content', () => {
      expect(html).toContain('My Title');
      expect(html).toContain('My content');
    });
    it('uses accent border color', () => {
      expect(html).toContain(TOKEN.accentBorder);
    });
    it('uses table-based layout', () => {
      expect(html).toContain('<table');
    });
  });

  describe('quote', () => {
    const html = quote('Wise words', 'Some Teacher');
    it('renders text with smart quotes', () => {
      expect(html).toContain('&ldquo;Wise words&rdquo;');
    });
    it('renders attribution with em dash', () => {
      expect(html).toContain('&mdash; Some Teacher');
    });
  });

  describe('numberedSteps', () => {
    const html = numberedSteps(['Step one', 'Step two', 'Step three']);
    it('renders all steps', () => {
      expect(html).toContain('Step one');
      expect(html).toContain('Step two');
      expect(html).toContain('Step three');
    });
    it('includes sequential numbers', () => {
      expect(html).toContain('>1<');
      expect(html).toContain('>2<');
      expect(html).toContain('>3<');
    });
  });

  describe('arrowList', () => {
    const html = arrowList(['Item A', 'Item B']);
    it('renders all items', () => {
      expect(html).toContain('Item A');
      expect(html).toContain('Item B');
    });
    it('uses arrow symbol', () => {
      expect(html).toContain('&rarr;');
    });
  });

  describe('dayBadge', () => {
    const html = dayBadge('Day 7');
    it('renders label', () => {
      expect(html).toContain('Day 7');
    });
    it('uses accent color background', () => {
      expect(html).toContain(TOKEN.accentBorder);
    });
  });

  describe('categoryBadge', () => {
    const html = categoryBadge('Path of Inquiry');
    it('renders label', () => {
      expect(html).toContain('Path of Inquiry');
    });
    it('uses accent bg', () => {
      expect(html).toContain(TOKEN.accentBg);
    });
  });

  describe('divider', () => {
    it('renders a horizontal rule via table', () => {
      const html = divider();
      expect(html).toContain('border-top');
      expect(html).toContain('<table');
    });
  });

  describe('heading', () => {
    it('renders h2 with heading color', () => {
      const html = heading('Section Title');
      expect(html).toContain('<h2');
      expect(html).toContain('Section Title');
      expect(html).toContain(TOKEN.headingColor);
    });
  });

  describe('subheading', () => {
    it('renders h3', () => {
      const html = subheading('Sub Title');
      expect(html).toContain('<h3');
      expect(html).toContain('Sub Title');
    });
  });

  describe('p', () => {
    it('renders paragraph with standard styling', () => {
      const html = p('Hello world');
      expect(html).toContain('<p');
      expect(html).toContain('Hello world');
      expect(html).toContain(TOKEN.bodyColor);
    });

    it('uses dim color when dim option set', () => {
      const html = p('Dim text', { dim: true });
      expect(html).toContain(TOKEN.dimColor);
    });

    it('uses smaller font when small option set', () => {
      const html = p('Small text', { small: true });
      expect(html).toContain('14px');
    });
  });

  describe('scoreTable', () => {
    const html = scoreTable({ inquiry: 8, devotion: 5, ritual: 3, discipline: 6 });
    it('renders all score entries', () => {
      expect(html).toContain('Inquiry');
      expect(html).toContain('8 pts');
      expect(html).toContain('Devotion');
      expect(html).toContain('5 pts');
    });
    it('capitalizes labels', () => {
      expect(html).toContain('Ritual');
      expect(html).toContain('Discipline');
    });
  });
});

describe('newsletter components', () => {
  describe('pullQuote', () => {
    const html = pullQuote('A profound insight.');
    it('renders centered italic text', () => {
      expect(html).toContain('A profound insight.');
      expect(html).toContain('font-style:italic');
      expect(html).toContain('text-align:center');
    });
    it('uses accent border decoration', () => {
      expect(html).toContain(TOKEN.accentBorder);
    });
  });

  describe('byline', () => {
    const html = byline('Sadhaka', 'March 29, 2026', '8 min read');
    it('renders all byline parts', () => {
      expect(html).toContain('Sadhaka');
      expect(html).toContain('March 29, 2026');
      expect(html).toContain('8 min read');
    });
    it('uses middot separator', () => {
      expect(html).toContain('&middot;');
    });
  });

  describe('essaySectionHeader', () => {
    const html = essaySectionHeader('The Core Argument');
    it('renders h2 with border-bottom', () => {
      expect(html).toContain('<h2');
      expect(html).toContain('The Core Argument');
      expect(html).toContain('border-bottom');
    });
  });

  describe('footnoteRef', () => {
    it('renders superscript link', () => {
      const html = footnoteRef(3);
      expect(html).toContain('<sup');
      expect(html).toContain('#fn-3');
      expect(html).toContain('>3<');
    });
  });

  describe('footnotesSection', () => {
    const html = footnotesSection(['First reference', 'Second reference']);
    it('renders numbered references', () => {
      expect(html).toContain('1.');
      expect(html).toContain('First reference');
      expect(html).toContain('2.');
      expect(html).toContain('Second reference');
    });
    it('includes References heading', () => {
      expect(html).toContain('References');
    });
    it('includes anchor IDs', () => {
      expect(html).toContain('id="fn-1"');
      expect(html).toContain('id="fn-2"');
    });
  });
});
