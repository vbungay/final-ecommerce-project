// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2m29E61rxbfzk_GeZDms9R3ap5SnwGNM",
  authDomain: "ecommerce-project-fdccf.firebaseapp.com",
  databaseURL: "https://ecommerce-project-fdccf-default-rtdb.firebaseio.com",
  projectId: "ecommerce-project-fdccf",
  storageBucket: "ecommerce-project-fdccf.appspot.com",
  messagingSenderId: "384338920619",
  appId: "1:384338920619:web:d48b83c3c0fc6b2006e3ee"
};

// Initialize Firebase
const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };