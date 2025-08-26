// ./pages/Korisnik/Admin/UserReports.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserReports.module.css";

const INITIAL_REPORTS = [
  {
    id: "PR001",
    prijavljen: "marko_hunt",
    prijavio: "lazar99",
    razlog: "Neprimjeren govor u komentaru",
    datum: "2025-07-10",
    status: "Na čekanju",
  },
  {
    id: "PR002",
    prijavljen: "jovan_lovac",
    prijavio: "petar_hunt",
    razlog: "Lažne informacije",
    datum: "2025-07-15",
    status: "Na čekanju",
  },
];

export default function UserReports() {
  const navigate = useNavigate();
  const [prijave, setPrijave] = useState(INITIAL_REPORTS);

  const handleDetails = (id) => {
    navigate(`/prijava-detalji/${id}`);
  };

  const handleProcessed = (id) => {
    setPrijave((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Obrađeno" } : p))
    );
  };

  if (!prijave.length) {
    return (
      <div className={styles.container}>
        <h2 className={styles.heading}>Prijave korisnika</h2>
        <p className={styles.empty}>Nema prijava 🎉</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Prijave korisnika</h2>

      <div className={styles.list}>
        {prijave.map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.row}>
              <span className={styles.label}>ID:</span>
              <span>{p.id}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Prijavljen:</span>
              <span>{p.prijavljen}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Prijavio:</span>
              <span>{p.prijavio}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Razlog:</span>
              <span>{p.razlog}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Datum:</span>
              <span>{new Date(p.datum).toLocaleDateString()}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Status:</span>
              <span
                className={`${styles.badge} ${
                  p.status === "Na čekanju" ? styles.pending : styles.done
                }`}
              >
                {p.status}
              </span>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.btnDetails}
                onClick={() => handleDetails(p.id)}
              >
                🔍 Detalji
              </button>
              <button
                type="button"
                className={styles.btnProcessed}
                onClick={() => handleProcessed(p.id)}
                disabled={p.status === "Obrađeno"}
              >
                ✅ Obradi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
