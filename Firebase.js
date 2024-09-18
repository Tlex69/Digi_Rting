// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsz27BF2yaEfSqyWbXk6ZuyxztHDzYiBA",
  authDomain: "digirating-d59e4.firebaseapp.com",
  projectId: "digirating-d59e4",
  storageBucket: "digirating-d59e4.appspot.com",
  messagingSenderId: "739825852220",
  appId: "1:739825852220:web:28304727700a4dca9e4839"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);