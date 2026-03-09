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
          0:{"P":null,"b":"iUXOO-XKA6A9I4VPpvaa1","c":["","spiritual-paths-explained"],"q":"","i":false,"f":[[["",{"children":["spiritual-paths-explained",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/ddeef4062a5f50ea.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/33b5ddec3c3b997a.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Your AI-powered companion for exploring Sanatan Dharma, Bhagavad Gita, Vedas, and ancient spiritual wisdom.\",\"sameAs\":[\"https://twitter.com/opensadhaka\",\"https://instagram.com/opensadhaka\",\"https://youtube.com/@opensadhaka\"]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"https://opensadhaka.com/search?q={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}}"}}]]}],["$","body",null,{"children":[["$","$L2",null,{"src":"https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R","strategy":"beforeInteractive"}],["$","$L2",null,{"id":"google-tag","strategy":"beforeInteractive","children":"\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            window.gtag = window.gtag || gtag;\n            gtag('js', new Date());\n\n            gtag('config', 'G-S3DHYPPG9R');\n          "}],["$","$L2",null,{"id":"sadhaka-analytics-bridge","strategy":"afterInteractive","children":"$3"}],"$L4"]}]]}]]}],{"children":["$L5",{"children":["$L6",{},null,false,false]},null,false,false]},null,false,false],"$L7",false]],"m":"$undefined","G":["$8",[]],"S":true}
9:I[13055,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
a:I[30732,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
b:I[71067,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/087b1d481975c188.js","/_next/static/chunks/cde3ae7fe003833a.js"],"Header"]
c:I[83071,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/087b1d481975c188.js","/_next/static/chunks/cde3ae7fe003833a.js"],""]
16:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"ViewportBoundary"]
18:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"MetadataBoundary"]
19:"$Sreact.suspense"
4:["$","$L9",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$La",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]
5:["$","$1","c",{"children":[null,["$","$L9",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$La",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
6:["$","$1","c",{"children":[["$","div",null,{"className":"min-h-screen bg-background text-foreground flex flex-col","children":[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"How do I know which spiritual path is right for me?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"The right path usually matches your natural temperament: analytical minds lean toward inquiry, emotional hearts toward devotion, structure-loving minds toward ritual, and process-oriented minds toward discipline.\"}},{\"@type\":\"Question\",\"name\":\"Can I follow more than one spiritual path?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Most mature practitioners integrate multiple paths over time. It helps to choose one primary path first, then add supporting practices from others.\"}},{\"@type\":\"Question\",\"name\":\"What is the best spiritual path for beginners?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"The best beginner path is the one you can practice consistently. Start with one daily practice for 10–20 minutes and build depth gradually.\"}}]}"}}],["$","$Lb",null,{}],["$","main",null,{"className":"flex-grow pt-28 pb-16","children":["$","div",null,{"className":"container-padding max-w-5xl mx-auto","children":[["$","header",null,{"className":"text-center mb-16","children":[["$","h1",null,{"className":"font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight","children":["Spiritual Paths ",["$","span",null,{"className":"text-orange-500","children":"Explained"}]]}],["$","p",null,{"className":"text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed","children":"Not everyone starts spirituality in the same way. This guide helps you understand the four primary entry paths and choose one that fits how you naturally think, feel, and act."}]]}],["$","div",null,{"className":"grid md:grid-cols-2 gap-7 mb-14","children":[["$","article","Path of Inquiry",{"className":"rounded-2xl border border-border/60 bg-card p-7 hover:border-orange-500/40 transition-colors","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-brain w-8 h-8 text-orange-500 mb-4","children":[["$","path","l5xja",{"d":"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["$","path","ep3f8r",{"d":"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"}],["$","path","1p4c4q",{"d":"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"}],["$","path","tmeiqw",{"d":"M17.599 6.5a3 3 0 0 0 .399-1.375"}],["$","path","105sqy",{"d":"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["$","path","ql3yin",{"d":"M3.477 10.896a4 4 0 0 1 .585-.396"}],["$","path","1qfode",{"d":"M19.938 10.5a4 4 0 0 1 .585.396"}],["$","path","2e4loj",{"d":"M6 18a4 4 0 0 1-1.967-.516"}],["$","path","159ez6",{"d":"M19.967 17.484A4 4 0 0 1 18 18"}],"$undefined"]}],["$","h2",null,{"className":"text-2xl font-semibold mb-3","children":"Path of Inquiry"}],["$","p",null,{"className":"text-muted-foreground mb-6 leading-relaxed","children":"For seekers who ask deep questions about self, reality, and consciousness. Rooted in Vedanta and direct self-inquiry."}],["$","$Lc",null,{"href":"/what-is-vedanta","className":"inline-flex items-center text-orange-400 font-semibold hover:text-orange-300","children":["Explore this path ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-4 h-4","children":[["$","path","1ays0h",{"d":"M5 12h14"}],"$Ld","$undefined"]}]]}]]}],"$Le","$Lf","$L10"]}],"$L11"]}]}],"$L12"]}],["$L13","$L14"],"$L15"]}]
7:["$","$1","h",{"children":[null,["$","$L16",null,{"children":"$L17"}],["$","div",null,{"hidden":true,"children":["$","$L18",null,{"children":["$","$19",null,{"name":"Next.Metadata","children":"$L1a"}]}]}],null]}]
1b:I[82899,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/087b1d481975c188.js","/_next/static/chunks/cde3ae7fe003833a.js"],"Footer"]
1c:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"OutletBoundary"]
d:["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}]
e:["$","article","Path of Devotion",{"className":"rounded-2xl border border-border/60 bg-card p-7 hover:border-orange-500/40 transition-colors","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-heart w-8 h-8 text-orange-500 mb-4","children":[["$","path","c3ymky",{"d":"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],"$undefined"]}],["$","h2",null,{"className":"text-2xl font-semibold mb-3","children":"Path of Devotion"}],["$","p",null,{"className":"text-muted-foreground mb-6 leading-relaxed","children":"For seekers drawn to love, surrender, and relationship with the Divine through mantra, prayer, and bhakti."}],["$","$Lc",null,{"href":"/shaivism-vs-vaishnavism","className":"inline-flex items-center text-orange-400 font-semibold hover:text-orange-300","children":["Explore this path ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-4 h-4","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}]
f:["$","article","Path of Ritual",{"className":"rounded-2xl border border-border/60 bg-card p-7 hover:border-orange-500/40 transition-colors","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-sparkles w-8 h-8 text-orange-500 mb-4","children":[["$","path","4pj2yx",{"d":"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}],["$","path","1olli1",{"d":"M20 3v4"}],["$","path","1gvqau",{"d":"M22 5h-4"}],["$","path","vumght",{"d":"M4 17v2"}],["$","path","zchphs",{"d":"M5 18H3"}],"$undefined"]}],["$","h2",null,{"className":"text-2xl font-semibold mb-3","children":"Path of Ritual"}],["$","p",null,{"className":"text-muted-foreground mb-6 leading-relaxed","children":"For seekers who connect through sacred structure, daily observances, offerings, and symbolic embodied practice."}],["$","$Lc",null,{"href":"/spiritual-traditions-paths","className":"inline-flex items-center text-orange-400 font-semibold hover:text-orange-300","children":["Explore this path ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-4 h-4","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}]
10:["$","article","Path of Discipline",{"className":"rounded-2xl border border-border/60 bg-card p-7 hover:border-orange-500/40 transition-colors","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-compass w-8 h-8 text-orange-500 mb-4","children":[["$","path","9ktpf1",{"d":"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"}],["$","circle","1mglay",{"cx":"12","cy":"12","r":"10"}],"$undefined"]}],["$","h2",null,{"className":"text-2xl font-semibold mb-3","children":"Path of Discipline"}],["$","p",null,{"className":"text-muted-foreground mb-6 leading-relaxed","children":"For seekers who progress through methodical training of body, breath, and mind in structured stages."}],["$","$Lc",null,{"href":"/yoga-sutras-complete-guide","className":"inline-flex items-center text-orange-400 font-semibold hover:text-orange-300","children":["Explore this path ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-4 h-4","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}]
11:["$","section",null,{"className":"rounded-2xl border border-orange-900/40 bg-orange-950/20 p-8 text-center","children":[["$","h2",null,{"className":"text-3xl font-display font-bold mb-3","children":"Want a personalized answer?"}],["$","p",null,{"className":"text-muted-foreground max-w-2xl mx-auto mb-6","children":"Take the Faith Finder Quiz to discover your dominant spiritual path, recommended traditions, and practices to start right now."}],["$","$Lc",null,{"href":"/faith-finder","className":"inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-6 py-3 text-white font-semibold","children":["Take the Faith Finder ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-4 h-4","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}]
12:["$","$L1b",null,{}]
13:["$","script","script-0",{"src":"/_next/static/chunks/087b1d481975c188.js","async":true,"nonce":"$undefined"}]
14:["$","script","script-1",{"src":"/_next/static/chunks/cde3ae7fe003833a.js","async":true,"nonce":"$undefined"}]
15:["$","$L1c",null,{"children":["$","$19",null,{"name":"Next.MetadataOutlet","children":"$@1d"}]}]
17:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
1a:[["$","title","0",{"children":"Spiritual Paths Explained: A Beginner-Friendly Guide | Sadhaka | Sadhaka"}],["$","meta","1",{"name":"description","content":"Understand the major spiritual paths in Sanatan Dharma—Inquiry, Devotion, Ritual, and Discipline—and discover which one matches your temperament."}],["$","link","2",{"rel":"author","href":"https://opensadhaka.com"}],["$","meta","3",{"name":"author","content":"Sadhaka"}],["$","meta","4",{"name":"keywords","content":"sanatan dharma,bhagavad gita,vedas,upanishads,yoga philosophy,sanskrit,spiritual guidance,vedanta,sadhana,meditation,spiritual practices"}],["$","meta","5",{"name":"creator","content":"Sadhaka"}],["$","meta","6",{"name":"publisher","content":"Sadhaka"}],["$","meta","7",{"name":"robots","content":"index, follow"}],["$","meta","8",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","link","9",{"rel":"canonical","href":"https://opensadhaka.com/spiritual-paths-explained"}],["$","meta","10",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","11",{"property":"og:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","12",{"property":"og:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}],["$","meta","13",{"property":"og:url","content":"https://opensadhaka.com"}],["$","meta","14",{"property":"og:site_name","content":"Sadhaka"}],["$","meta","15",{"property":"og:locale","content":"en_US"}],["$","meta","16",{"property":"og:type","content":"website"}],["$","meta","17",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","18",{"name":"twitter:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","19",{"name":"twitter:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}]]
1d:null
