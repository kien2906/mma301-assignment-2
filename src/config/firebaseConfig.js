// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnGW1h6G_dtAV5OrLWrh-ASHNZmdRKMsI",
  authDomain: "mma301-assignment2.firebaseapp.com",
  projectId: "mma301-assignment2",
  storageBucket: "mma301-assignment2.firebasestorage.app",
  messagingSenderId: "516311838254",
  appId: "1:516311838254:web:f130f94418c58c114df9bf",
  measurementId: "G-1KY917KYHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
