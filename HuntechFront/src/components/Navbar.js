// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Pozovi funkciju za odjavu iz AuthContexta
      navigate("/login"); // Preusmeri korisnika na stranicu za prijavu nakon odjave
    } catch (error) {
      console.error("Greška pri odjavi:", error);
      alert("Greška pri odjavi. Pokušajte ponovo.");
    }
  };

  return (
    <nav
      style={{
        background: "#333",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          Huntech App
        </Link>

        {currentUser && (
          <Link
            to="/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            Dashboard
          </Link>
        )}

        {currentUser && (
          <Link
            to="/profile"
            style={{ color: "white", textDecoration: "none" }}
          >
            Moj Profil
          </Link>
        )}
      </div>

      <div>
        {currentUser ? (
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "1px solid white",
              color: "white",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Odjavi se ({currentUser.email})
          </button>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Prijavi se
            </Link>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              Registruj se
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
