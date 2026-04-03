import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { ReadProgress } from "@/components/animations/ReadProgress";
import { Toaster } from "@/components/ui/sonner";

// Always use www — env var may lack it, causing canonical confusion with Google
const siteUrl = "https://www.opensadhaka.com";
const gaMeasurementId = "G-S3DHYPPG9R";
const gscVerificationCode =
  process.env.GSC_VERIFICATION?.trim() ||
  process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",
    template: "%s | Sadhaka",
  },
  description:
    "Explore 10,000 years of Vedic wisdom with Sadhaka AI. Learn Bhagavad Gita, Vedas, Upanishads, and authentic spiritual practices. Your guide to Sanatan Dharma.",
  keywords: [
    "sanatan dharma",
    "bhagavad gita",
    "vedas",
    "upanishads",
    "yoga philosophy",
    "sanskrit",
    "spiritual guidance",
    "vedanta",
    "sadhana",
    "meditation",
    "spiritual practices",
  ],
  authors: [{ name: "Sadhaka", url: siteUrl }],
  creator: "Sadhaka",
  publisher: "Sadhaka",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",
    description:
      "Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.",
    url: siteUrl,
    siteName: "Sadhaka",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",
    description:
      "Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: gscVerificationCode ? { google: gscVerificationCode } : undefined,
};

