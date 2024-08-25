// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuGN08s0OVk497I0u9CvLl1LFVOC_AxjU",
  authDomain: "flixgpt-7cab0.firebaseapp.com",
  projectId: "flixgpt-7cab0",
  storageBucket: "flixgpt-7cab0.appspot.com",
  messagingSenderId: "846680265317",
  appId: "1:846680265317:web:5ca4f3c78f973dba7fac8c",
  measurementId: "G-9QQDTBGHB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

export const auth = getAuth();