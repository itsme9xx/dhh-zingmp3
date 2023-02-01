// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQxwKUngP7mQxoZqiqqwxX3Oyiusk9JXQ",
  authDomain: "dhh-zingmp3.firebaseapp.com",
  projectId: "dhh-zingmp3",
  storageBucket: "dhh-zingmp3.appspot.com",
  messagingSenderId: "813300999071",
  appId: "1:813300999071:web:fda0ad8284b0c3953a93aa",
  measurementId: "G-84M66RMF2J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
