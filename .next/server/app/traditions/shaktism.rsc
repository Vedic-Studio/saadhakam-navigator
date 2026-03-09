1:"$Sreact.fragment"
2:I[79520,["/_next/static/chunks/e9f922839a1f4c35.js"],""]
a:I[68027,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
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
          0:{"P":null,"b":"woRPFmW9gbreHptCB1uqj","c":["","traditions","shaktism"],"q":"","i":false,"f":[[["",{"children":["traditions",{"children":[["slug","shaktism","d"],{"children":["__PAGE__",{}]}]}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/c6fc1b3793e78dc0.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/e9f922839a1f4c35.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","script",null,{"async":true,"src":"https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R"}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);}\n              window.gtag = window.gtag || gtag;\n              gtag('js', new Date());\n\n              gtag('config', 'G-S3DHYPPG9R', { send_page_view: false });\n            "}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Your AI-powered companion for exploring Sanatan Dharma, Bhagavad Gita, Vedas, and ancient spiritual wisdom.\",\"sameAs\":[\"https://twitter.com/opensadhaka\",\"https://instagram.com/opensadhaka\",\"https://youtube.com/@opensadhaka\"]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"https://opensadhaka.com/search?q={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}}"}}]]}],["$","body",null,{"children":[["$","$L2",null,{"id":"sadhaka-analytics-bridge","strategy":"afterInteractive","children":"$3"}],"$L4","$L5"]}]]}]]}],{"children":["$L6",{"children":["$L7",{"children":["$L8",{},null,false,false]},null,false,false]},null,false,false]},null,false,false],"$L9",false]],"m":"$undefined","G":["$a",[]],"S":true}
b:"$Sreact.suspense"
c:I[47534,["/_next/static/chunks/e9f922839a1f4c35.js"],"AnalyticsTracker"]
d:I[39756,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
e:I[37457,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"default"]
10:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"OutletBoundary"]
12:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"ViewportBoundary"]
14:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/61cc43b3d7ad2990.js"],"MetadataBoundary"]
4:["$","$b",null,{"fallback":null,"children":["$","$Lc",null,{}]}]
5:["$","$Ld",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Le",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]
6:["$","$1","c",{"children":[null,["$","$Ld",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Le",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
7:["$","$1","c",{"children":[null,["$","$Ld",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Le",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
8:["$","$1","c",{"children":["$Lf",[["$","script","script-0",{"src":"/_next/static/chunks/7c92e96509cd355e.js","async":true,"nonce":"$undefined"}],["$","script","script-1",{"src":"/_next/static/chunks/79bc64d3981b5c5f.js","async":true,"nonce":"$undefined"}]],["$","$L10",null,{"children":["$","$b",null,{"name":"Next.MetadataOutlet","children":"$@11"}]}]]}]
9:["$","$1","h",{"children":[null,["$","$L12",null,{"children":"$L13"}],["$","div",null,{"hidden":true,"children":["$","$L14",null,{"children":["$","$b",null,{"name":"Next.Metadata","children":"$L15"}]}]}],null]}]
16:I[2971,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/7c92e96509cd355e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"Header"]
17:I[22016,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/7c92e96509cd355e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],""]
f:["$","div",null,{"className":"min-h-screen bg-background","children":[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://opensadhaka.com\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Traditions\",\"item\":\"https://opensadhaka.com/traditions\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Shaktism\",\"item\":\"https://opensadhaka.com/traditions/shaktism\"}]}"}}],["$","$L16",null,{}],["$","main",null,{"className":"pt-20","children":[["$","section",null,{"className":"py-16 px-4 sm:px-6 lg:px-8","children":["$","div",null,{"className":"max-w-4xl mx-auto","children":[["$","nav",null,{"aria-label":"Breadcrumb","className":"mb-6","children":["$","$L17",null,{"href":"/traditions","className":"inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-left w-4 h-4","children":[["$","path","1l729n",{"d":"m12 19-7-7 7-7"}],["$","path","x3x0zl",{"d":"M19 12H5"}],"$undefined"]}],"Back to Traditions"]}]}],["$","h1",null,{"className":"font-display text-4xl md:text-5xl font-bold text-foreground mb-4","children":"Shaktism"}],["$","p",null,{"className":"text-xl text-muted-foreground mb-6","children":"Worship of the Divine Feminine as the supreme creative power of the universe."}],["$","div",null,{"className":"flex flex-wrap gap-2","children":[["$","span","devotional",{"className":"px-3 py-1 bg-primary/10 text-primary rounded-full text-sm","children":"devotional"}],["$","span","tantric",{"className":"px-3 py-1 bg-primary/10 text-primary rounded-full text-sm","children":"tantric"}],["$","span","feminine",{"className":"px-3 py-1 bg-primary/10 text-primary rounded-full text-sm","children":"feminine"}]]}]]}]}],["$","section",null,{"className":"py-8 px-4 sm:px-6 lg:px-8 pb-20","children":["$","div",null,{"className":"max-w-4xl mx-auto grid gap-8","children":[["$","div",null,{"ref":"$undefined","className":"rounded-lg border text-card-foreground shadow-sm bg-card border-border/50","children":["$","div",null,{"ref":"$undefined","className":"p-6","children":[["$","div",null,{"className":"flex items-center gap-3 mb-4","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-book-open w-5 h-5 text-secondary","children":[["$","path","1akyts",{"d":"M12 7v14"}],["$","path","ruj8y",{"d":"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}],"$undefined"]}],["$","h2",null,{"className":"font-display text-xl font-semibold text-foreground","children":"Overview"}]]}],["$","p",null,{"className":"text-muted-foreground leading-relaxed","children":"Shaktism centers on the worship of Shakti, the divine feminine power. The Goddess appears in myriad forms—nurturing as Lakshmi, fierce as Kali, wise as Saraswati—representing the dynamic, creative force of existence."}]]}]}],["$","div",null,{"ref":"$undefined","className":"rounded-lg border text-card-foreground shadow-sm bg-card border-border/50","children":["$","div",null,{"ref":"$undefined","className":"p-6","children":[["$","h2",null,{"className":"font-display text-xl font-semibold text-foreground mb-4","children":"Key Ideas"}],["$","ul",null,{"className":"space-y-3","children":[["$","li","0",{"className":"flex gap-3","children":[["$","span",null,{"className":"w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium","children":1}],["$","span",null,{"className":"text-muted-foreground","children":"The universe is the Goddess's body and play"}]]}],["$","li","1",{"className":"flex gap-3","children":["$L18","$L19"]}],"$L1a","$L1b"]}]]}]}],"$L1c","$L1d","$L1e","$L1f"]}]}]]}],"$L20"]}]
21:I[13642,["/_next/static/chunks/e9f922839a1f4c35.js","/_next/static/chunks/7c92e96509cd355e.js","/_next/static/chunks/79bc64d3981b5c5f.js"],"Footer"]
18:["$","span",null,{"className":"w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium","children":2}]
19:["$","span",null,{"className":"text-muted-foreground","children":"Shakti and Shiva are inseparable—power and consciousness"}]
1a:["$","li","2",{"className":"flex gap-3","children":[["$","span",null,{"className":"w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium","children":3}],["$","span",null,{"className":"text-muted-foreground","children":"The Goddess is both transcendent and immanent"}]]}]
1b:["$","li","3",{"className":"flex gap-3","children":[["$","span",null,{"className":"w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium","children":4}],["$","span",null,{"className":"text-muted-foreground","children":"Sacred feminine as gateway to liberation"}]]}]
1c:["$","div",null,{"ref":"$undefined","className":"rounded-lg border text-card-foreground shadow-sm bg-card border-border/50","children":["$","div",null,{"ref":"$undefined","className":"p-6","children":[["$","h2",null,{"className":"font-display text-xl font-semibold text-foreground mb-3","children":"Primary Practices"}],["$","div",null,{"className":"flex flex-wrap gap-2","children":[["$","span","Devi puja",{"className":"px-3 py-2 bg-muted rounded-lg text-sm text-foreground","children":"Devi puja"}],["$","span","Mantra sadhana",{"className":"px-3 py-2 bg-muted rounded-lg text-sm text-foreground","children":"Mantra sadhana"}],["$","span","Yantra worship",{"className":"px-3 py-2 bg-muted rounded-lg text-sm text-foreground","children":"Yantra worship"}],["$","span","Navaratri observance",{"className":"px-3 py-2 bg-muted rounded-lg text-sm text-foreground","children":"Navaratri observance"}]]}]]}]}]
1d:["$","div",null,{"ref":"$undefined","className":"rounded-lg border text-card-foreground shadow-sm bg-card border-border/50","children":["$","div",null,{"ref":"$undefined","className":"p-6","children":[["$","div",null,{"className":"flex items-center gap-3 mb-4","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-users w-5 h-5 text-secondary","children":[["$","path","1yyitq",{"d":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["$","circle","nufk8",{"cx":"9","cy":"7","r":"4"}],["$","path","kshegd",{"d":"M22 21v-2a4 4 0 0 0-3-3.87"}],["$","path","1da9ce",{"d":"M16 3.13a4 4 0 0 1 0 7.75"}],"$undefined"]}],["$","h2",null,{"className":"font-display text-xl font-semibold text-foreground","children":"Who It Suits"}]]}],["$","p",null,{"className":"text-muted-foreground leading-relaxed","children":"Those drawn to divine feminine energy, seekers comfortable with paradox, and those attracted to transformative spiritual power."}]]}]}]
1e:["$","div",null,{"ref":"$undefined","className":"rounded-lg border text-card-foreground shadow-sm bg-card border-border/50","children":["$","div",null,{"ref":"$undefined","className":"p-6","children":[["$","div",null,{"className":"flex items-center gap-3 mb-4","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-play w-5 h-5 text-secondary","children":[["$","polygon","1oa8hb",{"points":"6 3 20 12 6 21 6 3"}],"$undefined"]}],["$","h2",null,{"className":"font-display text-xl font-semibold text-foreground","children":"How to Start"}]]}],["$","p",null,{"className":"text-muted-foreground leading-relaxed","children":"Begin with simple Devi worship, learn a Shakti mantra, and observe Navaratri with devotion."}]]}]}]
1f:["$","div",null,{"className":"flex flex-col sm:flex-row gap-4 pt-4","children":[["$","$L17",null,{"href":"/faith-finder","className":"flex-1","children":["$","button",null,{"className":"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90","ref":"$undefined","children":["Find Your Spiritual Path"," ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-4 h-4","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]}],["$","$L17",null,{"href":"/traditions","className":"flex-1","children":["$","button",null,{"className":"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 w-full","ref":"$undefined","children":"Explore All Traditions"}]}]]}]
20:["$","$L21",null,{}]
13:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
11:null
15:[["$","title","0",{"children":"Shaktism — Practices, Philosophy & Path | Sadhaka"}],["$","meta","1",{"name":"description","content":"Worship of the Divine Feminine as the supreme creative power of the universe. Explore key practices, ideas, and how to begin Shaktism."}],["$","link","2",{"rel":"author","href":"https://opensadhaka.com"}],["$","meta","3",{"name":"author","content":"Sadhaka"}],["$","meta","4",{"name":"keywords","content":"shaktism,devotional,tantric,feminine,sanatan dharma,spiritual tradition"}],["$","meta","5",{"name":"creator","content":"Sadhaka"}],["$","meta","6",{"name":"publisher","content":"Sadhaka"}],["$","meta","7",{"name":"robots","content":"index, follow"}],["$","meta","8",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","link","9",{"rel":"canonical","href":"https://opensadhaka.com/traditions/shaktism"}],["$","meta","10",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","11",{"property":"og:title","content":"Shaktism | Sadhaka"}],["$","meta","12",{"property":"og:description","content":"Worship of the Divine Feminine as the supreme creative power of the universe."}],["$","meta","13",{"property":"og:url","content":"https://opensadhaka.com/traditions/shaktism"}],["$","meta","14",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","15",{"name":"twitter:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","16",{"name":"twitter:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}]]
