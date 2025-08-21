import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ako koristiš React Router
import styles from "./GuestWelcome.module.css";

const GuestWelcome = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const isRegistered = false; // simulacija — možeš povezati sa backendom

  const handleRegistrationClick = () => {
    if (isRegistered) {
      alert("Već ste registrovani. Prijavite se.");
    } else {
      navigate("/registracija"); // ili window.location.href = '/registracija';
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Dobrodošli u HUNTECH</h2>

      <div className={styles.infoBox}>
        <h3>Informacije o registraciji</h3>
        <p>
          Registracija je dostupna za sve aktivne članove lovačkih udruženja.
          Prijavom stičete mogućnost praćenja sopstvenih trofeja, interakcije sa
          drugim lovcima i pristup administrativnim servisima.
        </p>
        <p>
          Administrator će pregledati vaš zahtjev i obavijestiti vas putem
          emaila kada nalog bude aktiviran.
        </p>
        <button className={styles.modalBtn} onClick={() => setShowModal(true)}>
          Više informacija
        </button>
      </div>

      <button
        type="button"
        className={styles.submitBtn}
        onClick={handleRegistrationClick}
      >
        Podnesi zahtjev za registraciju
      </button>

      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Kako funkcioniše registracija?</h3>
            <p>
              Popunite formular sa tačnim podacima. Nakon provere od strane
              administratora, dobićete email sa potvrdom aktivacije naloga.
            </p>
            <p>
              Registracija je besplatna i dostupna samo članovima udruženja.
            </p>
            <button
              className={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              Zatvori
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestWelcome;
