if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),d={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"174501c0c7880d520d6864b0848c2448"},{url:"/_next/static/Jdh4aVwHZHX1vTSNyursA/_buildManifest.js",revision:"66a650a40453999ca40002ee32e3481e"},{url:"/_next/static/Jdh4aVwHZHX1vTSNyursA/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/114-4102d7ace27c2d9c.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/222-1531c128b1a931f9.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/408-cfebd4ac7c50956a.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/537-58367b5756252e1b.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/584-efbee6c0e5786ea1.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/601-6173359fc5be57c1.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/685-bafe3956009d5806.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/aaea2bcf-967f539b7e8478bd.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/app/(landing)/page-0ff19229f40148ce.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/app/app/(form)/page-8649bf8f5fb9ed8d.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/app/app/ask/page-f407b8fb1d098131.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/app/app/layout-8be99ed0aa8f70a1.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/app/app/loading-df013552caedbad3.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/app/app/pronostico/page-c3469ca0099f0a29.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/app/app/respuestas/page-ff3d8ec7298cf03c.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/app/app/settings/page-fe08adae696e77ac.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/app/auth/login/page-8a083958fa89d2d4.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/app/layout-00f573b36cb7e048.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/bf6a786c-99bc3c5d75116c19.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/main-app-50c407a6b38dee11.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/main-b49e470443c6e2a3.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/pages/_app-52924524f99094ab.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/pages/_error-c92d5c4bb2b49926.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-a4eab91116c3e2b9.js",revision:"Jdh4aVwHZHX1vTSNyursA"},{url:"/_next/static/css/df697681518d5ba8.css",revision:"df697681518d5ba8"},{url:"/_next/static/media/08b6e03ca8aa6943-s.woff2",revision:"87ab68bd2009a320df3aedec61f4b7fe"},{url:"/_next/static/media/2787fc12d044695d-s.woff2",revision:"903b1b2ff5dcf2ff80177af9d54041a5"},{url:"/_next/static/media/2d15e52fdf24fcf9-s.woff2",revision:"9d66c93c7dbf3e46547f34453629dad6"},{url:"/_next/static/media/3a5c9edcaa50d295-s.woff2",revision:"b9dd37cf1dbc9573542f313775fce6e5"},{url:"/_next/static/media/3cd53f6f3c12df42-s.woff2",revision:"c700b08d2ddc112d51a9c49144f18b95"},{url:"/_next/static/media/44fe3f2ea3350017-s.woff2",revision:"286161cf56e2feb948461af48d2b4760"},{url:"/_next/static/media/659df64606270f52-s.p.woff2",revision:"481d4d47e10c9911d83663a678fc2fb3"},{url:"/_next/static/media/80a05b71dc7f17a3-s.woff2",revision:"5bcf6f087eb7cb45f58906f0b65bcd3d"},{url:"/_next/static/media/83d66d54151b092e-s.woff2",revision:"6ca0a88648d12d4a9f43f42d4985d256"},{url:"/_next/static/media/9e950c53e5e0f6b3-s.woff2",revision:"0844b5af34548bef6dc8b1e0bace5d7e"},{url:"/_next/static/media/bc0bd5ea51e67ec6-s.woff2",revision:"748040766a90eb442426573dec66a087"},{url:"/_next/static/media/c31e3915efb0d8c4-s.woff2",revision:"bb96b1cd9c4c68b6bebd4be3b4701c23"},{url:"/_next/static/media/d9ea97d9befb2a0b-s.woff2",revision:"829352bfe66f1bf47957afd8d93e2515"},{url:"/_next/static/media/e7175ce3a6adb21e-s.woff2",revision:"ca087fdd6b9bb07b674be887c5631358"},{url:"/_next/static/media/ebfe4f524cbef140-s.p.woff2",revision:"2d26c35df039408faadd48fa61c8a553"},{url:"/_next/static/media/f857b783d6323ca2-s.woff2",revision:"82ef0b9cbfb476f02a7153b980f05490"},{url:"/icon-192x192.png",revision:"385955f25ba3df7e95b62a3f75a8d3c9"},{url:"/icon-256x256.png",revision:"55605ea324632ff4677bc4041ecbbf5a"},{url:"/icon-384x384.png",revision:"cf7478ce5d84c27d0e6c6d23178a670a"},{url:"/icon-512x512.png",revision:"5deb1cc287bcfd96c93faa12aa2fe141"},{url:"/manifest.json",revision:"63f126a09488d8fb94557ba0c0f748f2"},{url:"/qmp.png",revision:"d3e1f058c94a2718a8a887642e744292"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
