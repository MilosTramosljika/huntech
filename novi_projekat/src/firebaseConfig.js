// src/firebaseConfig.js

// Importuj potrebne funkcije iz Firebase SDK-a
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Za Firebase Authentication
import { getDatabase } from "firebase/database"; // Za Realtime Database, pošto će nam trebati za korisničke profile

// Tvoja Firebase konfiguracija
// NAPOMENA: Ovi podaci su sigurni za izlaganje u klijentskom kodu (React aplikaciji).
// Nisu tajni jer se koriste samo za identifikaciju tvog projekta i slanje zahteva.
const firebaseConfig = {
  apiKey: "TVOJ_API_KEY", // Tvoj specifični API ključ
  authDomain: "huntech-b9a32.firebaseapp.com", // Ovo je tvoj Auth Domain
  projectId: "huntech-b9a32", // Tvoj Project ID: huntech-b9a32
  storageBucket: "huntech-b9a32.appspot.com", // Tvoj Storage Bucket
  messagingSenderId: "323330172777", // Tvoj Project Number: 323330172777
  appId: "TVOJ_APP_ID", // Tvoj specifični App ID za web aplikaciju
  databaseURL:
    "https://huntech-b9a32-default-rtdb.europe-west1.firebasedatabase.app", // Tvoja Realtime Database URL
};

// Inicijalizuj Firebase aplikaciju
const app = initializeApp(firebaseConfig);

// Inicijalizuj Firebase servise koje ćeš koristiti
// I eksportuj ih da bi ih mogao koristiti u drugim delovima svoje aplikacije
export const auth = getAuth(app); // Autentifikacija
export const database = getDatabase(app); // Realtime Database

// Možeš eksportovati `app` ako ti zatreba u nekim naprednijim scenarijima
export default app;
