import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCb0ZbLfcPyWP1LPfmrbGFLcqjS0rkPHUU",
  authDomain: "bigsports-a911c.firebaseapp.com",
  projectId: "bigsports-a911c",
  storageBucket: "bigsports-a911c.appspot.com",
  messagingSenderId: "107030355894",
  appId: "1:107030355894:web:df78f046bd88dbb466eb17",
  measurementId: "G-QV0VFRQ0ZJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
