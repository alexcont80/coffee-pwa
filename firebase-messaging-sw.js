// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// TODO: This firebaseConfig should be copied from your Project settings -> General -> Your Web App -> Firebase SDK snippet
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

// Set up background message handler (optional, but recommended for background notifications)
// This is where you define what happens when a message arrives while the app is not in focus.
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Or whatever icon you want
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// If you have other PWA logic from service-worker.js, merge it here.
// For example, caching strategies:
// self.addEventListener('install', (event) => { /* ... */ });
// self.addEventListener('fetch', (event) => { /* ... */ });
