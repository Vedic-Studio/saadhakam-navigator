/**
 * Shared email layout system — design tokens, table-based wrapper, and
 * composable component helpers for all Sadhaka email templates.
 *
 * Every component outputs inline-styled HTML for Outlook compatibility.
 * A <style> block in <head> provides progressive enhancement (dark mode,
 * mobile breakpoints) for Gmail / Apple Mail / iOS Mail.
 */

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const TOKEN = {
  // Brand gradient
  gradientStart: '#78350f',
  gradientEnd: '#d97706',
  gradient: 'linear-gradient(135deg, #78350f 0%, #d97706 100%)',

  // Backgrounds
  pageBg: '#f7f4ef',
  cardBg: '#ffffff',
  accentBg: '#fffbeb',
  footerBg: '#faf7f3',
  quoteBg: '#fef3c7',

  // Borders
  accentBorder: '#d97706',
  footerBorder: '#e5d6c8',
  subtleBorder: '#f0e6d6',

  // Text
  headingColor: '#1a202c',
  bodyColor: '#2d3748',
  mutedColor: '#4a5568',
  accentText: '#92400e',
  dimColor: '#6b7280',
  footerColor: '#9ca3af',
  cardBodyColor: '#6b4226',

  // Typography
  fontFamily: 'Georgia, "Times New Roman", serif',
  uiFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

  // Dimensions
  maxWidth: 600,
  bodyPadding: '36px 40px',
  headerPadding: '38px 40px 28px',
  footerPadding: '22px 40px',
  mobilePadding: '24px 20px',
} as const;

// ─── Progressive Enhancement Styles ──────────────────────────────────────────

const PROGRESSIVE_CSS = `
  @media (max-width: 480px) {
    .email-body-cell { padding: 24px 20px !important; }
    .email-header-cell { padding: 28px 20px 20px !important; }
    .email-footer-cell { padding: 16px 20px !important; }
    .email-header-title { font-size: 20px !important; }
    .email-card-table { width: 100% !important; }
  }
  @media (prefers-color-scheme: dark) {
    .email-page-bg { background-color: #1a1a1a !important; }
    .email-card-bg { background-color: #2d2d2d !important; }
    .email-body-cell { color: #e0ddd8 !important; }
    .email-footer-bg { background-color: #262626 !important; }
  }
`;

// ─── Core Wrapper ────────────────────────────────────────────────────────────

export interface EmailLayoutOptions {
  headerTitle: string;
  headerSubtitle?: string;
  body: string;
  cta?: { url: string; text: string };
  footerReason: string;
  unsubscribeUrl?: string;
  preheader?: string;
  variant?: 'transactional' | 'newsletter';
}

/**
 * Wraps email body content in a complete HTML document with table-based
 * layout for maximum email client compatibility.
 */
