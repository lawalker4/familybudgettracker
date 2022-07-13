const APP_PREFIX = 'FamilyBudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/js/index.js",
  "/js/idb.js",
  "/manifest.json",
  "/css/style.css",
  "/icon/icon-72x72.png",
  "/icon/icon-96x96.png",
  "/icon/icon-128x128.png",
  "/icon/icon-144x144.png",
  "/icon/icon-152x152.png",
  "/icon/icon-192x192.png",
  "/icon/icon-384x384.png",
  "/icon/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker : Installed!")

  event.waitUntil(

    (async () => {
      try {
        cache_obj = await caches.open(cache)
        cache_obj.addAll(caching_files)
      }
      catch {
        console.log("error occured while caching...")
      }
    })()
  )
})

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {

      return request
    })
  );
});

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(FILES_TO_CACHE)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheKeeplist.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log('deleting cache : ' + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});