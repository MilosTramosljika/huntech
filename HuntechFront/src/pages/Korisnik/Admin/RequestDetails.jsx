import React from 'react';
import styles from './RequestDetails.module.css';

const RequestDetails = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Detalji zahtjeva</h2>
      <form action="/admin-komentar" method="post" className={styles.form}>
        <label htmlFor="idZahtjeva">ID zahtjeva:</label>
        <input type="text" id="idZahtjeva" name="idZahtjeva" value="001" readOnly />

        <label htmlFor="korisnik">Korisnik:</label>
        <input type="text" id="korisnik" name="korisnik" value="lazar99" readOnly />

        <label htmlFor="tip">Tip zahtjeva:</label>
        <input type="text" id="tip" name="tip" value="Promjena lozinke" readOnly />

        <label htmlFor="datum">Datum podnošenja:</label>
        <input type="text" id="datum" name="datum" value="2025-07-13" readOnly />

        <label htmlFor="opis">Opis zahtjeva:</label>
        <textarea
          id="opis"
          name="opis"
          rows="4"
          readOnly
          defaultValue="Korisnik traži promjenu lozinke zbog sumnje u kompromitaciju naloga."
        />

        <label htmlFor="adminKomentar">Napomena administratora:</label>
        <textarea
          id="adminKomentar"
          name="adminKomentar"
          rows="4"
          placeholder="Dodaj napomenu..."
        />

        <input type="submit" value="Sačuvaj napomenu" className={styles.submitBtn} />
      </form>
    </div>
  );
};

export default RequestDetails;