export function wrapEmail(opts: EmailLayoutOptions): string {
  const {
    headerTitle,
    headerSubtitle,
    body,
    cta,
    footerReason,
    unsubscribeUrl = 'https://www.opensadhaka.com/unsubscribe',
    preheader,
    variant = 'transactional',
  } = opts;

  const lineHeight = variant === 'newsletter' ? '1.85' : '1.75';
  const pSpacing = variant === 'newsletter' ? '18px' : '15px';

  const preheaderHtml = preheader
    ? `<span style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}${'&#847;'.repeat(40)}</span>`
    : '';

  const subtitleHtml = headerSubtitle
    ? `<p style="margin:0;opacity:.88;font-size:13px;font-family:${TOKEN.uiFont};">${headerSubtitle}</p>`
    : '';

  const ctaHtml = cta
    ? `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px auto 0;" align="center">
        <tr>
          <td align="center" bgcolor="${TOKEN.gradientEnd}" style="border-radius:8px;background:${TOKEN.gradient};">
            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${cta.url}" style="height:46px;v-text-anchor:middle;width:220px;" arcsize="17%" strokecolor="${TOKEN.accentBorder}" fillcolor="${TOKEN.gradientEnd}"><center style="color:#ffffff;font-family:${TOKEN.uiFont};font-size:14px;font-weight:bold;">${cta.text}</center></v:roundrect><![endif]-->
            <!--[if !mso]><!--><a href="${cta.url}" style="display:inline-block;padding:13px 30px;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:700;letter-spacing:.3px;font-family:${TOKEN.uiFont};">${cta.text}</a><!--<![endif]-->
          </td>
        </tr>
      </table>`
    : '';

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
  <style>${PROGRESSIVE_CSS}</style>
</head>
<body style="margin:0;padding:0;background:${TOKEN.pageBg};font-family:${TOKEN.fontFamily};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  ${preheaderHtml}
  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" class="email-page-bg" style="background:${TOKEN.pageBg};">
    <tr><td align="center" style="padding:30px 20px;">
      <table width="${TOKEN.maxWidth}" cellpadding="0" cellspacing="0" border="0" role="presentation" class="email-card-table email-card-bg" style="max-width:${TOKEN.maxWidth}px;width:100%;background:${TOKEN.cardBg};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.07);">

        <!-- HEADER -->
        <tr><td class="email-header-cell" align="center" style="padding:${TOKEN.headerPadding};background:${TOKEN.gradient};color:#ffffff;text-align:center;">
          <!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${TOKEN.maxWidth}px;"><v:fill type="gradient" color="${TOKEN.gradientEnd}" color2="${TOKEN.gradientStart}" angle="135"/><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0"><center><![endif]-->
          <h1 class="email-header-title" style="margin:0 0 6px;font-size:23px;font-weight:normal;letter-spacing:.4px;color:#ffffff;font-family:${TOKEN.fontFamily};">${headerTitle}</h1>
          ${subtitleHtml}
          <!--[if gte mso 9]></center></v:textbox></v:rect><![endif]-->
        </td></tr>

        <!-- BODY -->
        <tr><td class="email-body-cell" style="padding:${TOKEN.bodyPadding};font-family:${TOKEN.fontFamily};font-size:15px;line-height:${lineHeight};color:${TOKEN.bodyColor};">
          <div style="font-size:15px;line-height:${lineHeight};color:${TOKEN.bodyColor};margin-bottom:${pSpacing};">
            ${body}
          </div>
          ${ctaHtml}
        </td></tr>

        <!-- FOOTER -->
        <tr><td class="email-footer-cell email-footer-bg" style="padding:${TOKEN.footerPadding};background:${TOKEN.footerBg};text-align:center;font-size:12px;color:${TOKEN.footerColor};border-top:1px solid ${TOKEN.footerBorder};font-family:${TOKEN.uiFont};">
          <p style="margin:0 0 6px;font-size:12px;color:${TOKEN.footerColor};">${footerReason}</p>
          <p style="margin:0;font-size:12px;"><a href="${unsubscribeUrl}" style="color:${TOKEN.accentBorder};text-decoration:none;">Unsubscribe</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Component Helpers ───────────────────────────────────────────────────────

/** Amber-bordered left-accent card for callouts and info boxes. */
export function card(title: string, content: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="margin:22px 0;">
    <tr>
      <td style="border-left:4px solid ${TOKEN.accentBorder};background:${TOKEN.accentBg};padding:18px 22px;border-radius:0 8px 8px 0;">
        <p style="margin:0 0 7px;font-size:15px;color:${TOKEN.accentText};font-weight:700;font-family:${TOKEN.fontFamily};">${title}</p>
        <p style="margin:0;font-size:14px;color:${TOKEN.cardBodyColor};line-height:1.6;font-family:${TOKEN.fontFamily};">${content}</p>
      </td>
    </tr>
  </table>`;
}

/** Blockquote with attribution for scripture or teacher quotes. */
export function quote(text: string, attribution: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="margin:22px 0;">
    <tr>
      <td style="background:${TOKEN.quoteBg};border-radius:8px;padding:18px 22px;">
        <p style="margin:0;font-style:italic;color:${TOKEN.cardBodyColor};font-size:15px;line-height:1.65;font-family:${TOKEN.fontFamily};">&ldquo;${text}&rdquo;</p>
        <p style="margin:7px 0 0;font-style:normal;font-size:12px;font-weight:700;color:${TOKEN.accentText};font-family:${TOKEN.fontFamily};">&mdash; ${attribution}</p>
      </td>
    </tr>
  </table>`;
}

/** Numbered step list for practice instructions. */
export function numberedSteps(steps: string[]): string {
  const rows = steps
    .map(
      (step, i) => `<tr>
      <td valign="top" style="padding:0 12px 12px 0;width:30px;">
        <div style="background:${TOKEN.accentBorder};color:#fff;width:24px;height:24px;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;font-family:${TOKEN.uiFont};">${i + 1}</div>
      </td>
      <td valign="top" style="padding:0 0 12px;font-size:14px;color:${TOKEN.mutedColor};line-height:1.6;font-family:${TOKEN.fontFamily};">${step}</td>
    </tr>`
    )
    .join('');

  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="margin:18px 0;">${rows}</table>`;
}

/** Arrow-pointed bullet list for non-sequential items. */
export function arrowList(items: string[]): string {
  const rows = items
    .map(
      (item) => `<tr>
      <td valign="top" style="padding:0 10px 10px 0;width:20px;font-size:14px;color:${TOKEN.accentBorder};font-family:${TOKEN.uiFont};">&rarr;</td>
      <td valign="top" style="padding:0 0 10px;font-size:14px;color:${TOKEN.mutedColor};line-height:1.6;font-family:${TOKEN.fontFamily};">${item}</td>
    </tr>`
    )
    .join('');

  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="margin:18px 0;">${rows}</table>`;
}

/** Solid orange pill badge (e.g. "Day 1", "Day 7"). */
export function dayBadge(label: string): string {
  return `<span style="display:inline-block;background:${TOKEN.accentBorder};color:#fff;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;font-family:${TOKEN.uiFont};margin-bottom:18px;">${label}</span>`;
}

/** Amber outline pill badge (e.g. "Path of Inquiry · Jnana Yoga"). */
export function categoryBadge(label: string): string {
  return `<span style="display:inline-block;background:${TOKEN.accentBg};border:1px solid #f59e0b;color:${TOKEN.accentText};padding:5px 15px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:.4px;font-family:${TOKEN.uiFont};margin-bottom:22px;">${label}</span>`;
}

/** Horizontal divider. */
export function divider(): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="margin:26px 0;">
    <tr><td style="border-top:1px solid ${TOKEN.subtleBorder};font-size:0;line-height:0;">&nbsp;</td></tr>
  </table>`;
}

/** Section heading (h2 level). */
export function heading(text: string): string {
  return `<h2 style="font-size:21px;color:${TOKEN.headingColor};margin:0 0 14px;font-weight:normal;font-family:${TOKEN.fontFamily};">${text}</h2>`;
}

/** Subheading (h3 level). */
export function subheading(text: string): string {
  return `<h3 style="font-size:16px;color:${TOKEN.headingColor};margin:24px 0 10px;font-weight:600;font-family:${TOKEN.fontFamily};">${text}</h3>`;
}

/** Paragraph with standard email styling. */
export function p(text: string, opts?: { dim?: boolean; small?: boolean }): string {
  const color = opts?.dim ? TOKEN.dimColor : TOKEN.mutedColor;
  const size = opts?.small ? '14px' : '15px';
  return `<p style="font-size:${size};color:${color};margin:0 0 15px;line-height:1.75;font-family:${TOKEN.fontFamily};">${text}</p>`;
}

/** Score table for faith finder path scores. */
export function scoreTable(scores: Record<string, number>): string {
  const entries = Object.entries(scores);
  const rows = entries
    .map(
      ([label, score], i) => `<tr${i % 2 === 0 ? ` style="background:${TOKEN.accentBg};"` : ''}>
      <td style="padding:8px 12px;font-size:14px;color:${TOKEN.accentText};font-weight:700;font-family:${TOKEN.fontFamily};">${label.charAt(0).toUpperCase() + label.slice(1)}</td>
      <td style="padding:8px 12px;font-size:14px;color:${TOKEN.mutedColor};font-family:${TOKEN.fontFamily};">${score} pts</td>
    </tr>`
    )
    .join('');

  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="margin-bottom:20px;">${rows}</table>`;
}

