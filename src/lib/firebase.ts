// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "hercycle-7arfa",
  appId: "1:652126255730:web:23221e31d4a66446d620eb",
  storageBucket: "hercycle-7arfa.firebasestorage.app",
  apiKey: "AIzaSyDJgF_LTpqyO85gRAy-BlkF7zUuOksVK9U",
  authDomain: "hercycle-7arfa.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "652126255730"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
