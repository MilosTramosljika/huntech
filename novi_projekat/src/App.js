// src/App.js
import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Uvezi AuthProvider i useAuth
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

// Komponenta zaštićena autentifikacijom
function Dashboard() {
  const { currentUser, logout } = useAuth(); // Koristi useAuth hook

  if (!currentUser) {
    // Ovo se neće desiti ako je pravilno rutiranje postavljeno,
    // ali je dobra praksa zaštite
    return <p>Morate biti prijavljeni da biste videli ovu stranicu.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Dobrodošao, {currentUser.email}!</h2>
      <p>Tvoj UID je: {currentUser.uid}</p>
      <button
        onClick={logout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Odjavi se
      </button>
    </div>
  );
}

// Glavna App komponenta
function App() {
  const { currentUser, loading } = useAuth(); // Opet useAuth, ali unutar App-a

  if (loading) {
    return (
      <div
        style={{ textAlign: "center", marginTop: "100px", fontSize: "24px" }}
      >
        Učitavanje autentifikacije...
      </div>
    );
  }

  return (
    <div className="App">
      {/* Prikazuj prijavnu formu ako nema prijavljenog korisnika */}
      {!currentUser ? (
        <>
          <LoginForm />
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Nemaš nalog?{" "}
            <a
              href="#"
              onClick={() => {
                /* preusmeri na registraciju */
              }}
            >
              Registruj se ovde
            </a>
            .
          </p>
          <RegistrationForm /> {/* Za testiranje */}
        </>
      ) : (
        // Prikazuj Dashboard ako je korisnik prijavljen
        <Dashboard />
      )}
    </div>
  );
}

// Omotaj App komponentu sa AuthProviderom
function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Root;
