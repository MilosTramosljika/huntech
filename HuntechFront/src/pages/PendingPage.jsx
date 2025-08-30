import React from "react";

function PendingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#e6f7e6",
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
        <h2 style={{ color: "#2e7d32" }}>⌛ Vaš profil čeka verifikaciju</h2>
        <p style={{ color: "#444", marginTop: "15px" }}>
          Molimo sačekajte da administrator potvrdi vaš nalog. Bićete
          obaviješteni putem sistema kada bude gotov.
        </p>
      </div>
    </div>
  );
}

export default PendingPage;
