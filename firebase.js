// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6tU87i6yPLVAvou_wHuafTV5AlxMu3ic",
  authDomain: "headstarter-f9954.firebaseapp.com",
  projectId: "headstarter-f9954",
  storageBucket: "headstarter-f9954.appspot.com",
  messagingSenderId: "1040234010462",
  appId: "1:1040234010462:web:dd6b16aee643e796efe1cf",
  measurementId: "G-FGDBFFS3NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};