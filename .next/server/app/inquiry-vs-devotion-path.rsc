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
          0:{"P":null,"b":"_o68RnNKFZ9crBgxt0s-t","c":["","inquiry-vs-devotion-path"],"q":"","i":false,"f":[[["",{"children":["inquiry-vs-devotion-path",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/9999814cdcc3b5c7.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/e9f922839a1f4c35.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","$L2",null,{"src":"https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R","strategy":"afterInteractive"}],["$","$L2",null,{"id":"google-analytics","strategy":"afterInteractive","children":"\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            window.gtag = gtag;\n            gtag('js', new Date());\n\n            gtag('config', 'G-S3DHYPPG9R', {\n              send_page_view: false,\n            });\n          "}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"@id\":\"https://opensadhaka.com/#organization\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://opensadhaka.com/logo.png\",\"width\":600,\"height\":60},\"description\":\"Sadhaka is a comprehensive AI-powered spiritual encyclopedia and practitioner platform dedicated to 10,000 years of Sanatan Dharma wisdom, including Vedas, Upanishads, and Yoga philosophy.\",\"sameAs\":[\"https://twitter.com/opensadhaka\",\"https://instagram.com/opensadhaka\",\"https://youtube.com/@opensadhaka\",\"https://github.com/opensadhaka\",\"https://www.linkedin.com/company/opensadhaka\",\"https://www.crunchbase.com/organization/sadhaka\",\"https://en.wikipedia.org/wiki/Sanatan_Dharma\"],\"knowsAbout\":[\"Sanatan Dharma\",\"Bhagavad Gita\",\"Vedanta\",\"Yoga Sutras\",\"Sanskrit Philology\",\"Vedic Philosophy\",\"Meditation Techniques\"]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"https://opensadhaka.com/search?q={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}}"}}]]}],["$","body",null,{"children":[["$","$L2",null,{"id":"sadhaka-analytics-bridge","strategy":"afterInteractive","children":"$3"}],"$L4","$L5"]}]]}]]}],{"children":["$L6",{"children":["$L7",{},null,false,false]},null,false,false]},null,false,false],"$L8",false]],"m":"$undefined","G":["$9",[]],"S":true}
a:"$Sreact.suspense"
b:I[47534,["/_next/static/chunks/e9f922839a1f4c35.js"],"AnalyticsTracker"]
c:I[39756,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
d:I[37457,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
e:I[90771,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/954ac37ed5870e5e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"ContentPageTracker"]
f:I[2971,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/954ac37ed5870e5e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"Header"]
19:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"ViewportBoundary"]
1b:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"MetadataBoundary"]
4:["$","$a",null,{"fallback":null,"children":["$","$Lb",null,{}]}]
5:["$","$Lc",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Ld",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]
6:["$","$1","c",{"children":[null,["$","$Lc",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Ld",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
7:["$","$1","c",{"children":[["$","div",null,{"className":"min-h-screen bg-background text-foreground flex flex-col","children":[["$","$Le",null,{"slug":"inquiry-vs-devotion-path","pillar":"seo-chooser"}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"What is the Inquiry path in spirituality?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"The Inquiry path is centered on self-knowledge through contemplation and direct investigation of consciousness. It is strongly associated with Jnana Yoga and Vedanta.\"}},{\"@type\":\"Question\",\"name\":\"What is the Devotion path in spirituality?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"The Devotion path is centered on love, surrender, and relationship with the Divine through prayer, mantra, and bhakti practices.\"}},{\"@type\":\"Question\",\"name\":\"Can I combine Inquiry and Devotion?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Many practitioners begin with one dominant path and then integrate the other. Inquiry gives clarity; devotion gives emotional depth and surrender.\"}}]}"}}],["$","$Lf",null,{}],["$","main",null,{"className":"flex-grow pt-28 pb-16","children":["$","div",null,{"className":"container-padding max-w-5xl mx-auto","children":[["$","header",null,{"className":"text-center mb-16","children":[["$","h1",null,{"className":"font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight","children":["Inquiry vs ",["$","span",null,{"className":"text-orange-500","children":"Devotion"}]]}],["$","p",null,{"className":"text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed","children":"Two of the most powerful entry points in Sanatan Dharma. One starts with radical clarity of mind; the other with total openness of heart. Understanding which one fits your current temperament is the first real step on the path."}]]}],["$","div",null,{"className":"grid md:grid-cols-2 gap-8 mb-16","children":[["$","article",null,{"className":"rounded-2xl border border-border/60 bg-card p-10 flex flex-col h-full","children":[["$","div",null,{"className":"flex items-center gap-3 mb-6","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-brain w-10 h-10 text-orange-500","children":[["$","path","l5xja",{"d":"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["$","path","ep3f8r",{"d":"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"}],["$","path","1p4c4q",{"d":"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"}],["$","path","tmeiqw",{"d":"M17.599 6.5a3 3 0 0 0 .399-1.375"}],["$","path","105sqy",{"d":"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["$","path","ql3yin",{"d":"M3.477 10.896a4 4 0 0 1 .585-.396"}],["$","path","1qfode",{"d":"M19.938 10.5a4 4 0 0 1 .585.396"}],["$","path","2e4loj",{"d":"M6 18a4 4 0 0 1-1.967-.516"}],["$","path","159ez6",{"d":"M19.967 17.484A4 4 0 0 1 18 18"}],"$undefined"]}],["$","h2",null,{"className":"text-3xl font-display font-bold","children":"Path of Inquiry"}]]}],["$","div",null,{"className":"space-y-4 mb-8 flex-grow","children":[["$","p",null,{"className":"text-lg leading-relaxed text-foreground","children":["The Path of Inquiry (Jnana Yoga) is built on the foundation of ",["$","strong",null,{"children":"Viveka"}],"—the sharp discrimination between the eternal and the transient. It is the architect's path to truth."]}],["$","p",null,{"className":"text-muted-foreground leading-relaxed","children":"Best for analytical seekers who naturally ask \"Who am I?\" and refuse to accept answers on faith alone. This path prioritizes direct investigation into the nature of consciousness through self-inquiry (Atma-Vichara), study of foundational texts like the Brahma Sutras, and the cultivation of deep, contemplative silence."}]]}],"$L10","$L11"]}],"$L12"]}],"$L13","$L14"]}]}],"$L15"]}],["$L16","$L17"],"$L18"]}]
8:["$","$1","h",{"children":[null,["$","$L19",null,{"children":"$L1a"}],["$","div",null,{"hidden":true,"children":["$","$L1b",null,{"children":["$","$a",null,{"name":"Next.Metadata","children":"$L1c"}]}]}],null]}]
1d:I[90771,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/954ac37ed5870e5e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"TrackedLink"]
1e:I[13642,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/954ac37ed5870e5e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"Footer"]
1f:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"OutletBoundary"]
10:["$","ul",null,{"className":"space-y-3 text-sm text-muted-foreground mb-8 bg-muted/30 p-6 rounded-xl border border-border/40","children":[["$","li",null,{"className":"flex gap-2","children":[["$","strong",null,{"children":"Strength:"}]," ",["$","span",null,{"children":"Intellectual clarity and rapid deconstruction of ego-illusions."}]]}],["$","li",null,{"className":"flex gap-2","children":[["$","strong",null,{"children":"Practice:"}]," ",["$","span",null,{"children":"Self-inquiry, Upanishadic study, and meditation on the Void."}]]}],["$","li",null,{"className":"flex gap-2","children":[["$","strong",null,{"children":"Pitfall:"}]," ",["$","span",null,{"children":"\"Dry intellect\"—becoming a scholar of the path without walking it."}]]}]]}]
11:["$","$L1d",null,{"href":"/what-is-vedanta","eventLabel":"inquiry_vs_devotion:inquiry:/what-is-vedanta","trackPathName":"inquiry","className":"mt-auto inline-flex items-center text-orange-400 font-bold hover:text-orange-300 transition-colors","children":["Master the Path of Inquiry ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-5 h-5","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]
12:["$","article",null,{"className":"rounded-2xl border border-border/60 bg-card p-10 flex flex-col h-full","children":[["$","div",null,{"className":"flex items-center gap-3 mb-6","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-heart w-10 h-10 text-orange-500","children":[["$","path","c3ymky",{"d":"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],"$undefined"]}],["$","h2",null,{"className":"text-3xl font-display font-bold","children":"Path of Devotion"}]]}],["$","div",null,{"className":"space-y-4 mb-8 flex-grow","children":[["$","p",null,{"className":"text-lg leading-relaxed text-foreground","children":["The Path of Devotion (Bhakti Yoga) is the art of ",["$","strong",null,{"children":"Prapatti"}],"—total surrender. It transforms human emotion into a direct vehicle for transcendence."]}],["$","p",null,{"className":"text-muted-foreground leading-relaxed","children":"Best for relational seekers who feel a natural pull toward a personal relationship with the Divine. It is the most accessible path for the modern era, focusing on the heart's yearning rather than intellectual gymnastics. Primary practices include Japa (mantra repetition), Kirtan (devotional song), and the study of the Srimad Bhagavatam."}]]}],["$","ul",null,{"className":"space-y-3 text-sm text-muted-foreground mb-8 bg-muted/30 p-6 rounded-xl border border-border/40","children":[["$","li",null,{"className":"flex gap-2","children":[["$","strong",null,{"children":"Strength:"}]," ",["$","span",null,{"children":"Emotional depth and the ability to find the Divine in all relations."}]]}],["$","li",null,{"className":"flex gap-2","children":[["$","strong",null,{"children":"Practice:"}]," ",["$","span",null,{"children":"Mantra, ritual worship (Puja), and selfless service (Seva)."}]]}],["$","li",null,{"className":"flex gap-2","children":[["$","strong",null,{"children":"Pitfall:"}]," ",["$","span",null,{"children":"Emotional volatility—getting lost in the highs and lows of feeling."}]]}]]}],["$","$L1d",null,{"href":"/shaivism-vs-vaishnavism","eventLabel":"inquiry_vs_devotion:devotion:/shaivism-vs-vaishnavism","trackPathName":"devotion","className":"mt-auto inline-flex items-center text-orange-400 font-bold hover:text-orange-300 transition-colors","children":["Master the Path of Devotion ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-5 h-5","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}]
13:["$","section",null,{"className":"mb-16 prose prose-invert max-w-none border-t border-border/40 pt-16","children":["$","div",null,{"className":"max-w-3xl mx-auto","children":[["$","h2",null,{"className":"font-display text-4xl font-bold mb-8 text-center","children":"The Tension: Head vs Heart"}],["$","p",null,{"className":"text-xl leading-relaxed mb-6","children":"Modern seekers often feel they must choose: be a cold intellectual or a blind believer. Sanatan Dharma rejects this false dichotomy. While one path may dominate your current temperament, they are ultimately two wings of the same bird."}],["$","p",null,{"className":"text-lg text-muted-foreground leading-relaxed mb-8","children":"Inquiry without devotion leads to intellectual arrogance—a map-reader who never visits the ocean. Devotion without inquiry leads to sentimentalism—a lover who doesn't know who they are loving. True spiritual maturity is the \"Inquiry of the Heart\" and the \"Devotion of the Intellect.\""}]]}]}]
14:["$","section",null,{"className":"rounded-3xl border border-orange-900/40 bg-gradient-to-br from-orange-950/20 to-background p-12 text-center shadow-2xl overflow-hidden relative","children":[["$","div",null,{"className":"relative z-10","children":[["$","h2",null,{"className":"text-4xl font-display font-bold mb-4","children":"Unsure where to begin?"}],["$","p",null,{"className":"text-xl text-muted-foreground max-w-2xl mx-auto mb-8","children":["Our ",["$","strong",null,{"children":"Faith Finder"}]," assessment is designed to map your unique psychological profile to the most effective spiritual traditions and practices. Don't guess. Discover what was built for your nature."]}],["$","$L1d",null,{"href":"/faith-finder","eventLabel":"inquiry_vs_devotion:cta:faith-finder","trackPathName":"seo-chooser","className":"inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-8 py-4 text-white font-bold text-lg shadow-lg hover:shadow-orange-500/20 transition-all active:scale-95","children":["Take the Faith Finder ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-5 h-5","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}],["$","div",null,{"className":"absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"}],["$","div",null,{"className":"absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"}]]}]
15:["$","$L1e",null,{}]
16:["$","script","script-0",{"src":"/_next/static/chunks/954ac37ed5870e5e.js","async":true,"nonce":"$undefined"}]
17:["$","script","script-1",{"src":"/_next/static/chunks/79bc64d3981b5c5f.js","async":true,"nonce":"$undefined"}]
18:["$","$L1f",null,{"children":["$","$a",null,{"name":"Next.MetadataOutlet","children":"$@20"}]}]
1a:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
1c:[["$","title","0",{"children":"Inquiry vs Devotion Path: Which One Fits You? | Sadhaka | Sadhaka"}],["$","meta","1",{"name":"description","content":"Compare the Inquiry and Devotion spiritual paths in Sanatan Dharma. Learn how each works and choose the right starting point for your temperament."}],["$","link","2",{"rel":"author","href":"https://opensadhaka.com"}],["$","meta","3",{"name":"author","content":"Sadhaka"}],["$","meta","4",{"name":"keywords","content":"sanatan dharma,bhagavad gita,vedas,upanishads,yoga philosophy,sanskrit,spiritual guidance,vedanta,sadhana,meditation,spiritual practices"}],["$","meta","5",{"name":"creator","content":"Sadhaka"}],["$","meta","6",{"name":"publisher","content":"Sadhaka"}],["$","meta","7",{"name":"robots","content":"index, follow"}],["$","meta","8",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","link","9",{"rel":"canonical","href":"https://opensadhaka.com/inquiry-vs-devotion-path"}],["$","meta","10",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","11",{"property":"og:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","12",{"property":"og:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}],["$","meta","13",{"property":"og:url","content":"https://opensadhaka.com"}],["$","meta","14",{"property":"og:site_name","content":"Sadhaka"}],["$","meta","15",{"property":"og:locale","content":"en_US"}],["$","meta","16",{"property":"og:type","content":"website"}],["$","meta","17",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","18",{"name":"twitter:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","19",{"name":"twitter:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}]]
20:null
