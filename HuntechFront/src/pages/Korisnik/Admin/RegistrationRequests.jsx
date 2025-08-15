import React from 'react';
import styles from './RegistrationRequests.module.css';

const zahtjevi = [
  {
    id: 'REG017',
    ime: 'Milena',
    prezime: 'Stojanović',
    korisnickoIme: 'milena_hunt',
    email: 'milena@example.com',
    datum: '2025-07-12',
  },
  // Dodaj više zahtjeva po potrebi
];

const RegistrationRequests = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Zahtjevi za registraciju</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID zahtjeva</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Korisničko ime</th>
            <th>Email</th>
            <th>Datum podnošenja</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {zahtjevi.map((z) => (
            <tr key={z.id}>
              <td>{z.id}</td>
              <td>{z.ime}</td>
              <td>{z.prezime}</td>
              <td>{z.korisnickoIme}</td>
              <td>{z.email}</td>
              <td>{z.datum}</td>
              <td className={styles.actions}>
                <form action="/odobri-registraciju" method="post">
                  <input type="hidden" name="idZahtjeva" value={z.id} />
                  <button type="submit" className={styles.btnApprove}>
                    ✅
                  </button>
                </form>
                <form action="/odbij-registraciju" method="post">
                  <input type="hidden" name="idZahtjeva" value={z.id} />
                  <button type="submit" className={styles.btnReject}>
                    ❌
                  </button>
                </form>
                <form action="/detalji-registracije" method="get">
                  <input type="hidden" name="idZahtjeva" value={z.id} />
                  <button type="submit" className={styles.btnDetails}>
                    🔍
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationRequests;