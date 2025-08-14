// public/firebase-messaging-sw.js
// Mora biti u 'public' folderu za Create React App
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Tvoja Firebase konfiguracija (mora biti ista kao u firebaseConfig.js)
const firebaseConfig = {
  apiKey: "TVOJ_API_KEY",
  authDomain: "huntech-b9a32.firebaseapp.com",
  projectId: "huntech-b9a32",
  storageBucket: "huntech-b9a32.appspot.com",
  messagingSenderId: "TVOJ_SENDER_ID",
  appId: "TVOJ_APP_ID",
  databaseURL:
    "https://huntech-b9a32-default-rtdb.europe-west1.firebasedatabase.app",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Slušaj dolazne poruke dok je aplikacija u pozadini/nije aktivna
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Primljena pozadinska poruka ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Možeš staviti ikonicu svoje aplikacije
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
