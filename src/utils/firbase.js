// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "nextblog-fa810.firebaseapp.com",
  projectId: "nextblog-fa810",
  storageBucket: "nextblog-fa810.appspot.com",
  messagingSenderId: "395665878402",
  appId: "1:395665878402:web:bd8b3bd90c0d1b74b1f39b",
  measurementId: "G-M6N1FGT96C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
