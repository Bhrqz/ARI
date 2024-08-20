import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";

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

/**
export const auth = initializeAuth(db, {
  persistence: getReactNativePersistence(AsyncStorage)
});
  */