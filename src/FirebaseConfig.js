
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "wrt-portal.firebaseapp.com",
  databaseURL: "https://wrt-portal-default-rtdb.firebaseio.com",
  projectId: "wrt-portal",
  storageBucket: "wrt-portal.appspot.com",
  messagingSenderId: "819752148348",
  appId: "1:819752148348:web:8fdaada3029d8e2e6558f9",
  measurementId: "G-FMHRND3WW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
