import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Stranica nije pronađena</h1>
      <p>Tražena stranica ne postoji ili je uklonjena</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/" className="btn primary">
          Vrati se na početnu
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
