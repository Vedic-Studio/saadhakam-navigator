self.__SERVER_FILES_MANIFEST={
  "version": 1,
  "config": {
    "env": {},
    "webpack": null,
    "typescript": {
      "ignoreBuildErrors": true
    },
    "typedRoutes": false,
    "distDir": ".next",
    "cleanDistDir": true,
    "assetPrefix": "",
    "cacheMaxMemorySize": 52428800,
    "configOrigin": "next.config.ts",
    "useFileSystemPublicRoutes": true,
    "generateEtags": true,
    "pageExtensions": [
      "tsx",
      "ts",
      "jsx",
      "js"
    ],
    "poweredByHeader": true,
    "compress": true,
    "images": {
      "deviceSizes": [
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840
      ],
      "imageSizes": [
        32,
        48,
        64,
        96,
        128,
        256,
        384
      ],
      "path": "/_next/image",
      "loader": "default",
      "loaderFile": "",
      "domains": [],
      "disableStaticImages": false,
      "minimumCacheTTL": 14400,
      "formats": [
        "image/webp"
      ],
      "maximumRedirects": 3,
      "maximumResponseBody": 50000000,
      "dangerouslyAllowLocalIP": false,
      "dangerouslyAllowSVG": false,
      "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;",
      "contentDispositionType": "attachment",
      "localPatterns": [
        {
          "pathname": "**",
          "search": ""
        }
      ],
      "remotePatterns": [
        {
          "protocol": "https",
          "hostname": "i.pravatar.cc"
        }
      ],
      "qualities": [
        75
      ],
      "unoptimized": false
    },
    "devIndicators": {
      "position": "bottom-left"
    },
    "onDemandEntries": {
      "maxInactiveAge": 60000,
      "pagesBufferLength": 5
    },
    "basePath": "",
    "sassOptions": {},
    "trailingSlash": false,
    "i18n": null,
    "productionBrowserSourceMaps": false,
    "excludeDefaultMomentLocales": true,
    "reactProductionProfiling": false,
    "reactStrictMode": null,
    "reactMaxHeadersLength": 6000,
    "httpAgentOptions": {
      "keepAlive": true
    },
    "logging": {},
    "compiler": {},
    "expireTime": 31536000,
    "staticPageGenerationTimeout": 60,
    "modularizeImports": {
      "@mui/icons-material": {
        "transform": "@mui/icons-material/{{member}}"
      },
      "lodash": {
        "transform": "lodash/{{member}}"
      }
    },
    "outputFileTracingRoot": "/Users/ankitmishra/Developer/Sadhaka",
    "cacheComponents": false,
    "cacheLife": {
      "default": {
        "stale": 300,
        "revalidate": 900,
        "expire": 4294967294
      },
      "seconds": {
        "stale": 30,
        "revalidate": 1,
        "expire": 60
      },
      "minutes": {
        "stale": 300,
        "revalidate": 60,
        "expire": 3600
      },
      "hours": {
        "stale": 300,
        "revalidate": 3600,
        "expire": 86400
      },
      "days": {
        "stale": 300,
        "revalidate": 86400,
        "expire": 604800
      },
      "weeks": {
        "stale": 300,
        "revalidate": 604800,
        "expire": 2592000
      },
      "max": {
        "stale": 300,
        "revalidate": 2592000,
        "expire": 31536000
      }
    },
    "cacheHandlers": {},
    "experimental": {
      "useSkewCookie": false,
      "cssChunking": true,
      "multiZoneDraftMode": false,
      "appNavFailHandling": false,
      "prerenderEarlyExit": true,
      "serverMinification": true,
      "linkNoTouchStart": false,
      "caseSensitiveRoutes": false,
      "dynamicOnHover": false,
      "preloadEntriesOnStart": true,
      "clientRouterFilter": true,
      "clientRouterFilterRedirects": false,
      "fetchCacheKeyPrefix": "",
      "proxyPrefetch": "flexible",
      "optimisticClientCache": true,
      "manualClientBasePath": false,
      "cpus": 7,
      "memoryBasedWorkersCount": false,
      "imgOptConcurrency": null,
      "imgOptTimeoutInSeconds": 7,
      "imgOptMaxInputPixels": 268402689,
      "imgOptSequentialRead": null,
      "imgOptSkipMetadata": null,
      "isrFlushToDisk": true,
      "workerThreads": false,
      "optimizeCss": false,
      "nextScriptWorkers": false,
      "scrollRestoration": false,
      "externalDir": false,
      "disableOptimizedLoading": false,
      "gzipSize": true,
      "craCompat": false,
      "esmExternals": true,
      "fullySpecified": false,
      "swcTraceProfiling": false,
      "forceSwcTransforms": false,
      "largePageDataBytes": 128000,
      "typedEnv": false,
      "parallelServerCompiles": false,
      "parallelServerBuildTraces": false,
      "ppr": false,
      "authInterrupts": false,
      "webpackMemoryOptimizations": false,
      "optimizeServerReact": true,
      "viewTransition": false,
      "removeUncaughtErrorAndRejectionListeners": false,
      "validateRSCRequestHeaders": false,
      "staleTimes": {
        "dynamic": 0,
        "static": 300
      },
      "reactDebugChannel": false,
      "serverComponentsHmrCache": true,
      "staticGenerationMaxConcurrency": 8,
      "staticGenerationMinPagesPerWorker": 25,
      "transitionIndicator": false,
      "inlineCss": false,
      "useCache": false,
      "globalNotFound": false,
      "browserDebugInfoInTerminal": false,
      "lockDistDir": true,
      "isolatedDevBuild": true,
      "proxyClientMaxBodySize": 10485760,
      "hideLogsAfterAbort": false,
      "mcpServer": true,
      "turbopackFileSystemCacheForDev": true,
      "turbopackFileSystemCacheForBuild": false,
      "turbopackInferModuleSideEffects": false,
      "optimizePackageImports": [
        "lucide-react",
        "date-fns",
        "lodash-es",
        "ramda",
        "antd",
        "react-bootstrap",
        "ahooks",
        "@ant-design/icons",
        "@headlessui/react",
        "@headlessui-float/react",
        "@heroicons/react/20/solid",
        "@heroicons/react/24/solid",
        "@heroicons/react/24/outline",
        "@visx/visx",
        "@tremor/react",
        "rxjs",
        "@mui/material",
        "@mui/icons-material",
        "recharts",
        "react-use",
        "effect",
        "@effect/schema",
        "@effect/platform",
        "@effect/platform-node",
        "@effect/platform-browser",
        "@effect/platform-bun",
        "@effect/sql",
        "@effect/sql-mssql",
        "@effect/sql-mysql2",
        "@effect/sql-pg",
        "@effect/sql-sqlite-node",
        "@effect/sql-sqlite-bun",
        "@effect/sql-sqlite-wasm",
        "@effect/sql-sqlite-react-native",
        "@effect/rpc",
        "@effect/rpc-http",
        "@effect/typeclass",
        "@effect/experimental",
        "@effect/opentelemetry",
        "@material-ui/core",
        "@material-ui/icons",
        "@tabler/icons-react",
        "mui-core",
        "react-icons/ai",
        "react-icons/bi",
        "react-icons/bs",
        "react-icons/cg",
        "react-icons/ci",
        "react-icons/di",
        "react-icons/fa",
        "react-icons/fa6",
        "react-icons/fc",
        "react-icons/fi",
        "react-icons/gi",
        "react-icons/go",
        "react-icons/gr",
        "react-icons/hi",
        "react-icons/hi2",
        "react-icons/im",
        "react-icons/io",
        "react-icons/io5",
        "react-icons/lia",
        "react-icons/lib",
        "react-icons/lu",
        "react-icons/md",
        "react-icons/pi",
        "react-icons/ri",
        "react-icons/rx",
        "react-icons/si",
        "react-icons/sl",
        "react-icons/tb",
        "react-icons/tfi",
        "react-icons/ti",
        "react-icons/vsc",
        "react-icons/wi"
      ],
      "trustHostHeader": false,
      "isExperimentalCompile": false
    },
    "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight",
    "bundlePagesRouterDependencies": false,
    "configFileName": "next.config.ts",
    "turbopack": {
      "root": "/Users/ankitmishra/Developer/Sadhaka"
    },
    "distDirRoot": ".next",
    "_originalRewrites": {
      "beforeFiles": [],
      "afterFiles": [],
      "fallback": []
    },
    "_originalRedirects": [
      {
        "source": "/karma-meaning",
        "destination": "/what-is-karma",
        "permanent": true
      },
      {
        "source": "/dharma-meaning",
        "destination": "/what-is-dharma",
        "permanent": true
      },
      {
        "source": "/moksha-meaning",
        "destination": "/what-is-moksha",
        "permanent": true
      },
      {
        "source": "/samsara-meaning",
        "destination": "/what-is-samsara",
        "permanent": true
      },
      {
        "source": "/maya-meaning",
        "destination": "/what-is-maya",
        "permanent": true
      },
      {
        "source": "/atman-meaning",
        "destination": "/what-is-atman",
        "permanent": true
      },
      {
        "source": "/brahman-meaning",
        "destination": "/what-is-brahman",
        "permanent": true
      },
      {
        "source": "/yoga-meaning",
        "destination": "/what-is-yoga",
        "permanent": true
      },
      {
        "source": "/ahimsa-meaning",
        "destination": "/what-is-ahimsa",
        "permanent": true
      },
      {
        "source": "/guru-meaning",
        "destination": "/what-is-guru",
        "permanent": true
      },
      {
        "source": "/bhakti-meaning",
        "destination": "/what-is-bhakti",
        "permanent": true
      },
      {
        "source": "/jnana-meaning",
        "destination": "/what-is-jnana",
        "permanent": true
      },
      {
        "source": "/viveka-meaning",
        "destination": "/what-is-viveka",
        "permanent": true
      },
      {
        "source": "/vairagya-meaning",
        "destination": "/what-is-vairagya",
        "permanent": true
      },
      {
        "source": "/samadhi-meaning",
        "destination": "/what-is-samadhi",
        "permanent": true
      },
      {
        "source": "/seva-meaning",
        "destination": "/what-is-seva",
        "permanent": true
      },
      {
        "source": "/avidya-meaning",
        "destination": "/what-is-avidya",
        "permanent": true
      },
      {
        "source": "/ishvara-meaning",
        "destination": "/what-is-ishvara",
        "permanent": true
      },
      {
        "source": "/jiva-meaning",
        "destination": "/what-is-jiva",
        "permanent": true
      },
      {
        "source": "/karma-yoga-meaning",
        "destination": "/what-is-karma-yoga",
        "permanent": true
      },
      {
        "source": "/raja-yoga-meaning",
        "destination": "/what-is-raja-yoga",
        "permanent": true
      },
      {
        "source": "/purushartha-meaning",
        "destination": "/what-is-purushartha",
        "permanent": true
      },
      {
        "source": "/advaita-meaning",
        "destination": "/what-is-advaita",
        "permanent": true
      },
      {
        "source": "/ahamkara-meaning",
        "destination": "/what-is-ahamkara",
        "permanent": true
      },
      {
        "source": "/niskama-karma-meaning",
        "destination": "/what-is-niskama-karma",
        "permanent": true
      },
      {
        "source": "/pranayama-meaning",
        "destination": "/what-is-pranayama",
        "permanent": true
      },
      {
        "source": "/rta-meaning",
        "destination": "/what-is-rta",
        "permanent": true
      }
    ]
  },
  "appDir": "/Users/ankitmishra/Developer/Sadhaka",
  "relativeAppDir": "",
  "files": [
    ".next/routes-manifest.json",
    ".next/server/pages-manifest.json",
    ".next/build-manifest.json",
    ".next/prerender-manifest.json",
    ".next/server/functions-config-manifest.json",
    ".next/server/middleware-manifest.json",
    ".next/server/middleware-build-manifest.js",
    ".next/server/app-paths-manifest.json",
    ".next/app-path-routes-manifest.json",
    ".next/server/server-reference-manifest.js",
    ".next/server/server-reference-manifest.json",
    ".next/BUILD_ID",
    ".next/server/next-font-manifest.js",
    ".next/server/next-font-manifest.json",
    ".next/required-server-files.json"
  ],
  "ignore": []
}