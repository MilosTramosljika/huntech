import React from "react";

function RejectedPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fdecea",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ color: "#c62828" }}>⛔ Vaš profil je odbijen</h2>
        <p style={{ color: "#444", marginTop: "15px" }}>
          Nažalost, vaš zahtjev nije odobren. Ako mislite da se radi o grešci,
          kontaktirajte podršku.
        </p>
      </div>
    </div>
  );
}

export default RejectedPage;
