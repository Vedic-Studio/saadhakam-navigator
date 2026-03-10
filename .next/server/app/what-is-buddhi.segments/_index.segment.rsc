1:"$Sreact.fragment"
2:I[79520,["/_next/static/chunks/e9f922839a1f4c35.js"],""]
6:"$Sreact.suspense"
7:I[47534,["/_next/static/chunks/e9f922839a1f4c35.js"],"AnalyticsTracker"]
8:I[39756,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
9:I[37457,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
:HL["/_next/static/chunks/82ea0c79ec3f2bd8.css","style"]
3:Tbbe,
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
          0:{"buildId":"X0tyGrytuUvToe7E4bRCl","rsc":["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/82ea0c79ec3f2bd8.css","precedence":"next"}],["$","script","script-0",{"src":"/_next/static/chunks/e9f922839a1f4c35.js","async":true}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"@id\":\"https://opensadhaka.com/#organization\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://opensadhaka.com/logo.png\",\"width\":600,\"height\":60},\"description\":\"Sadhaka is a comprehensive AI-powered spiritual encyclopedia and practitioner platform dedicated to 10,000 years of Sanatan Dharma wisdom, including Vedas, Upanishads, and Yoga philosophy.\",\"sameAs\":[\"https://twitter.com/opensadhaka\",\"https://instagram.com/opensadhaka\",\"https://youtube.com/@opensadhaka\",\"https://github.com/opensadhaka\",\"https://www.linkedin.com/company/opensadhaka\",\"https://www.crunchbase.com/organization/sadhaka\",\"https://en.wikipedia.org/wiki/Sanatan_Dharma\"],\"knowsAbout\":[\"Sanatan Dharma\",\"Bhagavad Gita\",\"Vedanta\",\"Yoga Sutras\",\"Sanskrit Philology\",\"Vedic Philosophy\",\"Meditation Techniques\"]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"https://opensadhaka.com/search?q={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}}"}}]]}],["$","body",null,{"children":[["$","$L2",null,{"src":"https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R","strategy":"afterInteractive"}],["$","$L2",null,{"id":"google-analytics","strategy":"afterInteractive","dangerouslySetInnerHTML":{"__html":"\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);}\n              window.gtag = gtag;\n              gtag('js', new Date());\n\n              gtag('config', 'G-S3DHYPPG9R', {\n                send_page_view: false,\n              });\n            "}}],["$","$L2",null,{"id":"sadhaka-analytics-bridge","strategy":"afterInteractive","dangerouslySetInnerHTML":{"__html":"$3"}}],"$L4","$L5"]}]]}]]}],"loading":null,"isPartial":false}
4:["$","$6",null,{"fallback":null,"children":["$","$L7",null,{}]}]
5:["$","$L8",null,{"parallelRouterKey":"children","template":["$","$L9",null,{}],"notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]]}]
