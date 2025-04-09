import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCsFvg2fInLYhtqkQ2dm1nRGiwr7LKuaWU",
    authDomain: "crud-e3174.firebaseapp.com",
    projectId: "crud-e3174",
    storageBucket: "crud-e3174.firebasestorage.app",
    messagingSenderId: "636416382104",
    appId: "1:636416382104:web:a20da21e3ed29c6e806ced",
    measurementId: "G-QETFD7Y24T"
  };
// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  export { db };