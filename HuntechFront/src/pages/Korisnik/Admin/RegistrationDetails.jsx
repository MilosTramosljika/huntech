import React from 'react';
import styles from './RegistrationDetails.module.css';

const RegistrationDetails = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Detalji zahtjeva za registraciju</h2>
      <form action="/admin-registracija-obrada" method="post" className={styles.form}>
        <label htmlFor="idZahtjeva">ID zahtjeva:</label>
        <input type="text" id="idZahtjeva" name="idZahtjeva" value="REG017" readOnly />

        <label htmlFor="ime">Ime:</label>
        <input type="text" id="ime" name="ime" value="Milena" readOnly />

        <label htmlFor="prezime">Prezime:</label>
        <input type="text" id="prezime" name="prezime" value="Stojanović" readOnly />

        <label htmlFor="korisnickoIme">Korisničko ime:</label>
        <input type="text" id="korisnickoIme" name="korisnickoIme" value="milena_hunt" readOnly />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value="milena@example.com" readOnly />

        <label htmlFor="datum">Datum podnošenja:</label>
        <input type="date" id="datum" name="datum" value="2025-07-12" readOnly />

        <label htmlFor="bio">Osnovne informacije (Bio):</label>
        <textarea
          id="bio"
          name="bio"
          rows="4"
          readOnly
          defaultValue="Lovkinja iz Hercegovine, član lokalne sekcije i aktivna u očuvanju planinskih populacija."
        />

        <div className={styles.actions}>
          <input type="submit" name="akcija" value="Odobri" className={styles.btnApprove} />
          <input type="submit" name="akcija" value="Odbij" className={styles.btnReject} />
        </div>
      </form>
    </div>
  );
};

export default RegistrationDetails;