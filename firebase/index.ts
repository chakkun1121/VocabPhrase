// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVSGGk5mSMlcHz8q4E5TyBnUSoqljiYTo",
  authDomain: "vocabphrase.firebaseapp.com",
  projectId: "vocabphrase",
  storageBucket: "vocabphrase.appspot.com",
  messagingSenderId: "910142584435",
  appId: "1:910142584435:web:a4e64e96689cefe4129c06",
  measurementId: "G-MNPB0JEZCF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
