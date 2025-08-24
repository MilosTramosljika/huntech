import React from "react";
import styles from "./LocationActivity.module.css";

const slike = [
  {
    src: "/kamere/jaruzani/IMG_2025-07-18-04-43.jpg",
    vreme: "18.07.2025 u 04:43",
    opis: "🦌 Srndać (pretpostavka)",
  },
  // Dodaj više slika dinamički
];

const LocationActivity = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        📷 Aktivnost na lokaciji: "Jaružani - Česma"
      </h2>

      <div className={styles.gallery}>
        {slike.map((slika, i) => (
          <div key={i} className={styles.card}>
            <img src={slika.src} alt={`Zapis ${i + 1}`} />
            <p>{`🕒 ${slika.vreme}`}</p>
            <p>{slika.opis}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationActivity;
