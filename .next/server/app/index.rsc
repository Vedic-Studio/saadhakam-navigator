1:"$Sreact.fragment"
2:I[80238,["/_next/static/chunks/33b5ddec3c3b997a.js"],""]
7:I[35380,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
:HL["/_next/static/chunks/ddeef4062a5f50ea.css","style"]
3:Ta40,
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
          0:{"P":null,"b":"iUXOO-XKA6A9I4VPpvaa1","c":["",""],"q":"","i":false,"f":[[["",{"children":["__PAGE__",{}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/ddeef4062a5f50ea.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/33b5ddec3c3b997a.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Your AI-powered companion for exploring Sanatan Dharma, Bhagavad Gita, Vedas, and ancient spiritual wisdom.\",\"sameAs\":[\"https://twitter.com/opensadhaka\",\"https://instagram.com/opensadhaka\",\"https://youtube.com/@opensadhaka\"]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"https://opensadhaka.com/search?q={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}}"}}]]}],["$","body",null,{"children":[["$","$L2",null,{"src":"https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R","strategy":"beforeInteractive"}],["$","$L2",null,{"id":"google-tag","strategy":"beforeInteractive","children":"\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            window.gtag = window.gtag || gtag;\n            gtag('js', new Date());\n\n            gtag('config', 'G-S3DHYPPG9R');\n          "}],["$","$L2",null,{"id":"sadhaka-analytics-bridge","strategy":"afterInteractive","children":"$3"}],"$L4"]}]]}]]}],{"children":["$L5",{},null,false,false]},null,false,false],"$L6",false]],"m":"$undefined","G":["$7",[]],"S":true}
8:I[13055,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
9:I[30732,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
a:I[71067,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"Header"]
b:I[7714,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"HeroSection"]
c:I[25526,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"PillarsSection"]
d:I[88925,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"TeachingsCarousel"]
e:I[76974,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"PhilosophyGrid"]
f:I[65107,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"AncientCivilization"]
10:I[57606,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"SadhakaIntroduction"]
11:I[43992,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"SocialProof"]
12:I[46164,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"ConversionSection"]
13:I[89161,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"FAQSection"]
14:I[82899,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"Footer"]
15:I[39676,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/9a35a7f76f58504a.js","/_next/static/chunks/cde3ae7fe003833a.js","/_next/static/chunks/c5f1b248b17893ce.js"],"MobileCTA"]
16:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"OutletBoundary"]
17:"$Sreact.suspense"
19:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"ViewportBoundary"]
1b:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"MetadataBoundary"]
4:["$","$L8",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L9",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]
5:["$","$1","c",{"children":[["$","div",null,{"className":"min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100","children":[["$","$La",null,{}],["$","main",null,{"className":"overflow-x-hidden","children":[["$","$Lb",null,{}],["$","$Lc",null,{}],["$","$Ld",null,{}],["$","$Le",null,{}],["$","$Lf",null,{}],["$","$L10",null,{}],["$","$L11",null,{}],["$","$L12",null,{}],["$","$L13",null,{}]]}],["$","$L14",null,{}],["$","$L15",null,{}]]}],[["$","script","script-0",{"src":"/_next/static/chunks/9a35a7f76f58504a.js","async":true,"nonce":"$undefined"}],["$","script","script-1",{"src":"/_next/static/chunks/cde3ae7fe003833a.js","async":true,"nonce":"$undefined"}],["$","script","script-2",{"src":"/_next/static/chunks/c5f1b248b17893ce.js","async":true,"nonce":"$undefined"}]],["$","$L16",null,{"children":["$","$17",null,{"name":"Next.MetadataOutlet","children":"$@18"}]}]]}]
6:["$","$1","h",{"children":[null,["$","$L19",null,{"children":"$L1a"}],["$","div",null,{"hidden":true,"children":["$","$L1b",null,{"children":["$","$17",null,{"name":"Next.Metadata","children":"$L1c"}]}]}],null]}]
1a:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
18:null
1c:[["$","title","0",{"children":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","1",{"name":"description","content":"Explore 10,000 years of Vedic wisdom with Sadhaka AI. Learn Bhagavad Gita, Vedas, Upanishads, and authentic spiritual practices. Your guide to Sanatan Dharma."}],["$","link","2",{"rel":"author","href":"https://opensadhaka.com"}],["$","meta","3",{"name":"author","content":"Sadhaka"}],["$","meta","4",{"name":"keywords","content":"sanatan dharma,bhagavad gita,vedas,upanishads,yoga philosophy,sanskrit,spiritual guidance,vedanta,sadhana,meditation,spiritual practices"}],["$","meta","5",{"name":"creator","content":"Sadhaka"}],["$","meta","6",{"name":"publisher","content":"Sadhaka"}],["$","meta","7",{"name":"robots","content":"index, follow"}],["$","meta","8",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","link","9",{"rel":"canonical","href":"https://opensadhaka.com"}],["$","meta","10",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","11",{"property":"og:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","12",{"property":"og:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}],["$","meta","13",{"property":"og:url","content":"https://opensadhaka.com"}],["$","meta","14",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","15",{"name":"twitter:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","16",{"name":"twitter:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}]]
