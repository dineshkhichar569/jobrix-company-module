// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeWa5Si5UB5L6DU44fAsda-p-ui_sy9SM",
  authDomain: "jobrix-9a7ac.firebaseapp.com",
  projectId: "jobrix-9a7ac",
  storageBucket: "jobrix-9a7ac.firebasestorage.app",
  messagingSenderId: "668917567232",
  appId: "1:668917567232:web:7191a8ccfe03e25af5ede5",
  measurementId: "G-ECC7GT93XD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
