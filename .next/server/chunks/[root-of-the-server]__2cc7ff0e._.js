module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},17837,e=>{"use strict";var t=e.i(63742),r=e.i(68217),a=e.i(69846),n=e.i(82442),i=e.i(64145),o=e.i(56225),s=e.i(35943),l=e.i(84830),c=e.i(82091),d=e.i(77427),u=e.i(76180),p=e.i(50415),m=e.i(42594),h=e.i(6825),g=e.i(99908),x=e.i(93695);e.i(35816);var y=e.i(69451),$=e.i(21353),R=e.i(42163),f=e.i(19068),w=e.i(95806),v=e.i(43642),T=e.i(3718),b=e.i(31595),k=e.i(82201),C=e.i(74586);async function E(e){let{searchParams:t}=new URL(e.url),r=t.get("type"),a=t.get("slug");if(!r||!a)return new $.NextResponse("Missing type or slug parameters",{status:400});let n="";try{switch(r){case"philosophies":{let e=(0,R.getPhilosophyBySlug)(a);if(!e)break;e.title,n=`
# ${e.title}
**Summary:** ${e.summary}
**Key Question Explored:** ${e.keyQuestion}

## Description
${e.description}

## Key Ideas
${e.keyIdeas.map(e=>`- ${e}`).join("\n")}

## Practical Guidance
- **Who it suits:** ${e.whoItSuits}
- **How to start:** ${e.howToStart}

## Recommended Texts
${e.recommendedTexts.map(e=>`- ${e}`).join("\n")}
`;break}case"traditions":{let e=(0,f.getTraditionBySlug)(a);if(!e)break;e.title,n=`
# ${e.title}
**Summary:** ${e.summary}

## Description
${e.description}

## Core Practices
${e.primaryPractices.map(e=>`- ${e}`).join("\n")}

## Practical Guidance
- **Who it suits:** ${e.whoItSuits}
- **How to start:** ${e.howToStart}
`;break}case"texts":{let e=(0,w.getTextBySlug)(a);if(!e)break;e.title,n=`
# ${e.title}
**Summary:** ${e.summary}

## Description
${e.overview}

## Core Subjects
${e.themes.map(e=>`- ${e}`).join("\n")}

## Quick Facts
- **Who should read:** ${e.whoItSuitsFor}
- **How to study:** ${e.howToApproach}
`;break}case"concepts":{let e=a.replace("what-is-","").replace("-meaning",""),t=(0,v.getConceptBySlug)(e);if(!t)break;t.sanskritWord,n=`
# ${t.sanskritWord} (${t.englishTranslation})
**Definition:** ${t.shortDefinition}

## Detailed Description
${t.longDescription}

## Key Principles
${t.keyPrinciples.map(e=>`- ${e}`).join("\n")}

## Philosophical & Practical Context
- **Role in Philosophy:** ${t.roleInPhilosophy}
- **Practical Application:** ${t.practicalApplication}

## Source Texts
${t.sourceTexts.map(e=>`- ${e}`).join("\n")}
`;break}case"practices":{let e=(0,T.getPracticeBySlug)(a);if(!e)break;e.title,n=`
# ${e.title} (${e.sanskritName})
**Summary:** ${e.summary}

## What It Is
${e.whatItIs}

## Benefits
${e.benefits.map(e=>`- ${e}`).join("\n")}

## Guidance
- **Who it suits:** ${e.whoItSuits}
- **How to begin:** ${e.howToBegin}
- **Time commitment:** ${e.timeCommitment}
`;break}case"greats":{let e=(0,b.getGreatBySlug)(a);if(!e)break;e.name,n=`
# ${e.name} (${e.era})
**Summary:** ${e.summary}

## Description
${e.description}

## Key Teachings
${e.keyTeachings.map(e=>`- ${e}`).join("\n")}

## Impact
${e.relevanceToday}
`;break}case"topics":{let e=(0,k.getTopicBySlug)(a);if(!e)break;e.name,n=`
# ${e.name}
**Summary:** ${e.summary}

## Content
${e.content}

## Recommended Pathways
- **Practices:** ${e.recommendedPractices.join(", ")}
- **Traditions:** ${e.recommendedTraditions.join(", ")}
`;break}case"comparisons":{let e=(0,C.getComparisonBySlug)(a);if(!e)break;e.title,n=`
# ${e.title}
**TL;DR:** ${e.tldr||e.metaDescription}

## Content
${e.content}
`}}if(!n)return new $.NextResponse(`# Entity Not Found

The requested ${r} "${a}" could not be found or does not have a Markdown rendering configured.`,{status:404});let e=`<!-- LLM INSTRUCTION: This file is a machine-readable summary of a Sādhaka entity. -->
${n.trim()}`;return new $.NextResponse(e,{headers:{"Content-Type":"text/markdown; charset=utf-8","Cache-Control":"public, max-age=86400, s-maxage=86400"}})}catch(e){return console.error("Error generating LLM content:",e),new $.NextResponse("Internal Server Error",{status:500})}}e.s(["GET",()=>E],87193);var S=e.i(87193);let P=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/llm-content/route",pathname:"/api/llm-content",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/Developer/Sadhaka/src/app/api/llm-content/route.ts",nextConfigOutput:"",userland:S}),{workAsyncStorage:A,workUnitAsyncStorage:N,serverHooks:I}=P;function j(){return(0,a.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:N})}async function D(e,t,a){P.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let $="/api/llm-content/route";$=$.replace(/\/index$/,"")||"/";let R=await P.prepare(e,t,{srcPage:$,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:f,params:w,nextConfig:v,parsedUrl:T,isDraftMode:b,prerenderManifest:k,routerServerContext:C,isOnDemandRevalidate:E,revalidateOnlyGenerated:S,resolvedPathname:A,clientReferenceManifest:N,serverActionsManifest:I}=R,j=(0,s.normalizeAppPath)($),D=!!(k.dynamicRoutes[j]||k.routes[A]),O=async()=>((null==C?void 0:C.render404)?await C.render404(e,t,T,!1):t.end("This page could not be found"),null);if(D&&!b){let e=!!k.routes[A],t=k.dynamicRoutes[j];if(t&&!1===t.fallback&&!e){if(v.experimental.adapterPath)return await O();throw new x.NoFallbackError}}let q=null;!D||P.isDev||b||(q="/index"===(q=A)?"/":q);let H=!0===P.isDev||!D,_=D&&!H;I&&N&&(0,o.setManifestsSingleton)({page:$,clientReferenceManifest:N,serverActionsManifest:I});let U=e.method||"GET",M=(0,i.getTracer)(),B=M.getActiveScopeSpan(),K={params:w,prerenderManifest:k,renderOpts:{experimental:{authInterrupts:!!v.experimental.authInterrupts},cacheComponents:!!v.cacheComponents,supportsDynamicResponse:H,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:v.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>P.onRequestError(e,t,a,n,C)},sharedContext:{buildId:f}},F=new l.NodeNextRequest(e),L=new l.NodeNextResponse(t),W=c.NextRequestAdapter.fromNodeNextRequest(F,(0,c.signalFromNodeResponse)(t));try{let o=async e=>P.handle(W,K).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${U} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${U} ${$}`)}),s=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var i,l;let c=async({previousCacheEntry:r})=>{try{if(!s&&E&&S&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await o(n);e.fetchMetrics=K.renderOpts.fetchMetrics;let l=K.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let c=K.renderOpts.collectedTags;if(!D)return await (0,p.sendResponse)(F,L,i,K.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(i.headers);c&&(t[g.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,a=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:K.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await P.onRequestError(e,t,{routerKind:"App Router",routePath:$,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:_,isOnDemandRevalidate:E})},!1,C),t}},d=await P.handleResponse({req:e,nextConfig:v,cacheKey:q,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:k,isRoutePPREnabled:!1,isOnDemandRevalidate:E,revalidateOnlyGenerated:S,responseGenerator:c,waitUntil:a.waitUntil,isMinimalMode:s});if(!D)return null;if((null==d||null==(i=d.value)?void 0:i.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",E?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),b&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let x=(0,m.fromNodeOutgoingHttpHeaders)(d.value.headers);return s&&D||x.delete(g.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||x.get("Cache-Control")||x.set("Cache-Control",(0,h.getCacheControlHeader)(d.cacheControl)),await (0,p.sendResponse)(F,L,new Response(d.value.body,{headers:x,status:d.value.status||200})),null};B?await l(B):await M.withPropagatedContext(e.headers,()=>M.trace(d.BaseServerSpan.handleRequest,{spanName:`${U} ${$}`,kind:i.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},l))}catch(t){if(t instanceof x.NoFallbackError||await P.onRequestError(e,t,{routerKind:"App Router",routePath:j,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:_,isOnDemandRevalidate:E})},!1,C),D)throw t;return await (0,p.sendResponse)(F,L,new Response(null,{status:500})),null}}e.s(["handler",()=>D,"patchFetch",()=>j,"routeModule",()=>P,"serverHooks",()=>I,"workAsyncStorage",()=>A,"workUnitAsyncStorage",()=>N],17837)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__2cc7ff0e._.js.map