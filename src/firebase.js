// src/service/firebase.js

import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.GATSBY_FIREBASE_APIKEY,
  // authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.GATSBY_FIREBASE_PROJECTID,
  // storageBucket: process.env.GATSBY_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGINGSENDERID,
  // appId: process.env.GATSBY_FIREBASE_APPID,
  // measurementId: process.env.GATSBY_FIREBASE_MEASUREMENTID
  apiKey: "AIzaSyA2zXOBWCH4rFVxOLhjPyS_y3TYfi4WWL0",
  authDomain: "newyearsoup.firebaseapp.com",
  databaseURL: "https://newyearsoup-default-rtdb.firebaseio.com",
  projectId: "newyearsoup",
  storageBucket: "newyearsoup.appspot.com",
  messagingSenderId: "301675976242",
  appId: "1:301675976242:web:54f0839a2d78d415e64e2b",
  measurementId: "G-BBTZTDG874"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);