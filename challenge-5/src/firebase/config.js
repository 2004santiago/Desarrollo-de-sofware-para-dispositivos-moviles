// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJwdY7Ggjo2Ymh-dtGp2ZYzpJOMdUxXpw",
  authDomain: "challenge-5-630b7.firebaseapp.com",
  projectId: "challenge-5-630b7",
  storageBucket: "challenge-5-630b7.firebasestorage.app",
  messagingSenderId: "986431630274",
  appId: "1:986431630274:web:0ad601d4a4e52a91e3845b",
  measurementId: "G-EY1HCEX9LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const analytics = getAnalytics(app);

export { app, auth}