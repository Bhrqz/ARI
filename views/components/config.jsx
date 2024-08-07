// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnwoWgkF6d98cUDhbrRUwYq32uAXbSiX4",
  authDomain: "arig-4cbef.firebaseapp.com",
  projectId: "arig-4cbef",
  storageBucket: "arig-4cbef.appspot.com",
  messagingSenderId: "915549375802",
  appId: "1:915549375802:web:b27b050aa4051b5ebbd403",
  measurementId: "G-GYB68HVQSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//Initializa firestore

export const db = getFirestore(app)