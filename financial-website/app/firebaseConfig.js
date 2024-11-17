// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import Auth and Google Provider
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYIOefqkc7Msu-ur6DQBauzWq3fwEE79g",
  authDomain: "financial-website-75012.firebaseapp.com",
  projectId: "financial-website-75012",
  storageBucket: "financial-website-75012.appspot.com", // Correct storage bucket domain
  messagingSenderId: "304854373198",
  appId: "1:304854373198:web:dd8975aa761e267326c41f",
  measurementId: "G-P0V0CE8TSD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app); // Export Analytics for use (if needed)
export const auth = getAuth(app); // Initialize and export Auth
export const googleProvider = new GoogleAuthProvider(); // Google Auth Provider
export const db = getFirestore(app); // Initialize and export Firestore
