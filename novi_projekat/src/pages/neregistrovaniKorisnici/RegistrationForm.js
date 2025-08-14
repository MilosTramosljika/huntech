// src/components/RegistrationForm.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebaseConfig"; // Importujemo i database za spremanje profila
import { ref, set } from "firebase/database"; // Funkcije za rad sa Realtime Database

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault(); // Sprečava podrazumevano ponašanje forme (reload stranice)
    setError(null); // Očisti prethodne greške
    setMessage(null); // Očisti prethodne poruke

    try {
      // 1. Registracija korisnika putem Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; // Objekat korisnika koji je upravo registrovan

      console.log(
        "Korisnik uspešno registrovan:",
        user.email,
        "UID:",
        user.uid
      );
      setMessage("Korisnik uspešno registrovan!");

      // 2. Skladištenje dodatnih korisničkih podataka u Realtime Database
      // Koristimo user.uid kao ključ za korisnički profil u bazi
      await set(ref(database, "users/" + user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(), // Datum registracije
        // Ovde možeš dodati bilo koje druge podatke koje želiš za profil
        // npr. ime, prezime, rola, itd.
        ime: "",
        prezime: "",
      });
      console.log("Korisnički profil uspešno sačuvan u Realtime Database.");
      setMessage((prev) => prev + "\nProfil sačuvan.");

      // Ovdje možeš preusmjeriti korisnika na neku drugu stranicu (npr. dashboard)
      // history.push('/dashboard'); // ako koristiš React Router
      setEmail("");
      setPassword("");
    } catch (firebaseError) {
      // Uhvati greške specifične za Firebase Authentication
      console.error(
        "Greška pri registraciji:",
        firebaseError.code,
        firebaseError.message
      );
      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          setError("Email adresa je već registrovana.");
          break;
        case "auth/invalid-email":
          setError("Nevažeća email adresa.");
          break;
        case "auth/weak-password":
          setError("Lozinka je preslaba (min. 6 karaktera).");
          break;
        default:
          setError(
            "Došlo je do greške prilikom registracije. Pokušajte ponovo."
          );
          break;
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Registracija Korisnika</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Lozinka:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Registruj se
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {message && (
        <p
          style={{ color: "green", marginTop: "10px", whiteSpace: "pre-line" }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default RegistrationForm;
