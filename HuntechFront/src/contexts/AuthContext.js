// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Uvezi auth instancu

// Kreiraj Context objekat
const AuthContext = createContext(null);

// Kreiraj custom hook za lakše korišćenje Contexta
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider komponenta koja će omotati tvoju aplikaciju
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Čuva objekat prijavljenog korisnika
  const [loading, setLoading] = useState(true); // Indikator da li je stanje Auth učitano

  useEffect(() => {
    // onAuthStateChanged vraća funkciju za "unsubscribe" (čišćenje listenera)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Postavi prijavljenog korisnika (null ako niko nije prijavljen)
      setLoading(false); // Autentifikaciono stanje je sada učitano
    });

    // Funkcija za čišćenje: pokreće se kada se komponenta unmountuje
    return unsubscribe;
  }, []); // Prazan niz znači da se useEffect pokreće samo jednom pri mountovanju

  // Funkcija za odjavu
  const logout = () => {
    return signOut(auth); // Firebase funkcija za odjavu
  };

  // Vrednosti koje će biti dostupne svim komponentama koje koriste AuthContext
  const value = {
    currentUser,
    loading,
    logout,
  };

  return (
    // Renderuj children komponente tek kada se Auth stanje učita
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
