module.exports=[79066,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(99356);a.n(d("[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js <module evaluation>"))},78143,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(99356);a.n(d("[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js"))},32184,a=>{"use strict";a.i(79066);var b=a.i(78143);a.n(b)},93256,(a,b,c)=>{b.exports=a.r(32184)},22774,a=>{"use strict";var b=a.i(67291),c=a.i(93256);let d=process.env.NEXT_PUBLIC_SITE_URL||"https://opensadhaka.com",e=process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID||"G-S3DHYPPG9R",f=process.env.GSC_VERIFICATION?.trim()||process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim(),g={metadataBase:new URL(d),title:{default:"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",template:"%s | Sadhaka"},description:"Explore 10,000 years of Vedic wisdom with Sadhaka AI. Learn Bhagavad Gita, Vedas, Upanishads, and authentic spiritual practices. Your guide to Sanatan Dharma.",keywords:["sanatan dharma","bhagavad gita","vedas","upanishads","yoga philosophy","sanskrit","spiritual guidance","vedanta","sadhana","meditation","spiritual practices"],authors:[{name:"Sadhaka",url:d}],creator:"Sadhaka",publisher:"Sadhaka",formatDetection:{email:!1,address:!1,telephone:!1},openGraph:{title:"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",description:"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.",url:d,siteName:"Sadhaka",locale:"en_US",type:"website"},twitter:{card:"summary_large_image",title:"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",description:"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."},robots:{index:!0,follow:!0,googleBot:{index:!0,follow:!0,"max-video-preview":-1,"max-image-preview":"large","max-snippet":-1}},alternates:{canonical:d},verification:f?{google:f}:void 0},h={"@context":"https://schema.org","@type":"Organization",name:"Sadhaka",url:d,description:"Your AI-powered companion for exploring Sanatan Dharma, Bhagavad Gita, Vedas, and ancient spiritual wisdom.",sameAs:["https://twitter.com/opensadhaka","https://instagram.com/opensadhaka","https://youtube.com/@opensadhaka"]},i={"@context":"https://schema.org","@type":"WebSite",name:"Sadhaka",url:d,description:"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.",potentialAction:{"@type":"SearchAction",target:{"@type":"EntryPoint",urlTemplate:`${d}/search?q={search_term_string}`},"query-input":"required name=search_term_string"}};function j({children:a}){return(0,b.jsxs)("html",{lang:"en",children:[(0,b.jsxs)("head",{children:[(0,b.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(h)}}),(0,b.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(i)}})]}),(0,b.jsxs)("body",{children:[(0,b.jsx)(c.default,{src:`https://www.googletagmanager.com/gtag/js?id=${e}`,strategy:"afterInteractive"}),(0,b.jsx)(c.default,{id:"ga4-init",strategy:"afterInteractive",children:`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', '${e}', {
              page_path: window.location.pathname,
            });
          `}),(0,b.jsx)(c.default,{id:"sadhaka-analytics-bridge",strategy:"afterInteractive",children:`
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
          `}),a]})]})}a.s(["default",()=>j,"metadata",0,g])}];

//# sourceMappingURL=Developer_Sadhaka_e323efb4._.js.map