
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj7qkr-RW4RrzZy4WHNEd9Ps0g4ovZRwk",
  authDomain: "ukrainianfootball-4a1fb.firebaseapp.com",
  projectId: "ukrainianfootball-4a1fb",
  storageBucket: "ukrainianfootball-4a1fb.appspot.com",
  messagingSenderId: "662439826757",
  appId: "1:662439826757:web:1400a85bbcbf20370e1a2c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

