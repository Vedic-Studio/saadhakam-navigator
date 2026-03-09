module.exports = [
"[project]/Developer/Sadhaka/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Developer/Sadhaka/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Developer/Sadhaka/node_modules/next/script.js [app-rsc] (ecmascript)");
;
;
;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://opensadhaka.com";
const gaMeasurementId = "G-S3DHYPPG9R";
const gscVerificationCode = process.env.GSC_VERIFICATION?.trim() || process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();
const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",
        template: "%s | Sadhaka"
    },
    description: "Explore 10,000 years of Vedic wisdom with Sadhaka AI. Learn Bhagavad Gita, Vedas, Upanishads, and authentic spiritual practices. Your guide to Sanatan Dharma.",
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
        "spiritual practices"
    ],
    authors: [
        {
            name: "Sadhaka",
            url: siteUrl
        }
    ],
    creator: "Sadhaka",
    publisher: "Sadhaka",
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    openGraph: {
        title: "Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",
        description: "Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.",
        url: siteUrl,
        siteName: "Sadhaka",
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",
        description: "Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },
    alternates: {
        canonical: siteUrl
    },
    verification: gscVerificationCode ? {
        google: gscVerificationCode
    } : undefined
};
// Organization structured data — site-wide
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sadhaka",
    url: siteUrl,
    description: "Your AI-powered companion for exploring Sanatan Dharma, Bhagavad Gita, Vedas, and ancient spiritual wisdom.",
    sameAs: [
        "https://twitter.com/opensadhaka",
        "https://instagram.com/opensadhaka",
        "https://youtube.com/@opensadhaka"
    ]
};
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sadhaka",
    url: siteUrl,
    description: "Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.",
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
    }
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify(organizationSchema)
                        }
                    }, void 0, false, {
                        fileName: "[project]/Developer/Sadhaka/src/app/layout.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify(websiteSchema)
                        }
                    }, void 0, false, {
                        fileName: "[project]/Developer/Sadhaka/src/app/layout.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Developer/Sadhaka/src/app/layout.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        src: `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`,
                        strategy: "beforeInteractive"
                    }, void 0, false, {
                        fileName: "[project]/Developer/Sadhaka/src/app/layout.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        id: "google-tag",
                        strategy: "beforeInteractive",
                        children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());

            gtag('config', '${gaMeasurementId}');
          `
                    }, void 0, false, {
                        fileName: "[project]/Developer/Sadhaka/src/app/layout.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        id: "sadhaka-analytics-bridge",
                        strategy: "afterInteractive",
                        children: `
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
          `
                    }, void 0, false, {
                        fileName: "[project]/Developer/Sadhaka/src/app/layout.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/Developer/Sadhaka/src/app/layout.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Developer/Sadhaka/src/app/layout.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
}),
"[project]/Developer/Sadhaka/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Developer/Sadhaka/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/Developer/Sadhaka/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js <module evaluation>"));
}),
"[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js [app-rsc] (client reference proxy)", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/Developer/Sadhaka/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js"));
}),
"[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$client$2f$script$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$client$2f$script$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$Developer$2f$Sadhaka$2f$node_modules$2f$next$2f$dist$2f$client$2f$script$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/Developer/Sadhaka/node_modules/next/script.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=Developer_Sadhaka_ecf471a3._.js.map