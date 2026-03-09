import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://opensadhaka.com";
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());

            gtag('config', '${gaMeasurementId}', {
              send_page_view: false,
            });
          `}
        </Script>
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
        <Script id="sadhaka-analytics-bridge" strategy="afterInteractive">
          {`
            (function () {
              var safeStringify = function (value) {
                try {
                  return JSON.stringify(value || {});
                } catch (e) {
                  return '{}';
                }
              };

              var sendEvent = function (eventName, params) {
                if (typeof window.gtag === 'function') {
                  window.gtag('event', eventName, params || {});
                }
              };

              window.sadhaka = window.sadhaka || {};

              window.sadhaka.pageView = function (path, title) {
                sendEvent('page_view', {
                  page_path: path || window.location.pathname,
                  page_title: title || document.title,
                  page_location: window.location.href,
                  page_referrer: document.referrer || undefined,
                });
              };

              window.sadhaka.quizStart = function () {
                sendEvent('faith_finder_quiz_start', {
                  quiz_name: 'faith_finder',
                });
              };

              window.sadhaka.quizComplete = function (path, scores) {
                sendEvent('faith_finder_quiz_complete', {
                  primary_path: path || 'unknown',
                  scores_json: safeStringify(scores),
                });
              };

              window.sadhaka.emailCapture = function (path) {
                sendEvent('faith_finder_email_capture', {
                  primary_path: path || 'unknown',
                });
              };

              window.sadhaka.quizResultView = function (path, source) {
                sendEvent('faith_finder_result_view', {
                  primary_path: path || 'unknown',
                  source: source || 'unknown',
                });
              };

              window.sadhaka.shareResult = function (path, source) {
                sendEvent('faith_finder_result_share', {
                  primary_path: path || 'unknown',
                  source: source || 'unknown',
                });
              };

              window.sadhaka.articleRead = function (slug, pillar) {
                sendEvent('seo_article_read', {
                  article_slug: slug || 'unknown',
                  article_pillar: pillar || 'unknown',
                });
              };

              window.sadhaka.ctaClick = function (label, destination) {
                sendEvent('cta_click', {
                  cta_label: label || 'unknown',
                  cta_destination: destination || '',
                });
              };

              window.sadhaka.appOpen = function () {
                sendEvent('app_open', {
                  surface: 'web',
                });
              };

              window.sadhaka.pathExplore = function (path) {
                sendEvent('path_explore', {
                  path_name: path || 'unknown',
                });
              };
            })();
          `}
        </Script>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
