// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD7kHmDVUjVmITYzMzBSNK8ZoglH2MDi0Y",
  authDomain: "pokemon-80c7d.firebaseapp.com",
  projectId: "pokemon-80c7d",
  storageBucket: "pokemon-80c7d.firebasestorage.app",
  messagingSenderId: "864515457380",
  appId: "1:864515457380:web:2f62437a90b0af0f2cba71",
  measurementId: "G-MM3V85NZMX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, app };
