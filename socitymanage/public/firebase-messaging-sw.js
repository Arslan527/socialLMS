// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js"); // Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyDSiTndybnoOKfRndHFeohxyiboTlNVE0M",
  authDomain: "gcu-society-hub.firebaseapp.com",
  projectId: "gcu-society-hub",
  storageBucket: "gcu-society-hub.appspot.com",
  messagingSenderId: "361088109534",
  appId: "1:361088109534:web:2706c73a3fc8df3dae2b4f",
  measurementId: "G-3R4K70KFDG"
};

firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
