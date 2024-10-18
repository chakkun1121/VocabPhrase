"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Todo: 環境変数に移動する
  apiKey: "AIzaSyDcGTRzExjnfosJ0wQDApJVTw9rjX8BKhI",
  authDomain: "vocabphrase.firebaseapp.com",
  databaseURL: "https://vocabphrase-default-rtdb.firebaseio.com",
  projectId: "vocabphrase",
  storageBucket: "vocabphrase.appspot.com",
  messagingSenderId: "910142584435",
  appId: "1:910142584435:web:a4e64e96689cefe4129c06",
  measurementId: "G-MNPB0JEZCF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
