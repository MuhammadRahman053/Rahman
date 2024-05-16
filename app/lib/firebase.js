
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";



const provider = new GoogleAuthProvider(); 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMYLj4NNbDMGqxnKZDD-xVh8cQdPtZzAI",
  authDomain: "proyek-sempro.firebaseapp.com",
  projectId: "proyek-sempro",
  storageBucket: "proyek-sempro.appspot.com",
  messagingSenderId: "1098573826954",
  appId: "1:1098573826954:web:57e3178117776c0a485673"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db,provider, auth};


