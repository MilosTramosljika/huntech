import React from "react";
import styles from "./RoleRequests.module.css";

const zahtjevi = [
  {
    id: "ROLE044",
    korisnik: "dejan_bos",
    trenutna: "Lovac",
    zeljena: "Direktor mjesne zajednice",
    datum: "2025-07-11",
    razlog:
      "Ja sam aktivan član mjesne zajednice i želim doprinositi direktno.",
    fajlUrl: "https://YOUR-SUPABASE-BUCKET.s3.supabase.co/role044.pdf",
  },
  {
    id: "ROLE045",
    korisnik: "ana_markovic",
    trenutna: "Lovac",
    zeljena: "Direktor mjesne zajednice",
    datum: "2025-07-12",
    razlog: "Dugogodišnje iskustvo u lovačkoj grupi.",
    fajlUrl: "https://YOUR-SUPABASE-BUCKET.s3.supabase.co/role045.pdf",
  },
  // Dodaj više zahtjeva po potrebi
];

const RoleRequests = () => {
  const handleApprove = (id) => {
    alert(`Odobren zahtjev ${id}`);
    // Ovde ide Supabase ili backend poziv za odobravanje
  };

  const handleReject = (id) => {
    alert(`Odbijen zahtjev ${id}`);
    // Ovde ide Supabase ili backend poziv za odbijanje
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Zahtjevi za promjenu uloge</h2>
      <div className={styles.cardList}>
        {zahtjevi.map((z) => (
          <div key={z.id} className={styles.card}>
            <p>
              <strong>ID:</strong> {z.id}
            </p>
            <p>
              <strong>Korisnik:</strong> {z.korisnik}
            </p>
            <p>
              <strong>Trenutna uloga:</strong> {z.trenutna}
            </p>
            <p>
              <strong>Željena uloga:</strong> {z.zeljena}
            </p>
            <p>
              <strong>Datum:</strong> {z.datum}
            </p>
            <p>
              <strong>Razlog:</strong> {z.razlog}
            </p>
            {z.fajlUrl && (
              <p>
                <strong>Priloženi fajl:</strong>{" "}
                <a href={z.fajlUrl} target="_blank" rel="noopener noreferrer">
                  Otvori fajl
                </a>
              </p>
            )}
            <div className={styles.actions}>
              <button
                className={styles.btnApprove}
                onClick={() => handleApprove(z.id)}
              >
                ✅
              </button>
              <button
                className={styles.btnReject}
                onClick={() => handleReject(z.id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleRequests;
