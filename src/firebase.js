// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCb0ZbLfcPyWP1LPfmrbGFLcqjS0rkPHUU",
  authDomain: "bigsports-a911c.firebaseapp.com",
  projectId: "bigsports-a911c",
  storageBucket: "bigsports-a911c.appspot.com",
  messagingSenderId: "107030355894",
  appId: "1:107030355894:web:df78f046bd88dbb466eb17",
  measurementId: "G-QV0VFRQ0ZJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Ініціюємо analytics лише коли є підтримка, онлайн і продакшн
let analytics; // може лишитися undefined у деві
if (typeof window !== "undefined") {
  isSupported()
    .then((ok) => {
      if (ok && navigator.onLine && process.env.NODE_ENV === "production") {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // ігноруємо помилки аналітики у деві
    });
}

export { app, auth, db, storage, analytics };

