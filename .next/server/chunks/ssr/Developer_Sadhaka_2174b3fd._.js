module.exports=[79066,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(99356);a.n(d("[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js <module evaluation>"))},78143,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(99356);a.n(d("[project]/Developer/Sadhaka/node_modules/next/dist/client/script.js"))},32184,a=>{"use strict";a.i(79066);var b=a.i(78143);a.n(b)},93256,(a,b,c)=>{b.exports=a.r(32184)},64442,a=>{"use strict";a.s(["AnalyticsTracker",()=>b]);let b=(0,a.i(99356).registerClientReference)(function(){throw Error("Attempted to call AnalyticsTracker() from the server but AnalyticsTracker is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/Developer/Sadhaka/src/components/AnalyticsTracker.tsx <module evaluation>","AnalyticsTracker")},42151,a=>{"use strict";a.s(["AnalyticsTracker",()=>b]);let b=(0,a.i(99356).registerClientReference)(function(){throw Error("Attempted to call AnalyticsTracker() from the server but AnalyticsTracker is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/Developer/Sadhaka/src/components/AnalyticsTracker.tsx","AnalyticsTracker")},19084,a=>{"use strict";a.i(64442);var b=a.i(42151);a.n(b)},22774,a=>{"use strict";var b=a.i(67291),c=a.i(50656),d=a.i(93256),e=a.i(19084);let f=process.env.NEXT_PUBLIC_SITE_URL||"https://opensadhaka.com",g="G-S3DHYPPG9R",h=process.env.GSC_VERIFICATION?.trim()||process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim(),i={metadataBase:new URL(f),title:{default:"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",template:"%s | Sadhaka"},description:"Explore 10,000 years of Vedic wisdom with Sadhaka AI. Learn Bhagavad Gita, Vedas, Upanishads, and authentic spiritual practices. Your guide to Sanatan Dharma.",keywords:["sanatan dharma","bhagavad gita","vedas","upanishads","yoga philosophy","sanskrit","spiritual guidance","vedanta","sadhana","meditation","spiritual practices"],authors:[{name:"Sadhaka",url:f}],creator:"Sadhaka",publisher:"Sadhaka",formatDetection:{email:!1,address:!1,telephone:!1},openGraph:{title:"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",description:"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.",url:f,siteName:"Sadhaka",locale:"en_US",type:"website"},twitter:{card:"summary_large_image",title:"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",description:"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."},robots:{index:!0,follow:!0,googleBot:{index:!0,follow:!0,"max-video-preview":-1,"max-image-preview":"large","max-snippet":-1}},alternates:{canonical:f},verification:h?{google:h}:void 0},j={"@context":"https://schema.org","@type":"Organization","@id":`${f}/#organization`,name:"Sadhaka",url:f,logo:{"@type":"ImageObject",url:`${f}/logo.png`,width:600,height:60},description:"Sadhaka is a comprehensive AI-powered spiritual encyclopedia and practitioner platform dedicated to 10,000 years of Sanatan Dharma wisdom, including Vedas, Upanishads, and Yoga philosophy.",sameAs:["https://twitter.com/opensadhaka","https://instagram.com/opensadhaka","https://youtube.com/@opensadhaka","https://github.com/opensadhaka","https://www.linkedin.com/company/opensadhaka","https://www.crunchbase.com/organization/sadhaka","https://en.wikipedia.org/wiki/Sanatan_Dharma"],knowsAbout:["Sanatan Dharma","Bhagavad Gita","Vedanta","Yoga Sutras","Sanskrit Philology","Vedic Philosophy","Meditation Techniques"]},k={"@context":"https://schema.org","@type":"WebSite",name:"Sadhaka",url:f,description:"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.",potentialAction:{"@type":"SearchAction",target:{"@type":"EntryPoint",urlTemplate:`${f}/search?q={search_term_string}`},"query-input":"required name=search_term_string"}};function l({children:a}){return(0,b.jsxs)("html",{lang:"en",children:[(0,b.jsxs)("head",{children:[(0,b.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(j)}}),(0,b.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(k)}})]}),(0,b.jsxs)("body",{children:[(0,b.jsx)(d.default,{src:`https://www.googletagmanager.com/gtag/js?id=${g}`,strategy:"afterInteractive"}),(0,b.jsx)(d.default,{id:"google-analytics",strategy:"afterInteractive",dangerouslySetInnerHTML:{__html:`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());

              gtag('config', '${g}', {
                send_page_view: false,
              });
            `}}),(0,b.jsx)(d.default,{id:"sadhaka-analytics-bridge",strategy:"afterInteractive",dangerouslySetInnerHTML:{__html:`
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
          `}}),(0,b.jsx)(c.Suspense,{fallback:null,children:(0,b.jsx)(e.AnalyticsTracker,{})}),a]})]})}a.s(["default",()=>l,"metadata",0,i])}];

//# sourceMappingURL=Developer_Sadhaka_2174b3fd._.js.map