// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js');

// Configura il progetto Firebase
firebase.initializeApp({
  apiKey: "AIzaSyD...",
  authDomain: "TUO_PROJECT.firebaseapp.com",
  projectId: "TUO_PROJECT",
  storageBucket: "TUO_PROJECT.appspot.com",
  messagingSenderId: "916692141186",
  appId: "1:916692141186:web:xxxxx", // opzionale
  vapidKey: "BKsfATXYKByaWySUsFXW1w17KPeCQhs5-os1aGgPOiCKFPEgwos3ZGT50Z1klOu_kNaKItLwGhOtvbjftzd3VfA"
});

const messaging = firebase.messaging();

// Mostra la notifica quando arriva un push
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Messaggio in background:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
