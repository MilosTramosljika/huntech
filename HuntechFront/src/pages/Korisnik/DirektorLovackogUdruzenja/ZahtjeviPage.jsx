import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GroupManagement.module.css";

const zahtjevi = [
  { korisnik: "vuk_balkan", datum: "20.07.2025" },
  { korisnik: "ivan_hunt", datum: "21.07.2025" },
  { korisnik: "milos_balkan", datum: "24.05.2025" },
  { korisnik: "zdravko_evropa", datum: "21.07.2025" },
];

const ZahtjeviPage = () => {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className={styles.wrapper}>
      <h2>📥 Zahtjevi za učlanjenje</h2>

      <button
        onClick={() => navigate(-1)} // vraća na prethodnu stranicu
        style={{
          background: "#555",
          color: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "12px",
          cursor: "pointer",
        }}
      >
        ← Nazad
      </button>

      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {zahtjevi.map((z, i) => (
          <div key={i} className={styles.zahtjevItem}>
            <strong>{z.korisnik}</strong> — {z.datum}
            <br />
            <button
              onMouseEnter={() => setHoverIndex(i * 2)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{
                background: "#2e7d32",
                color: "white",
                padding: "8px 12px",
                borderRadius: "8px",
                marginRight: "5px",
                border: "none",
                cursor: "pointer",
                transform:
                  hoverIndex === i * 2
                    ? "translateY(-2px) scale(1.02)"
                    : "none",
                transition: "all 0.2s",
              }}
            >
              ✅ Prihvati
            </button>
            <button
              onMouseEnter={() => setHoverIndex(i * 2 + 1)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{
                background: "#c62828",
                color: "white",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transform:
                  hoverIndex === i * 2 + 1
                    ? "translateY(-2px) scale(1.02)"
                    : "none",
                transition: "all 0.2s",
              }}
            >
              ❌ Odbij
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZahtjeviPage;
