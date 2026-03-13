// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPixd2P1U9-o2TjHpBb_j5IraCjgqvNaY",
  authDomain: "campus-quick-maps.firebaseapp.com",
  projectId: "campus-quick-maps",
  storageBucket: "campus-quick-maps.firebasestorage.app",
  messagingSenderId: "523049455746",
  appId: "1:523049455746:web:9443a5491079b744a7a49b",
  measurementId: "G-0QL3R8Y7H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);