import {initializeApp} from "firebase/app";
import {getMessaging, onMessage} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDSiTndybnoOKfRndHFeohxyiboTlNVE0M",
  authDomain: "gcu-society-hub.firebaseapp.com",
  projectId: "gcu-society-hub",
  storageBucket: "gcu-society-hub.appspot.com",
  messagingSenderId: "361088109534",
  appId: "1:361088109534:web:2706c73a3fc8df3dae2b4f",
  measurementId: "G-3R4K70KFDG"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
