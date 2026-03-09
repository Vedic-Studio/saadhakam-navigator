1:"$Sreact.fragment"
2:I[79520,["/_next/static/chunks/e9f922839a1f4c35.js"],""]
9:I[68027,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
:HL["/_next/static/chunks/c6fc1b3793e78dc0.css","style"]
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
          0:{"P":null,"b":"woRPFmW9gbreHptCB1uqj","c":["","inquiry-vs-devotion-path"],"q":"","i":false,"f":[[["",{"children":["inquiry-vs-devotion-path",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/c6fc1b3793e78dc0.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/e9f922839a1f4c35.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","script",null,{"async":true,"src":"https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R"}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);}\n              window.gtag = window.gtag || gtag;\n              gtag('js', new Date());\n\n              gtag('config', 'G-S3DHYPPG9R', { send_page_view: false });\n            "}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Your AI-powered companion for exploring Sanatan Dharma, Bhagavad Gita, Vedas, and ancient spiritual wisdom.\",\"sameAs\":[\"https://twitter.com/opensadhaka\",\"https://instagram.com/opensadhaka\",\"https://youtube.com/@opensadhaka\"]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"https://opensadhaka.com/search?q={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}}"}}]]}],["$","body",null,{"children":[["$","$L2",null,{"id":"sadhaka-analytics-bridge","strategy":"afterInteractive","children":"$3"}],"$L4","$L5"]}]]}]]}],{"children":["$L6",{"children":["$L7",{},null,false,false]},null,false,false]},null,false,false],"$L8",false]],"m":"$undefined","G":["$9",[]],"S":true}
a:"$Sreact.suspense"
b:I[47534,["/_next/static/chunks/e9f922839a1f4c35.js"],"AnalyticsTracker"]
c:I[39756,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
d:I[37457,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
e:I[90771,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/954ac37ed5870e5e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"ContentPageTracker"]
f:I[2971,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/954ac37ed5870e5e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"Header"]
10:I[90771,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/954ac37ed5870e5e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"TrackedLink"]
18:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"ViewportBoundary"]
1a:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"MetadataBoundary"]
4:["$","$a",null,{"fallback":null,"children":["$","$Lb",null,{}]}]
5:["$","$Lc",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Ld",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]
6:["$","$1","c",{"children":[null,["$","$Lc",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Ld",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
7:["$","$1","c",{"children":[["$","div",null,{"className":"min-h-screen bg-background text-foreground flex flex-col","children":[["$","$Le",null,{"slug":"inquiry-vs-devotion-path","pillar":"seo-chooser"}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"What is the Inquiry path in spirituality?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"The Inquiry path is centered on self-knowledge through contemplation and direct investigation of consciousness. It is strongly associated with Jnana Yoga and Vedanta.\"}},{\"@type\":\"Question\",\"name\":\"What is the Devotion path in spirituality?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"The Devotion path is centered on love, surrender, and relationship with the Divine through prayer, mantra, and bhakti practices.\"}},{\"@type\":\"Question\",\"name\":\"Can I combine Inquiry and Devotion?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Many practitioners begin with one dominant path and then integrate the other. Inquiry gives clarity; devotion gives emotional depth and surrender.\"}}]}"}}],["$","$Lf",null,{}],["$","main",null,{"className":"flex-grow pt-28 pb-16","children":["$","div",null,{"className":"container-padding max-w-5xl mx-auto","children":[["$","header",null,{"className":"text-center mb-14","children":[["$","h1",null,{"className":"font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight","children":["Inquiry vs ",["$","span",null,{"className":"text-orange-500","children":"Devotion"}]," Path"]}],["$","p",null,{"className":"text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed","children":"Two of the most powerful entry points in Sanatan Dharma. One starts with clarity of mind. The other starts with openness of heart."}]]}],["$","div",null,{"className":"grid md:grid-cols-2 gap-7 mb-12","children":[["$","article",null,{"className":"rounded-2xl border border-border/60 bg-card p-8","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-brain w-8 h-8 text-orange-500 mb-4","children":[["$","path","l5xja",{"d":"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["$","path","ep3f8r",{"d":"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"}],["$","path","1p4c4q",{"d":"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"}],["$","path","tmeiqw",{"d":"M17.599 6.5a3 3 0 0 0 .399-1.375"}],["$","path","105sqy",{"d":"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["$","path","ql3yin",{"d":"M3.477 10.896a4 4 0 0 1 .585-.396"}],["$","path","1qfode",{"d":"M19.938 10.5a4 4 0 0 1 .585.396"}],["$","path","2e4loj",{"d":"M6 18a4 4 0 0 1-1.967-.516"}],["$","path","159ez6",{"d":"M19.967 17.484A4 4 0 0 1 18 18"}],"$undefined"]}],["$","h2",null,{"className":"text-2xl font-semibold mb-3","children":"Path of Inquiry (Jnana)"}],["$","p",null,{"className":"text-muted-foreground leading-relaxed mb-5","children":"Best for analytical seekers who ask: “Who am I?” and “What is real?” Practices include self-inquiry, scripture study, and contemplative silence."}],["$","ul",null,{"className":"space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6","children":[["$","li",null,{"children":"Primary strength: discrimination and clarity"}],["$","li",null,{"children":"Core practices: self-inquiry, contemplation, Vedanta study"}],["$","li",null,{"children":"Common challenge: staying in the head without embodied integration"}]]}],["$","$L10",null,{"href":"/what-is-vedanta","eventLabel":"inquiry_vs_devotion:inquiry:/what-is-vedanta","trackPathName":"inquiry","className":"inline-flex items-center text-orange-400 font-semibold","children":["Explore Inquiry path ","$L11"]}]]}],"$L12"]}],"$L13"]}]}],"$L14"]}],["$L15","$L16"],"$L17"]}]
8:["$","$1","h",{"children":[null,["$","$L18",null,{"children":"$L19"}],["$","div",null,{"hidden":true,"children":["$","$L1a",null,{"children":["$","$a",null,{"name":"Next.Metadata","children":"$L1b"}]}]}],null]}]
1c:I[13642,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/954ac37ed5870e5e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"Footer"]
1d:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"OutletBoundary"]
11:["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-4 h-4","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]
12:["$","article",null,{"className":"rounded-2xl border border-border/60 bg-card p-8","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-heart w-8 h-8 text-orange-500 mb-4","children":[["$","path","c3ymky",{"d":"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],"$undefined"]}],["$","h2",null,{"className":"text-2xl font-semibold mb-3","children":"Path of Devotion (Bhakti)"}],["$","p",null,{"className":"text-muted-foreground leading-relaxed mb-5","children":"Best for relational seekers who feel drawn to mantra, prayer, and loving surrender to the Divine in personal form."}],["$","ul",null,{"className":"space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6","children":[["$","li",null,{"children":"Primary strength: emotional depth and surrender"}],["$","li",null,{"children":"Core practices: japa, kirtan, puja, devotional reading"}],["$","li",null,{"children":"Common challenge: emotional fluctuation and inconsistency"}]]}],["$","$L10",null,{"href":"/shaivism-vs-vaishnavism","eventLabel":"inquiry_vs_devotion:devotion:/shaivism-vs-vaishnavism","trackPathName":"devotion","className":"inline-flex items-center text-orange-400 font-semibold","children":["Explore Devotion path ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-4 h-4","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}]
13:["$","section",null,{"className":"rounded-2xl border border-orange-900/40 bg-orange-950/20 p-8 text-center","children":[["$","h2",null,{"className":"text-3xl font-display font-bold mb-3","children":"Still unsure which one is yours?"}],["$","p",null,{"className":"text-muted-foreground max-w-2xl mx-auto mb-6","children":"Take the Faith Finder and get a clear primary path, plus traditions and practices you can start this week."}],["$","$L10",null,{"href":"/faith-finder","eventLabel":"inquiry_vs_devotion:cta:faith-finder","trackPathName":"seo-chooser","className":"inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-6 py-3 text-white font-semibold","children":["Find My Path ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-4 h-4","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}]
14:["$","$L1c",null,{}]
15:["$","script","script-0",{"src":"/_next/static/chunks/954ac37ed5870e5e.js","async":true,"nonce":"$undefined"}]
16:["$","script","script-1",{"src":"/_next/static/chunks/79bc64d3981b5c5f.js","async":true,"nonce":"$undefined"}]
17:["$","$L1d",null,{"children":["$","$a",null,{"name":"Next.MetadataOutlet","children":"$@1e"}]}]
19:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
1b:[["$","title","0",{"children":"Inquiry vs Devotion Path: Which One Fits You? | Sadhaka | Sadhaka"}],["$","meta","1",{"name":"description","content":"Compare the Inquiry and Devotion spiritual paths in Sanatan Dharma. Learn how each works and choose the right starting point for your temperament."}],["$","link","2",{"rel":"author","href":"https://opensadhaka.com"}],["$","meta","3",{"name":"author","content":"Sadhaka"}],["$","meta","4",{"name":"keywords","content":"sanatan dharma,bhagavad gita,vedas,upanishads,yoga philosophy,sanskrit,spiritual guidance,vedanta,sadhana,meditation,spiritual practices"}],["$","meta","5",{"name":"creator","content":"Sadhaka"}],["$","meta","6",{"name":"publisher","content":"Sadhaka"}],["$","meta","7",{"name":"robots","content":"index, follow"}],["$","meta","8",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","link","9",{"rel":"canonical","href":"https://opensadhaka.com/inquiry-vs-devotion-path"}],["$","meta","10",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","11",{"property":"og:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","12",{"property":"og:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}],["$","meta","13",{"property":"og:url","content":"https://opensadhaka.com"}],["$","meta","14",{"property":"og:site_name","content":"Sadhaka"}],["$","meta","15",{"property":"og:locale","content":"en_US"}],["$","meta","16",{"property":"og:type","content":"website"}],["$","meta","17",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","18",{"name":"twitter:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","19",{"name":"twitter:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}]]
1e:null
