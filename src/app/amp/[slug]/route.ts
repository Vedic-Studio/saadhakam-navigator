import { NextResponse } from "next/server";
import { getPilotArticleWithMeta } from "@/content/articles/pilotArticles";
import {
  articleBlocksToHtml,
  jsonToHtmlScript,
} from "@/lib/articleContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://opensadhaka.com";
const gaMeasurementId = "G-S3DHYPPG9R";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderAmpHtml(slug: string) {
  const article = getPilotArticleWithMeta(slug);

  if (!article) {
    return null;
  }

  const { meta, content } = article;
  const canonicalUrl = `${siteUrl}${meta.route}`;
  const pillarUrl = `${siteUrl}${content.pillarHref}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: meta.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.metaDescription,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    datePublished: meta.publishDate,
    dateModified: meta.publishDate,
    articleSection: content.pillarLabel,
    keywords: [meta.primaryKeyword],
    about: [{ "@type": "Thing", name: meta.primaryKeyword }],
    isPartOf: {
      "@type": "WebPage",
      name: content.pillarLabel,
      url: pillarUrl,
    },
    inLanguage: "en",
    author: { "@type": "Organization", name: "Sadhaka" },
    publisher: {
      "@type": "Organization",
      name: "Sadhaka",
      url: siteUrl,
    },
  };

  return `<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(meta.title)} | Sadhaka</title>
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <meta name="description" content="${escapeHtml(meta.metaDescription)}">
    <meta property="og:title" content="${escapeHtml(meta.title)}">
    <meta property="og:description" content="${escapeHtml(meta.metaDescription)}">
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
    <meta property="og:type" content="article">
    <meta name="twitter:card" content="summary_large_image">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    <style amp-boilerplate>
      body{visibility:hidden}
    </style>
    <noscript>
      <style amp-boilerplate>
        body{visibility:visible}
      </style>
    </noscript>
    <style amp-custom>
      body {
        margin: 0;
        background: #09090b;
        color: #fafafa;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.7;
      }
      a {
        color: #fb923c;
        text-decoration: none;
      }
      main {
        max-width: 760px;
        margin: 0 auto;
        padding: 32px 20px 64px;
      }
      .eyebrow {
        display: inline-block;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #fdba74;
        background: rgba(249, 115, 22, 0.12);
        padding: 6px 10px;
        border-radius: 999px;
        margin-bottom: 16px;
      }
      .meta {
        color: #a1a1aa;
        font-size: 14px;
        margin-bottom: 24px;
      }
      h1 {
        font-size: 40px;
        line-height: 1.15;
        margin: 0 0 16px;
      }
      h2 {
        margin-top: 40px;
        font-size: 30px;
        line-height: 1.2;
      }
      h3 {
        margin-top: 28px;
        font-size: 22px;
        line-height: 1.3;
      }
      p, li {
        color: #d4d4d8;
        font-size: 18px;
      }
      ul {
        padding-left: 20px;
      }
      .breadcrumbs {
        color: #a1a1aa;
        font-size: 14px;
        margin-bottom: 24px;
      }
      .section-card {
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 24px;
        padding: 24px;
        margin-top: 48px;
        background: rgba(255,255,255,0.02);
      }
      .faq-item {
        padding: 20px;
        border-radius: 18px;
        border: 1px solid rgba(255,255,255,0.08);
        margin-bottom: 16px;
        background: rgba(255,255,255,0.02);
      }
      .faq-item h3 {
        margin-top: 0;
        margin-bottom: 8px;
      }
      .cta {
        margin-top: 48px;
        border: 1px solid rgba(249,115,22,0.24);
        border-radius: 28px;
        padding: 32px 24px;
        text-align: center;
        background: linear-gradient(135deg, rgba(124,45,18,0.35), rgba(9,9,11,1));
      }
      .cta-button {
        display: inline-block;
        margin-top: 12px;
        background: #f97316;
        color: #fff;
        padding: 14px 22px;
        border-radius: 999px;
        font-weight: 600;
      }
    </style>
    <script type="application/ld+json">${jsonToHtmlScript(articleSchema)}</script>
    <script type="application/ld+json">${jsonToHtmlScript(faqSchema)}</script>
  </head>
  <body>
    <amp-analytics type="gtag" data-credentials="include">
      <script type="application/json">
        ${jsonToHtmlScript({
    vars: {
      gtag_id: gaMeasurementId,
      config: {
        [gaMeasurementId]: {
          groups: "default",
        },
      },
    },
  })}
      </script>
    </amp-analytics>
    <main>
      <div class="breadcrumbs">
        <a href="${siteUrl}">Home</a> / <a href="${escapeHtml(content.pillarHref)}">${escapeHtml(content.pillarLabel)}</a> / <span>${escapeHtml(meta.title)}</span>
      </div>
      <span class="eyebrow">${escapeHtml(content.pillarLabel)}</span>
      <div class="meta">${escapeHtml(String(meta.readingTime))} min read · AMP version · <a href="${escapeHtml(canonicalUrl)}">View canonical page</a></div>
      <h1>${escapeHtml(meta.title)}</h1>
      <p>${escapeHtml(meta.metaDescription)}</p>
      ${articleBlocksToHtml(content.blocks)}

      <section class="section-card">
        <h2>Explore Further</h2>
        <ul>
          ${meta.relatedLinks
      .map(
        (link) =>
          `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.text)}</a></li>`
      )
      .join("")}
        </ul>
      </section>

      <section class="section-card">
        <h2>Frequently Asked Questions</h2>
        ${meta.faqs
      .map(
        (faq) => `<div class="faq-item">
              <h3>${escapeHtml(faq.question)}</h3>
              <p>${escapeHtml(faq.answer)}</p>
            </div>`
      )
      .join("")}
      </section>

      <section class="cta">
        <h2>Ready to find your path?</h2>
        <p>Take the Faith Finder — a 5-minute quiz that maps your temperament to the tradition, practice, and philosophy within Sanatan Dharma that fits you.</p>
        <a class="cta-button" href="${siteUrl}/faith-finder">Start the Faith Finder</a>
      </section>
    </main>
  </body>
</html>`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const html = renderAmpHtml(slug);

  if (!html) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}