// App.js
import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import "./App.css";
import { auth, database } from "./firebase"; // Uvezi 'auth' i 'database'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile, // Za postavljanje display name-a pri registraciji
} from "firebase/auth";
import { ref, set } from "firebase/database"; // Uvezi 'ref' i 'set' za Realtime Database

function App() {
  const [currentUser, setCurrentUser] = useState(null); // Stanje za prijavljenog korisnika (Firebase User objekt)
  const [loading, setLoading] = useState(true); // Stanje za učitavanje autentikacije
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); // Stanje za ime koje korisnik želi prikazati
  const [error, setError] = useState(""); // Stanje za poruke o greškama

  // Funkcija za spremanje/ažuriranje korisničkog profila u Realtime Database
  // Ovo osigurava da imamo listu svih korisnika s njihovim UID-om, emailom i display imenom.
  const saveUserProfileToDatabase = async (user) => {
    if (!user || !user.uid) return; // Ako nema korisnika ili UID-a, preskoči

    const userProfileRef = ref(database, `users/${user.uid}`);
    try {
      await set(userProfileRef, {
        uid: user.uid,
        email: user.email || "N/A", // Email je obavezan, ali za Google sign-in možda ne dođe odmah
        displayName: user.displayName || user.email || user.uid, // Koristi displayName, inače email, inače UID
      });
      console.log("Profil korisnika spremljen/ažuriran u Realtime Database.");
    } catch (dbError) {
      console.error("Greška pri spremanju profila u bazu podataka:", dbError);
    }
  };

  // Slušanje promjena stanja autentikacije
  // Ovo je pokretač koji provjerava je li korisnik prijavljen i ažurira state.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user); // Postavi Firebase User objekt (ili null ako je odjavljen)
      if (user) {
        // Ako je korisnik prijavljen, automatski spremi/ažuriraj njegov profil u bazi podataka
        await saveUserProfileToDatabase(user);
      }
      setLoading(false); // Završeno učitavanje, aplikacija je spremna
    });

    // Clean up funkcija: odjavi se od slušanja kada se komponenta unmounta
    return () => unsubscribe();
  }, []); // Prazan array znači da se useEffect pokreće samo jednom pri montaži komponente

  // Funkcija za registraciju korisnika s emailom i lozinkom
  const handleSignUp = async () => {
    setError(""); // Resetiraj prethodne greške
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Ako je korisnik unio display name, postavi ga odmah nakon registracije
      if (displayName) {
        await updateProfile(user, { displayName: displayName });
        // onAuthStateChanged će uhvatiti ovu promjenu i pozvati saveUserProfileToDatabase
      }
    } catch (err) {
      console.error("Greška pri registraciji:", err);
      setError(err.message); // Prikaz greške korisniku
    }
  };

  // Funkcija za prijavu postojećeg korisnika s emailom i lozinkom
  const handleSignIn = async () => {
    setError(""); // Resetiraj prethodne greške
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // saveUserProfileToDatabase će biti pozvan putem onAuthStateChanged
    } catch (err) {
      console.error("Greška pri prijavi:", err);
      setError(err.message); // Prikaz greške korisniku
    }
  };

  // Funkcija za prijavu s Google računom
  const handleGoogleSignIn = async () => {
    setError(""); // Resetiraj prethodne greške
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Google prijava automatski daje displayName i email.
      // saveUserProfileToDatabase će biti pozvan putem onAuthStateChanged.
    } catch (err) {
      console.error("Greška pri prijavi Googleom:", err);
      setError(err.message); // Prikaz greške korisniku
    }
  };

  // Funkcija za odjavu korisnika
  const handleSignOut = async () => {
    setError(""); // Resetiraj prethodne greške
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Greška pri odjavi:", err);
      setError(err.message); // Prikaz greške korisniku
    }
  };

  // Prikazujemo "Učitavanje..." dok se stanje autentikacije ne provjeri
  if (loading) {
    return <div className="app-container">Učitavanje...</div>;
  }

  return (
    <div className="app-container">
      {currentUser ? (
        // Ako je korisnik prijavljen, prikaži chat
        <>
          <div className="auth-header">
            <p>
              Prijavljen kao: {currentUser.displayName || currentUser.email}
            </p>
            <button
              onClick={handleSignOut}
              className="auth-button logout-button"
            >
              Odjava
            </button>
          </div>
          {/* Prosljeđujemo UID kao currentUserId i displayName/email kao currentUserNameForDisplay */}
          <Chat
            currentUserId={currentUser.uid}
            currentUserNameForDisplay={
              currentUser.displayName || currentUser.email
            }
          />
        </>
      ) : (
        // Ako korisnik nije prijavljen, prikaži formu za prijavu/registraciju
        <div className="auth-form">
          <h2>Prijava / Registracija</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Ime za prikaz (Display Name)"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn} className="auth-button">
            Prijavi se
          </button>
          <button onClick={handleSignUp} className="auth-button">
            Registriraj se
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="auth-button google-button"
          >
            Prijavi se s Googleom
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
