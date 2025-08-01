// firebase-messaging-sw.js

// --- START: Firebase Cloud Messaging (FCM) Setup ---

// Import Firebase SDKs for app and messaging
// Using 'compat' versions as they are robust for service workers.
// Using SDK version 9.6.10 for consistency as in your index.html.
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// Your Firebase configuration (copied from your index.html)
const firebaseConfig = {
  apiKey: "AIzaSyBAGBm881emvR65_mpLP9POByLHKc7lV7s",
  authDomain: "coffeepwa.firebaseapp.com",
  projectId: "coffeepwa",
  storageBucket: "coffeepwa.firebasestorage.app",
  messagingSenderId: "916692141186",
  appId: "1:916692141186:web:14b47c70e7bab12f40a09b",
  measurementId: "G-YMQGDGZ2TV"
};

// Initialize the Firebase app in the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Set up background message handler for FCM
// This function is called when a notification arrives while the app is in the background.
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification.title || 'New Coffee Update!';
  const notificationOptions = {
    body: payload.notification.body || 'Time for coffee!',
    icon: payload.notification.icon || '/coffee-pwa/icon-192.png', // Using your specific icon path
    data: payload.data // Pass along any custom data
  };

  // Show the notification to the user
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Add a click handler for notifications (optional but recommended)
// This opens the app when the user clicks the notification.
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Look for an existing client (tab) that belongs to your app's origin
        for (const client of clientList) {
          // Note: self.location.origin might be 'https://coffeepwa.web.app'
          // and client.url might be 'https://coffeepwa.web.app/coffee-pwa/'
          if (client.url.startsWith(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        // If no existing client is found, open a new one to the app's root path
        if (clients.openWindow) {
          return clients.openWindow('/coffee-pwa/'); // Use your specific base path
        }
      })
  );
});

// --- END: Firebase Cloud Messaging (FCM) Setup ---


// --- START: PWA Caching and Offline Strategy (your original content) ---

// Your cache name
const CACHE_NAME = "v1"; // Extracted from your provided service-worker.js

// Installation event: Caches the app shell as defined by your previous service worker
self.addEventListener("install", event => {
  console.log('[Service Worker] Installing - Caching PWA assets...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "/coffee-pwa/",
        "/coffee-pwa/index.html",
        "/coffee-pwa/icon-192.png",
        "/coffee-pwa/icon-512.png",
        "/coffee-pwa/manifest.json"
      ]);
    }).catch(err => {
      console.error("[Service Worker] Error during cache.addAll:", err);
    })
  );
});

// Fetch event: Serves cached content first, then fetches from network
self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request); // Serve from cache, or fetch from network
    })
  );
});

// --- END: PWA Caching and Offline Strategy ---
