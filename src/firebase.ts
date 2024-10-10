// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAndKSk6KVwwAE3FVX7I0I2lhdw-ecsPkM",
  authDomain: "crm-test-cb1.firebaseapp.com",
  projectId: "crm-test-cb1",
  storageBucket: "crm-test-cb1.appspot.com",
  messagingSenderId: "1002492192042",
  appId: "1:1002492192042:web:706e376786bc7ec561ea53",
  measurementId: "G-9E3NG7YK6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);