// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQvZej-SH6RgQ7hIgvxO8RP66iu66gnlM",
  authDomain: "alumni-8b352.firebaseapp.com",
  projectId: "alumni-8b352",
  storageBucket: "alumni-8b352.firebasestorage.app",
  messagingSenderId: "854261512420",
  appId: "1:854261512420:web:4c670f9e1397aa77f214f1",
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


export const secondaryAuth = getAuth(
  initializeApp(firebaseConfig, "Secondary")
);

export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();