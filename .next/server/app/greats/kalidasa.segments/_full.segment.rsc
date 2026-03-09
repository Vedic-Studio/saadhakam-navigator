1:"$Sreact.fragment"
2:I[80238,["/_next/static/chunks/33b5ddec3c3b997a.js"],""]
9:I[35380,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
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
          0:{"P":null,"b":"fOjDIfcLdpjIyf3vul0O5","c":["","greats","kalidasa"],"q":"","i":false,"f":[[["",{"children":["greats",{"children":[["slug","kalidasa","d"],{"children":["__PAGE__",{}]}]}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/ddeef4062a5f50ea.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/33b5ddec3c3b997a.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","script",null,{"async":true,"src":"https://www.googletagmanager.com/gtag/js?id=G-S3DHYPPG9R"}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);}\n              window.gtag = window.gtag || gtag;\n              gtag('js', new Date());\n\n              gtag('config', 'G-S3DHYPPG9R');\n            "}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Your AI-powered companion for exploring Sanatan Dharma, Bhagavad Gita, Vedas, and ancient spiritual wisdom.\",\"sameAs\":[\"https://twitter.com/opensadhaka\",\"https://instagram.com/opensadhaka\",\"https://youtube.com/@opensadhaka\"]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Sadhaka\",\"url\":\"https://opensadhaka.com\",\"description\":\"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.\",\"potentialAction\":{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"https://opensadhaka.com/search?q={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}}"}}]]}],["$","body",null,{"children":[["$","$L2",null,{"id":"sadhaka-analytics-bridge","strategy":"afterInteractive","children":"$3"}],"$L4"]}]]}]]}],{"children":["$L5",{"children":["$L6",{"children":["$L7",{},null,false,false]},null,false,false]},null,false,false]},null,false,false],"$L8",false]],"m":"$undefined","G":["$9",[]],"S":true}
a:I[13055,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
b:I[30732,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"default"]
d:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"OutletBoundary"]
e:"$Sreact.suspense"
10:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"ViewportBoundary"]
12:I[8133,["/_next/static/chunks/698a83c93d644c48.js","/_next/static/chunks/f5d3be459c84d3b1.js"],"MetadataBoundary"]
4:["$","$La",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Lb",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]
5:["$","$1","c",{"children":[null,["$","$La",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Lb",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
6:["$","$1","c",{"children":[null,["$","$La",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Lb",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
7:["$","$1","c",{"children":["$Lc",[["$","script","script-0",{"src":"/_next/static/chunks/087b1d481975c188.js","async":true,"nonce":"$undefined"}],["$","script","script-1",{"src":"/_next/static/chunks/cde3ae7fe003833a.js","async":true,"nonce":"$undefined"}]],["$","$Ld",null,{"children":["$","$e",null,{"name":"Next.MetadataOutlet","children":"$@f"}]}]]}]
8:["$","$1","h",{"children":[null,["$","$L10",null,{"children":"$L11"}],["$","div",null,{"hidden":true,"children":["$","$L12",null,{"children":["$","$e",null,{"name":"Next.Metadata","children":"$L13"}]}]}],null]}]
14:I[71067,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/087b1d481975c188.js","/_next/static/chunks/cde3ae7fe003833a.js"],"Header"]
15:I[83071,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/087b1d481975c188.js","/_next/static/chunks/cde3ae7fe003833a.js"],""]
c:["$","div",null,{"className":"min-h-screen bg-background","children":[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://opensadhaka.com\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Spiritual Masters\",\"item\":\"https://opensadhaka.com/greats\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Kalidasa\",\"item\":\"https://opensadhaka.com/greats/kalidasa\"}]}"}}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Person\",\"name\":\"Kalidasa\",\"description\":\"Greatest Sanskrit poet whose works fuse aesthetic beauty with spiritual depth.\",\"jobTitle\":\"Poet-Sage of Sanskrit Literature\",\"knowsAbout\":[\"literary\",\"aesthetic\",\"classical\"]}"}}],["$","$L14",null,{}],["$","main",null,{"className":"pt-20","children":[["$","section",null,{"className":"py-16 px-4 sm:px-6 lg:px-8","children":["$","div",null,{"className":"max-w-4xl mx-auto","children":[["$","nav",null,{"aria-label":"Breadcrumb","className":"mb-6","children":["$","$L15",null,{"href":"/greats","className":"inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-left w-4 h-4","children":[["$","path","1l729n",{"d":"m12 19-7-7 7-7"}],["$","path","x3x0zl",{"d":"M19 12H5"}],"$undefined"]}],"Back to Spiritual Masters"]}]}],["$","div",null,{"className":"mb-2 text-sm text-primary font-medium uppercase tracking-wider","children":"4th-5th century CE (approx.)"}],["$","h1",null,{"className":"font-display text-4xl md:text-5xl font-bold text-foreground mb-3","children":"Kalidasa"}],["$","p",null,{"className":"text-xl text-secondary font-medium mb-4","children":"Poet-Sage of Sanskrit Literature"}],["$","p",null,{"className":"text-lg text-muted-foreground mb-6","children":"Greatest Sanskrit poet whose works fuse aesthetic beauty with spiritual depth."}],["$","div",null,{"className":"flex flex-wrap gap-2","children":[["$","span","literary",{"className":"px-3 py-1 bg-primary/10 text-primary rounded-full text-sm","children":"literary"}],["$","span","aesthetic",{"className":"px-3 py-1 bg-primary/10 text-primary rounded-full text-sm","children":"aesthetic"}],["$","span","classical",{"className":"px-3 py-1 bg-primary/10 text-primary rounded-full text-sm","children":"classical"}]]}]]}]}],["$","section",null,{"className":"py-8 px-4 sm:px-6 lg:px-8 pb-20","children":["$","div",null,{"className":"max-w-4xl mx-auto grid gap-8","children":[["$","div",null,{"ref":"$undefined","className":"rounded-lg border text-card-foreground shadow-sm bg-card border-border/50","children":["$","div",null,{"ref":"$undefined","className":"p-6","children":[["$","div",null,{"className":"flex items-center gap-3 mb-4","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-book-open w-5 h-5 text-secondary","children":[["$","path","1akyts",{"d":"M12 7v14"}],["$","path","ruj8y",{"d":"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}],"$undefined"]}],["$","h2",null,{"className":"font-display text-xl font-semibold text-foreground","children":"Biography"}]]}],["$","p",null,{"className":"text-muted-foreground leading-relaxed","children":"Kalidasa represents the peak of Sanskrit literary achievement. His plays and poems display extraordinary beauty of language while conveying profound spiritual truths. His works remain the gold standard of Sanskrit literature and continue to inspire."}]]}]}],"$L16","$L17","$L18","$L19"]}]}]]}],"$L1a"]}]
1b:I[82899,["/_next/static/chunks/33b5ddec3c3b997a.js","/_next/static/chunks/087b1d481975c188.js","/_next/static/chunks/cde3ae7fe003833a.js"],"Footer"]
16:["$","div",null,{"ref":"$undefined","className":"rounded-lg border text-card-foreground shadow-sm bg-card border-border/50","children":["$","div",null,{"ref":"$undefined","className":"p-6","children":[["$","div",null,{"className":"flex items-center gap-3 mb-4","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-lightbulb w-5 h-5 text-secondary","children":[["$","path","1gvzjb",{"d":"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["$","path","x1upvd",{"d":"M9 18h6"}],["$","path","ceow96",{"d":"M10 22h4"}],"$undefined"]}],["$","h2",null,{"className":"font-display text-xl font-semibold text-foreground","children":"Key Teachings"}]]}],["$","ul",null,{"className":"space-y-3","children":[["$","li","0",{"className":"flex gap-3","children":[["$","span",null,{"className":"w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium","children":1}],["$","span",null,{"className":"text-muted-foreground","children":"Beauty (soundarya) reveals truth"}]]}],["$","li","1",{"className":"flex gap-3","children":[["$","span",null,{"className":"w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium","children":2}],["$","span",null,{"className":"text-muted-foreground","children":"Nature as manifestation of the divine"}]]}],["$","li","2",{"className":"flex gap-3","children":[["$","span",null,{"className":"w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium","children":3}],["$","span",null,{"className":"text-muted-foreground","children":"The rasas (aesthetic emotions) as doorways to experience"}]]}],["$","li","3",{"className":"flex gap-3","children":[["$","span",null,{"className":"w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium","children":4}],["$","span",null,{"className":"text-muted-foreground","children":"Dharma operating through human drama"}]]}]]}]]}]}]
17:["$","div",null,{"ref":"$undefined","className":"rounded-lg border text-card-foreground shadow-sm bg-card border-border/50","children":["$","div",null,{"ref":"$undefined","className":"p-6","children":[["$","h2",null,{"className":"font-display text-xl font-semibold text-foreground mb-3","children":"Relevance Today"}],["$","p",null,{"className":"text-muted-foreground leading-relaxed","children":"Kalidasa demonstrates that the aesthetic and the spiritual are not separate. His works show how art at its highest can convey truth and transform consciousness."}]]}]}]
18:["$","div",null,{"ref":"$undefined","className":"rounded-lg border text-card-foreground shadow-sm bg-card border-border/50","children":["$","div",null,{"ref":"$undefined","className":"p-6","children":[["$","div",null,{"className":"flex items-center gap-3 mb-4","children":[["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-library w-5 h-5 text-secondary","children":[["$","path","ji33uf",{"d":"m16 6 4 14"}],["$","path","1n7gus",{"d":"M12 6v14"}],["$","path","1gg7y9",{"d":"M8 8v12"}],["$","path","6qkkli",{"d":"M4 4v16"}],"$undefined"]}],["$","h2",null,{"className":"font-display text-xl font-semibold text-foreground","children":"Recommended Works"}]]}],["$","div",null,{"className":"flex flex-wrap gap-2","children":[["$","span","Shakuntala",{"className":"px-3 py-2 bg-muted rounded-lg text-sm text-foreground","children":"Shakuntala"}],["$","span","Meghaduta",{"className":"px-3 py-2 bg-muted rounded-lg text-sm text-foreground","children":"Meghaduta"}],["$","span","Kumarasambhava",{"className":"px-3 py-2 bg-muted rounded-lg text-sm text-foreground","children":"Kumarasambhava"}],["$","span","Raghuvamsha",{"className":"px-3 py-2 bg-muted rounded-lg text-sm text-foreground","children":"Raghuvamsha"}]]}]]}]}]
19:["$","div",null,{"className":"flex flex-col sm:flex-row gap-4 pt-4","children":[["$","$L15",null,{"href":"/faith-finder","className":"flex-1","children":["$","button",null,{"className":"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90","ref":"$undefined","children":["Find Your Spiritual Path"," ",["$","svg",null,{"ref":"$undefined","xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right ml-2 w-4 h-4","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]}],["$","$L15",null,{"href":"/greats","className":"flex-1","children":["$","button",null,{"className":"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 w-full","ref":"$undefined","children":"Explore More Masters"}]}]]}]
1a:["$","$L1b",null,{}]
11:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
f:null
13:[["$","title","0",{"children":"Kalidasa — Life, Teachings & Legacy | Sadhaka"}],["$","meta","1",{"name":"description","content":"Greatest Sanskrit poet whose works fuse aesthetic beauty with spiritual depth. Learn about Kalidasa's key teachings, philosophical contributions, and recommended works."}],["$","link","2",{"rel":"author","href":"https://opensadhaka.com"}],["$","meta","3",{"name":"author","content":"Sadhaka"}],["$","meta","4",{"name":"keywords","content":"kalidasa,literary,aesthetic,classical,spiritual master,sanatan dharma,indian philosophy"}],["$","meta","5",{"name":"creator","content":"Sadhaka"}],["$","meta","6",{"name":"publisher","content":"Sadhaka"}],["$","meta","7",{"name":"robots","content":"index, follow"}],["$","meta","8",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","link","9",{"rel":"canonical","href":"https://opensadhaka.com/greats/kalidasa"}],["$","meta","10",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","11",{"property":"og:title","content":"Kalidasa | Sadhaka"}],["$","meta","12",{"property":"og:description","content":"Greatest Sanskrit poet whose works fuse aesthetic beauty with spiritual depth."}],["$","meta","13",{"property":"og:url","content":"https://opensadhaka.com/greats/kalidasa"}],["$","meta","14",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","15",{"name":"twitter:title","content":"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"}],["$","meta","16",{"name":"twitter:description","content":"Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads."}]]
