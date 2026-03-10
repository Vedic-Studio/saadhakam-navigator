1:"$Sreact.fragment"
2:I[80238,["/_next/static/chunks/189eb4c7e7ae4832.js"],""]
9:I[35380,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
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
          0:{"P":null,"b":"-VF3SH3uJ7xX4RWaxHTWy","c":["","advaita-vs-dvaita"],"q":"","i":false,"f":[[["",{"children":["advaita-vs-dvaita",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/82ea0c79ec3f2bd8.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/189eb4c7e7ae4832.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"@id\":\"https://opensadhaka.com/#organization\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://opensadhaka.com/logo.png\",\"width\":600,\"height\":60},\"description\":\"Sadhaka is a comprehensive AI-powered spiritual encyclopedia and practitioner platform dedicated to 10,000 years of Sanatan Dharma wisdom, including Vedas, Upanishads, and Yoga philosophy.\",\"sameAs\":[\"https://twitter.com/opensadhaka\",\"https://instagram.com/opensadhaka\",\"https://youtube.com/@opensadhaka\",\"https://github.com/opensadhaka\",\"https://www.linkedin.com/company/opensadhaka\",\"https://www.crunchbase.com/organization/sadhaka\",\"https://en.wikipedia.org/wiki/Sanatan_Dharma\"],\"knowsAbout\":[\"Sanatan Dharma\",\"Bhagavad Gita\",\"Vedanta\",\"Yoga Sutras\",\"Sanskrit Philology\",\"Vedic Philosophy\",\"Meditation Techniques\"]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"https://opensadhaka.com/search?q={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}}"}}]]}],["$","body",null,{"children":[["$","$L2",null,{"src":"https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R","strategy":"afterInteractive"}],["$","$L2",null,{"id":"google-analytics","strategy":"afterInteractive","dangerouslySetInnerHTML":{"__html":"\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);}\n              window.gtag = gtag;\n              gtag('js', new Date());\n\n              gtag('config', 'G-S3DHYPPG9R', {\n                send_page_view: false,\n              });\n            "}}],["$","$L2",null,{"id":"sadhaka-analytics-bridge","strategy":"afterInteractive","dangerouslySetInnerHTML":{"__html":"$3"}}],"$L4","$L5"]}]]}]]}],{"children":["$L6",{"children":["$L7",{},null,false,false]},null,false,false]},null,false,false],"$L8",false]],"m":"$undefined","G":["$9",[]],"S":true}
a:"$Sreact.suspense"
b:I[2903,["/_next/static/chunks/189eb4c7e7ae4832.js"],"AnalyticsTracker"]
c:I[13055,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
d:I[30732,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
e:I[71067,["/_next/static/chunks/189eb4c7e7ae4832.js","/_next/static/chunks/087b1d481975c188.js","/_next/static/chunks/cde3ae7fe003833a.js"],"Header"]
17:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"ViewportBoundary"]
19:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"MetadataBoundary"]
4:["$","$a",null,{"fallback":null,"children":["$","$Lb",null,{}]}]
5:["$","$Lc",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Ld",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]
6:["$","$1","c",{"children":[null,["$","$Lc",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Ld",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
7:["$","$1","c",{"children":[["$","div",null,{"className":"min-h-screen bg-background","children":[["$","$Le",null,{}],["$","main",null,{"className":"pt-24 pb-20","children":[["$","section",null,{"className":"py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden","children":["$","div",null,{"className":"max-w-4xl mx-auto relative z-10 text-center","children":[["$","div",null,{"className":"inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-8","children":"The Great Debate"}],["$","h1",null,{"className":"font-display text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight","children":["Advaita ",["$","span",null,{"className":"text-muted-foreground font-light text-4xl md:text-5xl border-x px-4 mx-2","children":"vs"}]," Dvaita"]}],["$","p",null,{"className":"text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light","children":"One reality or two? The question that divided India's greatest minds for a millennium stems from how we experience the relationship between the Soul and the Divine."}]]}]}],["$","section",null,{"className":"px-4 sm:px-6 lg:px-8","children":["$","div",null,{"className":"max-w-4xl mx-auto","children":["$","div",null,{"className":"prose prose-invert prose-orange max-w-none space-y-8","children":[["$","div",null,{"className":"bg-muted/30 p-8 rounded-3xl border border-border/50 mb-12","children":["$","p",null,{"className":"text-lg leading-relaxed first-letter:text-5xl first-letter:font-display first-letter:mr-3 first-letter:float-left first-letter:text-primary","children":["At some point in your spiritual life, you encounter the question that has divided India's greatest minds for over a thousand years:",["$","em",null,{"children":"Is the universe One, or Two?"}]," Is your innermost Self the same as God, or forever distinct from God? Your answer changes everything — your practice, your prayer, your understanding of suffering, and your vision of liberation."]}]}],["$","div",null,{"className":"grid md:grid-cols-2 gap-8 my-16","children":[["$","div",null,{"className":"space-y-6","children":[["$","div",null,{"className":"h-1 w-20 bg-primary"}],["$","h2",null,{"className":"text-3xl font-display font-bold","children":"Advaita: Non-Duality"}],["$","p",null,{"className":"text-muted-foreground","children":["Systematized by ",["$","strong",null,{"children":"Adi Shankaracharya"}]," (8th century). Advaita means \"not-two.\" It asserts that Brahman (Infinite Consciousness) is the only ultimate reality."]}],["$","blockquote",null,{"className":"border-l-4 border-primary/30 pl-6 italic","children":"\"Brahma satyam jagan mithya... Brahman is real, the world is an appearance.\""}]]}],["$","div",null,{"className":"space-y-6","children":[["$","div",null,{"className":"h-1 w-20 bg-orange-500"}],["$","h2",null,{"className":"text-3xl font-display font-bold","children":"Dvaita: Dualism"}],["$","p",null,{"className":"text-muted-foreground","children":["Pioneered by ",["$","strong",null,{"children":"Madhvacharya"}]," (13th century). Dvaita asserts that God, souls, and matter are eternally distinct and real."]}],["$","blockquote",null,{"className":"border-l-4 border-orange-500/30 pl-6 italic","children":"\"Two shall never become One. The soul is a servant; God is the Master.\""}]]}]]}],["$","h2",null,{"className":"text-4xl font-display font-bold text-center mt-20 mb-12","children":"Comparison Matrix"}],["$","div",null,{"className":"overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]","children":["$","table",null,{"className":"w-full text-left border-collapse","children":[["$","thead",null,{"children":["$","tr",null,{"className":"bg-white/5","children":[["$","th",null,{"className":"p-6 font-display text-lg","children":"Aspect"}],["$","th",null,{"className":"p-6 font-display text-lg text-primary","children":"Advaita (Shankara)"}],"$Lf"]}]}],"$L10"]}]}],"$L11","$L12"]}]}]}]]}],"$L13"]}],["$L14","$L15"],"$L16"]}]
8:["$","$1","h",{"children":[null,["$","$L17",null,{"children":"$L18"}],["$","div",null,{"hidden":true,"children":["$","$L19",null,{"children":["$","$a",null,{"name":"Next.Metadata","children":"$L1a"}]}]}],null]}]
1b:I[82899,["/_next/static/chunks/189eb4c7e7ae4832.js","/_next/static/chunks/087b1d481975c188.js","/_next/static/chunks/cde3ae7fe003833a.js"],"Footer"]
1c:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"OutletBoundary"]
f:["$","th",null,{"className":"p-6 font-display text-lg text-orange-400","children":"Dvaita (Madhva)"}]
10:["$","tbody",null,{"className":"divide-y divide-white/5 text-muted-foreground","children":[["$","tr",null,{"children":[["$","td",null,{"className":"p-6 font-bold text-foreground","children":"Ultimate Reality"}],["$","td",null,{"className":"p-6","children":"Only Brahman is ultimately real"}],["$","td",null,{"className":"p-6","children":"God, souls, and matter are all real"}]]}],["$","tr",null,{"children":[["$","td",null,{"className":"p-6 font-bold text-foreground","children":"Nature of God"}],["$","td",null,{"className":"p-6","children":"Attribute-less Absolute (Nirguna)"}],["$","td",null,{"className":"p-6","children":"Personal God with infinite qualities (Saguna)"}]]}],["$","tr",null,{"children":[["$","td",null,{"className":"p-6 font-bold text-foreground","children":"The Soul"}],["$","td",null,{"className":"p-6","children":"Identical to Brahman"}],["$","td",null,{"className":"p-6","children":"Eternally distinct & dependent"}]]}],["$","tr",null,{"children":[["$","td",null,{"className":"p-6 font-bold text-foreground","children":"Liberation"}],["$","td",null,{"className":"p-6","children":"Recognition of non-separation"}],["$","td",null,{"className":"p-6","children":"Eternal devotion in God's presence"}]]}],["$","tr",null,{"children":[["$","td",null,{"className":"p-6 font-bold text-foreground","children":"Primary Path"}],["$","td",null,{"className":"p-6","children":"Jnana (Self-inquiry)"}],["$","td",null,{"className":"p-6","children":"Bhakti (Surrendered devotion)"}]]}]]}]
11:["$","div",null,{"className":"mt-20","children":[["$","h2",null,{"className":"text-3xl font-display font-bold mb-8","children":"Which fits your nature?"}],["$","div",null,{"className":"grid md:grid-cols-2 gap-6","children":[["$","div",null,{"ref":"$undefined","className":"border text-card-foreground shadow-sm bg-primary/5 border-primary/20 p-8 rounded-[2rem]","children":[["$","h3",null,{"className":"text-xl font-bold mb-4 flex items-center gap-2","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-sparkles w-5 h-5 text-primary","children":[["$","path","4pj2yx",{"d":"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}],["$","path","1olli1",{"d":"M20 3v4"}],["$","path","1gvqau",{"d":"M22 5h-4"}],["$","path","vumght",{"d":"M4 17v2"}],["$","path","zchphs",{"d":"M5 18H3"}],"$undefined"]}],"Choose Advaita if..."]}],["$","p",null,{"className":"text-sm leading-relaxed text-muted-foreground","children":"You find that the deepest experience of meditation dissolves the sense of a separate self — if \"I\" and \"the universe\" collapse into pure, undivided awareness."}]]}],["$","div",null,{"ref":"$undefined","className":"border text-card-foreground shadow-sm bg-orange-500/5 border-orange-500/20 p-8 rounded-[2rem]","children":[["$","h3",null,{"className":"text-xl font-bold mb-4 flex items-center gap-2","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-quote w-5 h-5 text-orange-400","children":[["$","path","rib7q0",{"d":"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["$","path","1ymkrd",{"d":"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],"$undefined"]}],"Choose Dvaita if..."]}],["$","p",null,{"className":"text-sm leading-relaxed text-muted-foreground","children":"Your deepest longing is love — if you want to adore God, serve God, and be in God's presence while remaining a distinct soul who can experience that love."}]]}]]}]]}]
12:["$","div",null,{"className":"mt-20 bg-muted/20 rounded-3xl p-12 text-center border border-white/5","children":[["$","h2",null,{"className":"text-3xl font-display font-bold mb-6","children":"Explore Your Path"}],["$","p",null,{"className":"text-xl text-muted-foreground max-w-xl mx-auto mb-10","children":"Take the Faith Finder assessment to see which philosophical school aligns with your psychological temperament."}],["$","a",null,{"href":"/faith-finder","children":["$","button",null,{"className":"bg-primary text-primary-foreground font-bold px-10 h-16 rounded-2xl hover:scale-105 transition-transform flex items-center mx-auto","children":["Start Faith Finder ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-5 h-5","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]}]]}]
13:["$","$L1b",null,{}]
14:["$","script","script-0",{"src":"/_next/static/chunks/087b1d481975c188.js","async":true,"nonce":"$undefined"}]
15:["$","script","script-1",{"src":"/_next/static/chunks/cde3ae7fe003833a.js","async":true,"nonce":"$undefined"}]
16:["$","$L1c",null,{"children":["$","$a",null,{"name":"Next.MetadataOutlet","children":"$@1d"}]}]
18:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
1a:[["$","title","0",{"children":"Advaita vs Dvaita Vedanta: The Core Debate of Non-Duality | Sadhaka | Sadhaka"}],["$","meta","1",{"name":"description","content":"Explore the profound differences between Advaita (Non-Duality) and Dvaita (Dualism). Understand Shankaracharya vs Madhvacharya and which path fits your temperament."}],["$","link","2",{"rel":"author","href":"https://opensadhaka.com"}],["$","meta","3",{"name":"author","content":"Sadhaka"}],["$","meta","4",{"name":"keywords","content":"advaita vs dvaita,vedanta,non-duality,dualism,shankaracharya,madhvacharya"}],["$","meta","5",{"name":"creator","content":"Sadhaka"}],["$","meta","6",{"name":"publisher","content":"Sadhaka"}],["$","meta","7",{"name":"robots","content":"index, follow"}],["$","meta","8",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","link","9",{"rel":"canonical","href":"https://opensadhaka.com/advaita-vs-dvaita"}],["$","meta","10",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","11",{"property":"og:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","12",{"property":"og:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}],["$","meta","13",{"property":"og:url","content":"https://opensadhaka.com"}],["$","meta","14",{"property":"og:site_name","content":"Sadhaka"}],["$","meta","15",{"property":"og:locale","content":"en_US"}],["$","meta","16",{"property":"og:type","content":"website"}],["$","meta","17",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","18",{"name":"twitter:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","19",{"name":"twitter:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}]]
1d:null
