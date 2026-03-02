import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://opensadhaka.com";

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
};

// Organization structured data — site-wide
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sadhaka",
    url: siteUrl,
    description:
        "Your AI-powered companion for exploring Sanatan Dharma, Bhagavad Gita, Vedas, and ancient spiritual wisdom.",
    sameAs: [
        // Add social URLs when available
    ],
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
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R"
                    strategy="afterInteractive"
                />
                <Script id="ga4-init" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S3DHYPPG9R', {
              page_path: window.location.pathname,
            });
          `}
                </Script>
                {children}
            </body>
        </html>
    );
}
