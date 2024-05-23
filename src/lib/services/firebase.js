import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyAaR5ZBlVQNlaO9CHHUOY1OukNVxEx43Qw",
  authDomain: "proyectodegrado2-6d4b4.firebaseapp.com",
  projectId: "proyectodegrado2-6d4b4",
  storageBucket: "proyectodegrado2-6d4b4.appspot.com",
  messagingSenderId: "278936560275",
  appId: "1:278936560275:web:560caac9e382527336e366"
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;