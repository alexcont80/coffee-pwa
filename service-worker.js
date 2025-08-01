// service-worker.js

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open('caffe-app-v1').then(function(cache) {
            cache.addAll([
  '/coffee-pwa/',
  '/coffee-pwa/index.html',
  '/coffee-pwa/icon-192.png',
  '/coffee-pwa/icon-512.png',
  '/coffee-pwa/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
