// firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // OVO JE VAŽNO!
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <--- DODAJ OVO!

// Tvoj Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD8KebR7gpP5mzoj77VLAeDM0_eFHLa8cg",
  authDomain: "huntech-b9a32.firebaseapp.com",
  projectId: "huntech-b9a32",
  storageBucket: "huntech-b9a32.appspot.com", // OVDJE JE BILA GREŠKA: `appspot.com`
  messagingSenderId: "323330172777",
  appId: "1:323330172777:web:1ddb873b846f158b4b3ff8",
  measurementId: "G-5F24DGBVE9",
  // DODAJ OVO ZA ISPRAVNU DATABASE URL:
  databaseURL: "https://huntech-b9a32-default-rtdb.europe-west1.firebasedatabase.app"
};

// Inicijalizacija Firebase aplikacije
const app = initializeApp(firebaseConfig);

// Dobavljanje Realtime Database instance
const database = getDatabase(app);

// Dobavljanje Firebase Auth instance <--- DODAJ OVO!
const auth = getAuth(app);

// (opcionalno) Analytics
const analytics = getAnalytics(app);

// Eksport za korištenje u drugim fajlovima
export { database, auth };
