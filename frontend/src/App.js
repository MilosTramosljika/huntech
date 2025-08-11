// App.js
import React, { useState, useEffect } from "react";
import Chat from "./Chat"; // Važna napomena: Preimenovao sam chat.js u Chat.js (veliko C)
import "./App.css";
import { auth } from "./firebase"; // Uvezi 'auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null); // Stanje za prijavljenog korisnika
  const [loading, setLoading] = useState(true); // Stanje za učitavanje autentikacije
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Slušanje promjena stanja autentikacije
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Postavi korisnika (null ako je odjavljen, User objekt ako je prijavljen)
      setLoading(false); // Prestani s učitavanjem
    });

    // Clean up funkcija: odjavi se od slušanja kada se komponenta unmounta
    return () => unsubscribe();
  }, []);

  // Funkcija za registraciju korisnika s emailom i lozinkom
  const handleSignUp = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged će automatski ažurirati currentUser
    } catch (err) {
      console.error("Greška pri registraciji:", err);
      setError(err.message);
    }
  };

  // Funkcija za prijavu korisnika s emailom i lozinkom
  const handleSignIn = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged će automatski ažurirati currentUser
    } catch (err) {
      console.error("Greška pri prijavi:", err);
      setError(err.message);
    }
  };

  // Funkcija za prijavu s Google računom
  const handleGoogleSignIn = async () => {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Greška pri prijavi Googleom:", err);
      setError(err.message);
    }
  };

  // Funkcija za odjavu
  const handleSignOut = async () => {
    setError("");
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Greška pri odjavi:", err);
      setError(err.message);
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
          <Chat
            username={
              currentUser.displayName || currentUser.email || currentUser.uid
            }
          />
          {/* Prosljeđujemo displayName, email ili UID kao username */}
        </>
      ) : (
        // Ako korisnik nije prijavljen, prikaži formu za prijavu/registraciju
        <div className="auth-form">
          <h2>Prijava / Registracija</h2>
          {error && <p className="error-message">{error}</p>}
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
