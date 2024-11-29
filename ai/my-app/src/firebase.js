// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-5DkWDP4Gm_eoZJyNiqHjmPxnv9mAN-s",
  authDomain: "login-8e774.firebaseapp.com",
  projectId: "login-8e774",
  storageBucket: "login-8e774.firebasestorage.app",
  messagingSenderId: "1038627556230",
  appId: "1:1038627556230:web:7d7975957bb6d66c473a07",
  measurementId: "G-F7XFTD1N2Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional, if you're using Firebase Analytics)
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth(app);

// Export Auth, GoogleAuthProvider, and other useful Firebase features
export { auth, GoogleAuthProvider, signInWithPopup, signOut };
