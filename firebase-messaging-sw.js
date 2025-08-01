// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBAGBm881emvR65_mpLP9POByLHKc7lV7s",
  authDomain: "coffeepwa.firebaseapp.com",
  projectId: "coffeepwa",
  storageBucket: "coffeepwa.firebasestorage.app",
  messagingSenderId: "916692141186",
  appId: "1:916692141186:web:14b47c70e7bab12f40a09b",
  measurementId: "G-YMQGDGZ2TV"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Messaggio ricevuto in background:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/coffee-pwa/icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
