1:"$Sreact.fragment"
2:I[80238,["/_next/static/chunks/33b5ddec3c3b997a.js"],""]
8:I[35380,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
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
          0:{"P":null,"b":"3qmk8dgXQ5Jwwm3DDqgZ1","c":["","content-agent"],"q":"","i":false,"f":[[["",{"children":["content-agent",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/ddeef4062a5f50ea.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/33b5ddec3c3b997a.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Your AI-powered companion for exploring Sanatan Dharma, Bhagavad Gita, Vedas, and ancient spiritual wisdom.\",\"sameAs\":[\"https://twitter.com/opensadhaka\",\"https://instagram.com/opensadhaka\",\"https://youtube.com/@opensadhaka\"]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"https://opensadhaka.com/search?q={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}}"}}]]}],["$","body",null,{"children":[["$","$L2",null,{"src":"https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R","strategy":"afterInteractive"}],["$","$L2",null,{"id":"ga4-init","strategy":"afterInteractive","children":"\n            window.dataLayer = window.dataLayer || [];\n            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};\n            window.gtag('js', new Date());\n            window.gtag('config', 'G-S3DHYPPG9R', {\n              page_path: window.location.pathname,\n            });\n          "}],["$","$L2",null,{"id":"sadhaka-analytics-bridge","strategy":"afterInteractive","children":"$3"}],"$L4"]}]]}]]}],{"children":["$L5",{"children":["$L6",{},null,false,false]},null,false,false]},null,false,false],"$L7",false]],"m":"$undefined","G":["$8",[]],"S":true}
9:I[13055,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
a:I[30732,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
b:I[33230,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/ac699300991390a3.js"],"GenerateWorkbench"]
c:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"OutletBoundary"]
d:"$Sreact.suspense"
f:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"ViewportBoundary"]
11:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"MetadataBoundary"]
4:["$","$L9",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$La",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]
5:["$","$1","c",{"children":[null,["$","$L9",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$La",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
6:["$","$1","c",{"children":[["$","main",null,{"className":"min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-10","children":["$","div",null,{"className":"mx-auto max-w-6xl","children":[["$","h1",null,{"className":"text-3xl font-semibold tracking-tight","children":"Content Agent Workbench"}],["$","p",null,{"className":"mt-2 text-sm text-muted-foreground","children":"Phase 1 core loop: Topic → Content → Score"}],["$","div",null,{"className":"mt-8","children":["$","$Lb",null,{}]}]]}]}],[["$","script","script-0",{"src":"/_next/static/chunks/ac699300991390a3.js","async":true,"nonce":"$undefined"}]],["$","$Lc",null,{"children":["$","$d",null,{"name":"Next.MetadataOutlet","children":"$@e"}]}]]}]
7:["$","$1","h",{"children":[null,["$","$Lf",null,{"children":"$L10"}],["$","div",null,{"hidden":true,"children":["$","$L11",null,{"children":["$","$d",null,{"name":"Next.Metadata","children":"$L12"}]}]}],null]}]
10:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
e:null
12:[["$","title","0",{"children":"Content Agent Workbench | Sadhaka"}],["$","meta","1",{"name":"description","content":"Phase 1 workbench for topic-to-content generation and quality scoring."}],["$","link","2",{"rel":"author","href":"https://opensadhaka.com"}],["$","meta","3",{"name":"author","content":"Sadhaka"}],["$","meta","4",{"name":"keywords","content":"sanatan dharma,bhagavad gita,vedas,upanishads,yoga philosophy,sanskrit,spiritual guidance,vedanta,sadhana,meditation,spiritual practices"}],["$","meta","5",{"name":"creator","content":"Sadhaka"}],["$","meta","6",{"name":"publisher","content":"Sadhaka"}],["$","meta","7",{"name":"robots","content":"index, follow"}],["$","meta","8",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","link","9",{"rel":"canonical","href":"https://opensadhaka.com/content-agent"}],["$","meta","10",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","11",{"property":"og:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","12",{"property":"og:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}],["$","meta","13",{"property":"og:url","content":"https://opensadhaka.com"}],["$","meta","14",{"property":"og:site_name","content":"Sadhaka"}],["$","meta","15",{"property":"og:locale","content":"en_US"}],["$","meta","16",{"property":"og:type","content":"website"}],["$","meta","17",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","18",{"name":"twitter:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","19",{"name":"twitter:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}]]
