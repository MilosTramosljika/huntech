// src/components/LoginForm.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Importujemo samo auth ovde

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Korisnik uspešno prijavljen:", user.email, "UID:", user.uid);
      setMessage("Uspešno ste se prijavili!");

      // Ovdje možeš preusmjeriti korisnika na dashboard ili početnu stranicu
      // history.push('/dashboard');
      setEmail("");
      setPassword("");
    } catch (firebaseError) {
      console.error(
        "Greška pri prijavi:",
        firebaseError.code,
        firebaseError.message
      );
      switch (firebaseError.code) {
        case "auth/invalid-email":
          setError("Nevažeća email adresa.");
          break;
        case "auth/user-not-found":
          setError("Korisnik sa ovom email adresom ne postoji.");
          break;
        case "auth/wrong-password":
          setError("Netačna lozinka.");
          break;
        case "auth/too-many-requests":
          setError("Previše neuspešnih pokušaja. Pokušajte ponovo kasnije.");
          break;
        default:
          setError("Došlo je do greške prilikom prijave. Pokušajte ponovo.");
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
      <h2>Prijava Korisnika</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="login-email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="login-password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Lozinka:
          </label>
          <input
            type="password"
            id="login-password"
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
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Prijavi se
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {message && (
        <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
      )}
    </div>
  );
}

export default LoginForm;
