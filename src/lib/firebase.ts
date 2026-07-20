// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDvGtP2Bhxir1qWVyzqtBk5_tS12fA0Ps",
  authDomain: "fong-ab522.firebaseapp.com",
  projectId: "fong-ab522",
  storageBucket: "fong-ab522.firebasestorage.app",
  messagingSenderId: "287370467762",
  appId: "1:287370467762:web:3ce5a8716501eda336ecab",
  measurementId: "G-GVDKDN7YPC"
};

// Initialize Firebase (Check if it's already initialized to prevent Next.js hot-reload errors)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (optional, and only works in browser)
// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }
