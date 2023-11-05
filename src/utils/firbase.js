// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCgCnI6aEBqMiqus95cjr75BYW930REoCQ',
  authDomain: 'mac-blogs.firebaseapp.com',
  projectId: 'mac-blogs',
  storageBucket: 'mac-blogs.appspot.com',
  messagingSenderId: '92251596807',
  appId: '1:92251596807:web:6da786a3d858d2e81aa2a2',
  measurementId: 'G-GTDW32DNBF'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
