import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Dobrodošli u Huntech App</h1>

      {currentUser ? (
        <>
          <p>Već ste prijavljeni kao {currentUser.email}</p>
          <div style={{ marginTop: "20px" }}>
            <Link to="/profile" className="btn primary">
              Idi na Moj Profil
            </Link>
          </div>
        </>
      ) : (
        <>
          <p>Molimo prijavite se ili registrujte da biste nastavili</p>
          <div style={{ marginTop: "20px" }}>
            <Link to="/login" className="btn primary">
              Prijavi se
            </Link>
            <Link
              to="/register"
              className="btn secondary"
              style={{ marginLeft: "10px" }}
            >
              Registruj se
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
