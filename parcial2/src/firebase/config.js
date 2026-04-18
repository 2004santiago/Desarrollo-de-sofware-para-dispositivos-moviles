// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJwdY7Ggjo2Ymh-dtGp2ZYzpJOMdUxXpw",
  authDomain: "challenge-5-630b7.firebaseapp.com",
  databaseURL: "https://challenge-5-630b7-default-rtdb.firebaseio.com",
  projectId: "challenge-5-630b7",
  storageBucket: "challenge-5-630b7.firebasestorage.app",
  messagingSenderId: "986431630274",
  appId: "1:986431630274:web:f51ea769099ef933e3845b",
  measurementId: "G-DQ87SVNREC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);