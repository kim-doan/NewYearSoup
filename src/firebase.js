// src/service/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2zXOBWCH4rFVxOLhjPyS_y3TYfi4WWL0",
  authDomain: "newyearsoup.firebaseapp.com",
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