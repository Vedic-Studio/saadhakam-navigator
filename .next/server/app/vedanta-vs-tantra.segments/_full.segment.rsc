1:"$Sreact.fragment"
2:I[79520,["/_next/static/chunks/e9f922839a1f4c35.js"],""]
9:I[68027,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
:HL["/_next/static/chunks/9999814cdcc3b5c7.css","style"]
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
          0:{"P":null,"b":"TiFSmxZ12onlCPNY3MpXZ","c":["","vedanta-vs-tantra"],"q":"","i":false,"f":[[["",{"children":["vedanta-vs-tantra",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/9999814cdcc3b5c7.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/e9f922839a1f4c35.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","$L2",null,{"src":"https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R","strategy":"afterInteractive"}],["$","$L2",null,{"id":"google-analytics","strategy":"afterInteractive","children":"\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            window.gtag = gtag;\n            gtag('js', new Date());\n\n            gtag('config', 'G-S3DHYPPG9R', {\n              send_page_view: false,\n            });\n          "}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"@id\":\"https://opensadhaka.com/#organization\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://opensadhaka.com/logo.png\",\"width\":600,\"height\":60},\"description\":\"Sadhaka is a comprehensive AI-powered spiritual encyclopedia and practitioner platform dedicated to 10,000 years of Sanatan Dharma wisdom, including Vedas, Upanishads, and Yoga philosophy.\",\"sameAs\":[\"https://twitter.com/opensadhaka\",\"https://instagram.com/opensadhaka\",\"https://youtube.com/@opensadhaka\",\"https://github.com/opensadhaka\",\"https://www.linkedin.com/company/opensadhaka\",\"https://www.crunchbase.com/organization/sadhaka\",\"https://en.wikipedia.org/wiki/Sanatan_Dharma\"],\"knowsAbout\":[\"Sanatan Dharma\",\"Bhagavad Gita\",\"Vedanta\",\"Yoga Sutras\",\"Sanskrit Philology\",\"Vedic Philosophy\",\"Meditation Techniques\"]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"https://opensadhaka.com/search?q={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}}"}}]]}],["$","body",null,{"children":[["$","$L2",null,{"id":"sadhaka-analytics-bridge","strategy":"afterInteractive","children":"$3"}],"$L4","$L5"]}]]}]]}],{"children":["$L6",{"children":["$L7",{},null,false,false]},null,false,false]},null,false,false],"$L8",false]],"m":"$undefined","G":["$9",[]],"S":true}
a:"$Sreact.suspense"
b:I[47534,["/_next/static/chunks/e9f922839a1f4c35.js"],"AnalyticsTracker"]
c:I[39756,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
d:I[37457,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
e:I[2971,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/7c92e96509cd355e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"Header"]
17:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"ViewportBoundary"]
19:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"MetadataBoundary"]
4:["$","$a",null,{"fallback":null,"children":["$","$Lb",null,{}]}]
5:["$","$Lc",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Ld",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]
6:["$","$1","c",{"children":[null,["$","$Lc",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Ld",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
7:["$","$1","c",{"children":[["$","div",null,{"className":"min-h-screen bg-background text-foreground","children":[["$","$Le",null,{}],["$","main",null,{"className":"pt-24 pb-20","children":[["$","section",null,{"className":"py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden","children":[["$","div",null,{"className":"absolute top-0 right-0 p-24 opacity-5 pointer-events-none","children":["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-flame w-96 h-96 text-primary","children":[["$","path","96xj49",{"d":"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}],"$undefined"]}]}],["$","div",null,{"className":"max-w-4xl mx-auto relative z-10 text-center","children":[["$","div",null,{"className":"inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-8","children":"Philosophical Deep-Dive"}],["$","h1",null,{"className":"font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight","children":["Vedanta ",["$","span",null,{"className":"text-muted-foreground font-light text-4xl md:text-5xl border-x px-4 mx-2","children":"vs"}]," Tantra"]}],["$","p",null,{"className":"text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light","children":"Do we transcend the world by looking away, or by diving in? One sees the world as a veil (Maya); the other sees it as a mother (Shakti)."}]]}]]}],["$","section",null,{"className":"px-4 sm:px-6 lg:px-8","children":["$","div",null,{"className":"max-w-4xl mx-auto","children":["$","div",null,{"className":"prose prose-invert prose-orange max-w-none space-y-12","children":[["$","div",null,{"className":"bg-muted/30 p-8 rounded-3xl border border-border/50","children":["$","p",null,{"className":"text-lg leading-relaxed italic","children":"\"Vedanta and Tantra are the two lungs of the Indian spiritual body. One inhales the Absolute; the other exhales the world as Divine Play. To understand them is to understand the fundamental choice every seeker makes: Escape or Transformation?\""}]}],["$","div",null,{"className":"grid md:grid-cols-2 gap-12 mt-16","children":[["$","div",null,{"className":"space-y-6","children":[["$","div",null,{"className":"w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center","children":["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-eye w-6 h-6 text-primary","children":[["$","path","1nclc0",{"d":"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["$","circle","1v7zrd",{"cx":"12","cy":"12","r":"3"}],"$undefined"]}]}],["$","h2",null,{"className":"text-3xl font-display font-bold","children":"Vedanta: The Path of Inquiry"}],["$","p",null,{"className":"text-muted-foreground leading-relaxed","children":["Classical Vedanta (especially Advaita) operates on the logic of ",["$","strong",null,{"children":"Nivritti"}]," — withdrawal. The world is ",["$","em",null,{"children":"Maya"}],", a superimposition on the truth. Like waking from a dream, the goal is to recognize the dreamer and realize the dream was never ultimately real."]}],["$","ul",null,{"className":"space-y-2 text-sm text-muted-foreground","children":[["$","li",null,{"className":"flex gap-2","children":[["$","span",null,{"children":"•"}]," Method: Neti-Neti (Not this, not that)"]}],["$","li",null,{"className":"flex gap-2","children":[["$","span",null,{"children":"•"}]," View: World is apparent/unreal"]}],["$","li",null,{"className":"flex gap-2","children":[["$","span",null,{"children":"•"}]," Goal: Pure Awareness (Brahman)"]}]]}]]}],"$Lf"]}],"$L10","$L11","$L12"]}]}]}]]}],"$L13"]}],["$L14","$L15"],"$L16"]}]
8:["$","$1","h",{"children":[null,["$","$L17",null,{"children":"$L18"}],["$","div",null,{"hidden":true,"children":["$","$L19",null,{"children":["$","$a",null,{"name":"Next.Metadata","children":"$L1a"}]}]}],null]}]
1b:I[13642,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/7c92e96509cd355e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"Footer"]
1c:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"OutletBoundary"]
f:["$","div",null,{"className":"space-y-6","children":[["$","div",null,{"className":"w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center","children":["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-flame w-6 h-6 text-orange-400","children":[["$","path","96xj49",{"d":"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}],"$undefined"]}]}],["$","h2",null,{"className":"text-3xl font-display font-bold","children":"Tantra: The Path of Alchemy"}],["$","p",null,{"className":"text-muted-foreground leading-relaxed","children":["Tantra operates on the logic of ",["$","strong",null,{"children":"Pravritti"}]," — engagement. The world is not an illusion to be discarded, but ",["$","em",null,{"children":"Shakti"}]," (Divine Power) to be harnessed. Every desire, every emotion, and every sensation is a doorway to the Absolute."]}],["$","ul",null,{"className":"space-y-2 text-sm text-muted-foreground","children":[["$","li",null,{"className":"flex gap-2","children":[["$","span",null,{"children":"•"}]," Method: Transformation of energy"]}],["$","li",null,{"className":"flex gap-2","children":[["$","span",null,{"children":"•"}]," View: World is Divine expression"]}],["$","li",null,{"className":"flex gap-2","children":[["$","span",null,{"children":"•"}]," Goal: Union of Shiva & Shakti"]}]]}]]}]
10:["$","div",null,{"className":"my-20","children":[["$","h2",null,{"className":"text-4xl font-display font-bold text-center mb-12","children":"Comparative Framework"}],["$","div",null,{"className":"grid md:grid-cols-2 lg:grid-cols-3 gap-6","children":[["$","div",null,{"className":"p-6 rounded-2xl border border-white/5 bg-white/[0.02]","children":[["$","h3",null,{"className":"font-bold text-primary mb-2","children":"Attitude to the Body"}],["$","p",null,{"className":"text-sm text-muted-foreground","children":[["$","strong",null,{"children":"Vedanta:"}]," An instrument to be transcended; eventually a burden. ",["$","br",null,{}],["$","strong",null,{"children":"Tantra:"}]," A temple; the microcosm of the universe."]}]]}],["$","div",null,{"className":"p-6 rounded-2xl border border-white/5 bg-white/[0.02]","children":[["$","h3",null,{"className":"font-bold text-primary mb-2","children":"Role of Desire"}],["$","p",null,{"className":"text-sm text-muted-foreground","children":[["$","strong",null,{"children":"Vedanta:"}]," An obstacle to be overcome (Vairagya). ",["$","br",null,{}],["$","strong",null,{"children":"Tantra:"}]," Fuel to be refined into spiritual fire."]}]]}],["$","div",null,{"className":"p-6 rounded-2xl border border-white/5 bg-white/[0.02]","children":[["$","h3",null,{"className":"font-bold text-primary mb-2","children":"Practice Focus"}],["$","p",null,{"className":"text-sm text-muted-foreground","children":[["$","strong",null,{"children":"Vedanta:"}]," Stillness, reading, and mental inquiry. ",["$","br",null,{}],["$","strong",null,{"children":"Tantra:"}]," Ritual, mantra, visualization, and energy work (Kriya)."]}]]}]]}]]}]
11:["$","div",null,{"className":"bg-primary/5 rounded-[2.5rem] p-12 border border-primary/20","children":[["$","h2",null,{"className":"text-3xl font-display font-bold mb-6","children":"The Synthesis"}],["$","p",null,{"className":"text-lg text-muted-foreground leading-relaxed mb-6","children":"Modern seekers often find that they need both. Without Vedanta's clarity, Tantra can become a chase for \"experiences\" and powers (Siddhis). Without Tantra's vitality, Vedanta can become dry, intellectual, and disconnected from the body."}],["$","div",null,{"className":"flex flex-wrap gap-4","children":[["$","div",null,{"className":"px-4 py-2 bg-background border border-border/50 rounded-xl text-sm font-medium","children":"Kashmir Shaivism"}],["$","div",null,{"className":"px-4 py-2 bg-background border border-border/50 rounded-xl text-sm font-medium","children":"Integral Yoga"}],["$","div",null,{"className":"px-4 py-2 bg-background border border-border/50 rounded-xl text-sm font-medium","children":"Shakta Advaita"}]]}]]}]
12:["$","div",null,{"className":"mt-20 text-center","children":[["$","h2",null,{"className":"text-3xl font-display font-bold mb-6","children":"Which Path Is Yours?"}],["$","p",null,{"className":"text-xl text-muted-foreground max-w-xl mx-auto mb-10","children":"Your temperament (Guna) and current life stage (Ashrama) determine whether the path of withdrawal or the path of engagement will bear fruit for you."}],["$","a",null,{"href":"/faith-finder","children":["$","button",null,{"className":"bg-orange-500 text-white font-bold px-10 h-16 rounded-2xl hover:scale-105 transition-transform flex items-center mx-auto shadow-xl shadow-orange-500/20","children":["Discovery Your Path ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-5 h-5","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]}]]}]
13:["$","$L1b",null,{}]
14:["$","script","script-0",{"src":"/_next/static/chunks/7c92e96509cd355e.js","async":true,"nonce":"$undefined"}]
15:["$","script","script-1",{"src":"/_next/static/chunks/79bc64d3981b5c5f.js","async":true,"nonce":"$undefined"}]
16:["$","$L1c",null,{"children":["$","$a",null,{"name":"Next.MetadataOutlet","children":"$@1d"}]}]
18:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
1a:[["$","title","0",{"children":"Vedanta vs Tantra: Escape vs Transformation | Sadhaka | Sadhaka"}],["$","meta","1",{"name":"description","content":"Understand the two major frameworks of Indian spiritual practice. Is the world an illusion to be transcended (Vedanta) or a power to be harnessed (Tantra)?"}],["$","link","2",{"rel":"author","href":"https://opensadhaka.com"}],["$","meta","3",{"name":"author","content":"Sadhaka"}],["$","meta","4",{"name":"keywords","content":"vedanta vs tantra,advaita,tantra,shakti,brahman,spiritual path"}],["$","meta","5",{"name":"creator","content":"Sadhaka"}],["$","meta","6",{"name":"publisher","content":"Sadhaka"}],["$","meta","7",{"name":"robots","content":"index, follow"}],["$","meta","8",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","link","9",{"rel":"canonical","href":"https://opensadhaka.com/vedanta-vs-tantra"}],["$","meta","10",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","11",{"property":"og:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","12",{"property":"og:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}],["$","meta","13",{"property":"og:url","content":"https://opensadhaka.com"}],["$","meta","14",{"property":"og:site_name","content":"Sadhaka"}],["$","meta","15",{"property":"og:locale","content":"en_US"}],["$","meta","16",{"property":"og:type","content":"website"}],["$","meta","17",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","18",{"name":"twitter:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","19",{"name":"twitter:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}]]
1d:null
