import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLexBVAHmG8aZVxKsaAXS9mJsonYNPI4E",
  authDomain: "oyimtihon-5c3a5.firebaseapp.com",
  projectId: "oyimtihon-5c3a5",
  storageBucket: "oyimtihon-5c3a5.appspot.com",
  messagingSenderId: "608515663714",
  appId: "1:608515663714:web:7d676b6abd3e6416446e3b",
  measurementId: "G-WY81336X11"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);