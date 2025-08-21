import React from 'react';
import styles from './StatusRequests.module.css';

const zahtjevi = [
  {
    id: 'STAT044',
    korisnik: 'dejan_bos',
    trenutni: 'Standardni',
    zeljeni: 'Administrator',
    datum: '2025-07-11',
    razlog: 'Aktivno učešće u moderaciji i prijavama',
  },
  // Dodaj više zahtjeva po potrebi
];

const StatusRequests = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Zahtjevi za promjenu statusa</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID zahtjeva</th>
            <th>Korisnik</th>
            <th>Trenutni status</th>
            <th>Željeni status</th>
            <th>Datum</th>
            <th>Razlog</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {zahtjevi.map((z) => (
            <tr key={z.id}>
              <td>{z.id}</td>
              <td>{z.korisnik}</td>
              <td>{z.trenutni}</td>
              <td>{z.zeljeni}</td>
              <td>{z.datum}</td>
              <td>{z.razlog}</td>
              <td className={styles.actions}>
                <form action="/odobri-status" method="post">
                  <input type="hidden" name="idZahtjeva" value={z.id} />
                  <button type="submit" className={styles.btnApprove}>✅</button>
                </form>
                <form action="/odbij-status" method="post">
                  <input type="hidden" name="idZahtjeva" value={z.id} />
                  <button type="submit" className={styles.btnReject}>❌</button>
                </form>
                <form action="/detalji-statusa" method="get">
                  <input type="hidden" name="idZahtjeva" value={z.id} />
                  <button type="submit" className={styles.btnDetails}>🔍</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusRequests;