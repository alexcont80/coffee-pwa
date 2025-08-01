// service-worker.js


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("v1").then(cache => {
      return cache.addAll([
        "/coffee-pwa/",
        "/coffee-pwa/index.html",
        "/coffee-pwa/icon-192.png",
        "/coffee-pwa/icon-512.png",
        "/coffee-pwa/manifest.json"
      ]);
    }).catch(err => {
      console.error("Errore durante l'aggiunta alla cache:", err);
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
