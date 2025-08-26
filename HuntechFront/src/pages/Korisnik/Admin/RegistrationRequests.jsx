import React from "react";
import styles from "./RegistrationRequests.module.css";

const zahtjevi = [
  {
    id: "REG017",
    ime: "Milena",
    prezime: "Stojanović",
    korisnickoIme: "milena_hunt",
    email: "milena@example.com",
    datum: "2025-07-12",
    fajlUrl: "https://YOUR-SUPABASE-BUCKET.s3.supabase.co/reg017.pdf", // fajl korisnika
  },
  {
    id: "REG018",
    ime: "Petar",
    prezime: "Jovanović",
    korisnickoIme: "petar_hunt",
    email: "petar@example.com",
    datum: "2025-07-13",
    fajlUrl: "https://YOUR-SUPABASE-BUCKET.s3.supabase.co/reg018.pdf",
  },
  // Dodaj više zahtjeva po potrebi
];

const RegistrationRequests = () => {
  const handleApprove = (id) => {
    alert(`Odobren zahtjev ${id}`);
    // ovde ide backend ili Supabase poziv
  };

  const handleReject = (id) => {
    alert(`Odbijen zahtjev ${id}`);
    // ovde ide backend ili Supabase poziv
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Zahtjevi za registraciju</h2>
      {zahtjevi.length > 0 ? (
        <div className={styles.list}>
          {zahtjevi.map((z) => (
            <div key={z.id} className={styles.card}>
              <div className={styles.row}>
                <span className={styles.label}>ID zahtjeva:</span>
                <span className={styles.value}>{z.id}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Ime:</span>
                <span className={styles.value}>{z.ime}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Prezime:</span>
                <span className={styles.value}>{z.prezime}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Korisničko ime:</span>
                <span className={styles.value}>{z.korisnickoIme}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{z.email}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Datum:</span>
                <span className={styles.value}>{z.datum}</span>
              </div>
              {z.fajlUrl && (
                <div className={styles.row}>
                  <span className={styles.label}>Priloženi fajl:</span>
                  <span className={styles.value}>
                    <a
                      href={z.fajlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Otvori fajl
                    </a>
                  </span>
                </div>
              )}

              <div className={styles.actions}>
                <button
                  className={styles.btnApprove}
                  onClick={() => handleApprove(z.id)}
                >
                  ✅ Odobri
                </button>
                <button
                  className={styles.btnReject}
                  onClick={() => handleReject(z.id)}
                >
                  ❌ Odbij
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Nema zahtjeva za prikaz</p>
      )}
    </div>
  );
};

export default RegistrationRequests;
