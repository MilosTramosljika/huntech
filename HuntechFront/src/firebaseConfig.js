// src/firebaseConfig.js

// Importuj potrebne funkcije iz Firebase SDK-a
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Za Firebase Authentication
import { getDatabase } from "firebase/database"; // Za Realtime Database
import { getAnalytics } from "firebase/analytics"; // Za Google Analytics (jer tvoj config ima measurementId)

// Tvoja STVARNA Firebase konfiguracija za projekat 'huntech-b9a32'
// Ovi podaci su sigurni za izlaganje u klijentskom kodu (React aplikaciji).
const firebaseConfig = {
  apiKey: "AIzaSyD8KebR7gpP5mzoj77VLAeDM0_eFHLa8cg",
  authDomain: "huntech-b9a32.firebaseapp.com",
  databaseURL:
    "https://huntech-b9a32-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "huntech-b9a32",
  storageBucket: "huntech-b9a32.firebasestorage.app",
  messagingSenderId: "323330172777",
  appId: "1:323330172777:web:1ddb873b846f158b4b3ff8",
  measurementId: "G-5F24DGBVE9",
};

// Inicijalizuj Firebase aplikaciju
const app = initializeApp(firebaseConfig);

// Inicijalizuj Firebase servise koje ćeš koristiti
// I eksportuj ih da bi ih mogao koristiti u drugim delovima svoje aplikacije
export const auth = getAuth(app); // Autentifikacija
export const database = getDatabase(app); // Realtime Database
export const analytics = getAnalytics(app); // Google Analytics

// Možeš eksportovati `app` ako ti zatreba u nekim naprednijim scenarijima
export default app;
