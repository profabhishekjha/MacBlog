import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "mac-blogs.firebaseapp.com",
  projectId: "mac-blogs",
  storageBucket: "mac-blogs.appspot.com",
  messagingSenderId: "92251596807",
  appId: "1:92251596807:web:6da786a3d858d2e81aa2a2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