// ─── Newsletter-Specific Components ──────────────────────────────────────────

/** Centered pull quote for editorial emphasis. */
export function pullQuote(text: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="margin:30px 0;">
    <tr><td style="border-top:2px solid ${TOKEN.accentBorder};border-bottom:2px solid ${TOKEN.accentBorder};padding:24px 20px;text-align:center;">
      <p style="margin:0;font-size:18px;font-style:italic;color:${TOKEN.headingColor};line-height:1.7;font-family:${TOKEN.fontFamily};">${text}</p>
    </td></tr>
  </table>`;
}

/** Author/date/read-time byline bar. */
export function byline(author: string, date: string, readTime: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="margin:0 0 24px;">
    <tr><td style="padding:12px 0;border-bottom:1px solid ${TOKEN.subtleBorder};font-size:13px;color:${TOKEN.dimColor};font-family:${TOKEN.uiFont};">
      ${author} &middot; ${date} &middot; ${readTime}
    </td></tr>
  </table>`;
}

/** Section header for newsletter essay breaks. */
export function essaySectionHeader(text: string): string {
  return `<h2 style="font-size:19px;color:${TOKEN.headingColor};margin:32px 0 14px;font-weight:normal;font-family:${TOKEN.fontFamily};border-bottom:1px solid ${TOKEN.subtleBorder};padding-bottom:8px;">${text}</h2>`;
}

/** Superscript footnote reference number. */
export function footnoteRef(num: number): string {
  return `<sup style="font-size:11px;color:${TOKEN.accentBorder};font-weight:700;font-family:${TOKEN.uiFont};"><a href="#fn-${num}" style="color:${TOKEN.accentBorder};text-decoration:none;">${num}</a></sup>`;
}

/** Footnotes section rendered as an ordered list. */
export function footnotesSection(notes: string[]): string {
  const items = notes
    .map(
      (note, i) => `<tr>
      <td valign="top" style="padding:0 8px 8px 0;width:20px;font-size:12px;color:${TOKEN.accentText};font-weight:700;font-family:${TOKEN.uiFont};" id="fn-${i + 1}">${i + 1}.</td>
      <td valign="top" style="padding:0 0 8px;font-size:13px;color:${TOKEN.dimColor};line-height:1.5;font-family:${TOKEN.fontFamily};">${note}</td>
    </tr>`
    )
    .join('');

  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation" style="margin:8px 0;">
    <tr><td style="padding-bottom:10px;"><p style="margin:0;font-size:13px;font-weight:700;color:${TOKEN.headingColor};font-family:${TOKEN.uiFont};">References</p></td></tr>
    ${items}
  </table>`;
}