// Organization structured data — site-wide
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  "name": "Sadhaka",
  "url": siteUrl,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteUrl}/logo.png`,
    "width": 600,
    "height": 60
  },
  "description": "Sadhaka is a comprehensive AI-powered spiritual encyclopedia and practitioner platform dedicated to 10,000 years of Sanatan Dharma wisdom, including Vedas, Upanishads, and Yoga philosophy.",
  "sameAs": [
    "https://twitter.com/opensadhaka",
    "https://instagram.com/opensadhaka",
    "https://youtube.com/@opensadhaka",
    "https://github.com/opensadhaka",
    "https://www.linkedin.com/company/opensadhaka",
    "https://www.crunchbase.com/organization/sadhaka",
    "https://en.wikipedia.org/wiki/Sanatan_Dharma"
  ],
  "knowsAbout": [
    "Sanatan Dharma",
    "Bhagavad Gita",
    "Vedanta",
    "Yoga Sutras",
    "Sanskrit Philology",
    "Vedic Philosophy",
    "Meditation Techniques"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sadhaka",
  url: siteUrl,
  description:
    "Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());

              gtag('config', '${gaMeasurementId}', {
                send_page_view: false,
                debug_mode: true,
              });
            `,
          }}
        />
        <Script
          id="sadhaka-analytics-bridge"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              var JOURNEY_STORAGE_KEY = 'sadhaka_journey_context_v1';
              var safeStringify = function (value) {
                try {
                  return JSON.stringify(value || {});
                } catch (e) {
                  return '{}';
                }
              };

              var readStoredContext = function () {
                try {
                  var raw = window.sessionStorage.getItem(JOURNEY_STORAGE_KEY);
                  return raw ? JSON.parse(raw) : {};
                } catch (e) {
                  return {};
                }
              };

              var writeStoredContext = function (context) {
                try {
                  window.sessionStorage.setItem(JOURNEY_STORAGE_KEY, safeStringify(context));
                } catch (e) {
                  // no-op
                }
              };

              var cleanObject = function (value) {
                var next = {};
                var source = value || {};
                Object.keys(source).forEach(function (key) {
                  var current = source[key];
                  if (current !== undefined && current !== null && current !== '') {
                    next[key] = current;
                  }
                });
                return next;
              };

              var createId = function (prefix) {
                var randomPart = Math.random().toString(36).slice(2, 10);
                return prefix + '_' + Date.now().toString(36) + '_' + randomPart;
              };

              var inferPageArchetype = function (path) {
                var normalized = (path || window.location.pathname || '/').split('?')[0];
                if (normalized === '/faith-finder') return 'conversion-bridge';
                if (normalized.indexOf('/faith-finder/results/') === 0) return 'quiz-result';
                if (normalized === '/compare' || normalized.indexOf('/compare/') === 0) return 'comparison';
                if (normalized === '/articles' || normalized.indexOf('/articles/') === 0) return 'article-index';
                var segments = normalized.split('/').filter(Boolean);
                if (segments.length <= 1 && normalized !== '/') return 'article';
                if (normalized.indexOf('/philosophies') === 0 || normalized.indexOf('/greats') === 0 || normalized.indexOf('/topics') === 0) return 'hub';
                return 'page';
              };

              var enrichContext = function (context) {
                var currentPath = window.location.pathname || '/';
                var merged = cleanObject(Object.assign({}, readStoredContext(), context || {}));

                if (!merged.journeyId) merged.journeyId = createId('journey');
                if (!merged.attributionToken) merged.attributionToken = createId('attr');
                if (!merged.pageTemplate) merged.pageTemplate = currentPath;
                if (!merged.pageArchetype) merged.pageArchetype = inferPageArchetype(currentPath);
                return merged;
              };

              var sendEvent = function (eventName, params) {
                console.log('[Sadhaka Analytics]', eventName, params);
                if (typeof window.gtag === 'function') {
                  window.gtag('event', eventName, params || {});
                }
              };

              window.sadhaka = window.sadhaka || {};

              window.sadhaka.getJourneyContext = function () {
                return enrichContext();
              };

              window.sadhaka.setJourneyContext = function (context) {
                var nextContext = enrichContext(context);
                writeStoredContext(nextContext);
                return nextContext;
              };

              window.sadhaka.clearJourneyContext = function () {
                try {
                  window.sessionStorage.removeItem(JOURNEY_STORAGE_KEY);
                } catch (e) {
                  // no-op
                }
              };

              window.sadhaka.pageView = function (path, title) {
                sendEvent('page_view', {
                  page_path: path || window.location.pathname,
                  page_title: title || document.title,
                  page_location: window.location.href,
                  page_referrer: document.referrer || undefined,
                });
              };

              window.sadhaka.quizStart = function (context) {
                var journey = window.sadhaka.setJourneyContext ? window.sadhaka.setJourneyContext(context) : enrichContext(context);
                sendEvent('faith_finder_quiz_start', {
                  quiz_name: 'faith_finder',
                  journey_id: journey.journeyId,
                  attribution_token: journey.attributionToken,
                  source_article_route: journey.sourceArticleRoute,
                  source_article_slug: journey.sourceArticleSlug,
                  source_pillar: journey.sourcePillar,
                  page_archetype: journey.pageArchetype,
                  page_template: journey.pageTemplate,
                  cta_slot: journey.ctaSlot,
                  cta_label: journey.ctaLabel,
                  cta_destination: journey.ctaDestination,
                  variant: journey.variant,
                  bridge_type: journey.bridgeType,
                });
              };

              window.sadhaka.quizComplete = function (path, scores, context) {
                var journey = window.sadhaka.setJourneyContext ? window.sadhaka.setJourneyContext(Object.assign({}, context || {}, { primaryPath: path || 'unknown' })) : enrichContext(context);
                sendEvent('faith_finder_quiz_complete', {
                  primary_path: path || 'unknown',
                  scores_json: safeStringify(scores),
                  journey_id: journey.journeyId,
                  attribution_token: journey.attributionToken,
                  source_article_route: journey.sourceArticleRoute,
                  source_article_slug: journey.sourceArticleSlug,
                  source_pillar: journey.sourcePillar,
                  page_archetype: journey.pageArchetype,
                  page_template: journey.pageTemplate,
                  cta_slot: journey.ctaSlot,
                  cta_label: journey.ctaLabel,
                  cta_destination: journey.ctaDestination,
                  variant: journey.variant,
                  bridge_type: journey.bridgeType,
                });
              };

              window.sadhaka.emailCapture = function (path, context) {
                var journey = window.sadhaka.setJourneyContext ? window.sadhaka.setJourneyContext(Object.assign({}, context || {}, { primaryPath: path || 'unknown' })) : enrichContext(context);
                sendEvent('faith_finder_email_capture', {
                  primary_path: path || 'unknown',
                  journey_id: journey.journeyId,
                  attribution_token: journey.attributionToken,
                  source_article_route: journey.sourceArticleRoute,
                  source_article_slug: journey.sourceArticleSlug,
                  source_pillar: journey.sourcePillar,
                  page_archetype: journey.pageArchetype,
                  page_template: journey.pageTemplate,
                  cta_slot: journey.ctaSlot,
                  cta_label: journey.ctaLabel,
                  cta_destination: journey.ctaDestination,
                  variant: journey.variant,
                  bridge_type: journey.bridgeType,
                });
              };

              window.sadhaka.quizResultView = function (path, source, context) {
                var journey = window.sadhaka.setJourneyContext ? window.sadhaka.setJourneyContext(Object.assign({}, context || {}, { primaryPath: path || 'unknown', source: source || 'unknown' })) : enrichContext(context);
                sendEvent('faith_finder_result_view', {
                  primary_path: path || 'unknown',
                  source: source || 'unknown',
                  journey_id: journey.journeyId,
                  attribution_token: journey.attributionToken,
                  source_article_route: journey.sourceArticleRoute,
                  source_article_slug: journey.sourceArticleSlug,
                  source_pillar: journey.sourcePillar,
                  page_archetype: journey.pageArchetype,
                  page_template: journey.pageTemplate,
                  cta_slot: journey.ctaSlot,
                  cta_label: journey.ctaLabel,
                  cta_destination: journey.ctaDestination,
                  variant: journey.variant,
                  bridge_type: journey.bridgeType,
                });
              };

              window.sadhaka.shareResult = function (path, source, context) {
                var journey = window.sadhaka.setJourneyContext ? window.sadhaka.setJourneyContext(Object.assign({}, context || {}, { primaryPath: path || 'unknown', source: source || 'unknown' })) : enrichContext(context);
                sendEvent('faith_finder_result_share', {
                  primary_path: path || 'unknown',
                  source: source || 'unknown',
                  journey_id: journey.journeyId,
                  attribution_token: journey.attributionToken,
                  source_article_route: journey.sourceArticleRoute,
                  source_article_slug: journey.sourceArticleSlug,
                  source_pillar: journey.sourcePillar,
                  page_archetype: journey.pageArchetype,
                  page_template: journey.pageTemplate,
                  cta_slot: journey.ctaSlot,
                  cta_label: journey.ctaLabel,
                  cta_destination: journey.ctaDestination,
                  variant: journey.variant,
                  bridge_type: journey.bridgeType,
                });
              };

              window.sadhaka.articleRead = function (slug, pillar, context) {
                var route = window.location.pathname || '/';
                var journey = window.sadhaka.setJourneyContext
                  ? window.sadhaka.setJourneyContext(Object.assign({}, context || {}, {
                      sourceArticleRoute: context && context.sourceArticleRoute ? context.sourceArticleRoute : route,
                      sourceArticleSlug: slug || 'unknown',
                      sourcePillar: pillar || 'unknown',
                      pageArchetype: (context && context.pageArchetype) || 'article',
                      pageTemplate: route,
                    }))
                  : enrichContext(context);
                sendEvent('seo_article_read', {
                  article_slug: slug || 'unknown',
                  article_pillar: pillar || 'unknown',
                  source_article_route: journey.sourceArticleRoute,
                  page_archetype: journey.pageArchetype,
                  page_template: journey.pageTemplate,
                  journey_id: journey.journeyId,
                  attribution_token: journey.attributionToken,
                });
              };

              window.sadhaka.ctaClick = function (label, destination, context) {
                var journey = window.sadhaka.setJourneyContext
                  ? window.sadhaka.setJourneyContext(Object.assign({}, context || {}, {
                      ctaLabel: label || 'unknown',
                      ctaDestination: destination || '',
                    }))
                  : enrichContext(context);
                sendEvent('cta_click', {
                  cta_label: label || 'unknown',
                  cta_destination: destination || '',
                  source_article_route: journey.sourceArticleRoute,
                  source_article_slug: journey.sourceArticleSlug,
                  source_pillar: journey.sourcePillar,
                  page_archetype: journey.pageArchetype,
                  page_template: journey.pageTemplate,
                  cta_slot: journey.ctaSlot,
                  variant: journey.variant,
                  bridge_type: journey.bridgeType,
                  journey_id: journey.journeyId,
                  attribution_token: journey.attributionToken,
                });
              };

              window.sadhaka.appOpen = function () {
                sendEvent('app_open', {
                  surface: 'web',
                });
              };

              window.sadhaka.pathExplore = function (path, context) {
                var journey = window.sadhaka.setJourneyContext
                  ? window.sadhaka.setJourneyContext(Object.assign({}, context || {}, { pathName: path || 'unknown' }))
                  : enrichContext(context);
                sendEvent('path_explore', {
                  path_name: path || 'unknown',
                  source_article_route: journey.sourceArticleRoute,
                  source_article_slug: journey.sourceArticleSlug,
                  source_pillar: journey.sourcePillar,
                  page_archetype: journey.pageArchetype,
                  page_template: journey.pageTemplate,
                  cta_slot: journey.ctaSlot,
                  journey_id: journey.journeyId,
                  attribution_token: journey.attributionToken,
                });
              };
            })();
          `,
          }}
        />
        <ReadProgress />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
