import React from 'react';
import styles from './UserReports.module.css';

const prijave = [
  {
    id: 'PR001',
    prijavljen: 'marko_hunt',
    prijavio: 'lazar99',
    razlog: 'Neprimjeren govor u komentaru',
    datum: '2025-07-10',
    status: 'Na čekanju',
  },
  // Dodaj više prijava po potrebi
];

const UserReports = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Prijave korisnika</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID prijave</th>
            <th>Prijavljen korisnik</th>
            <th>Prijavio</th>
            <th>Razlog</th>
            <th>Datum</th>
            <th>Status</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {prijave.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.prijavljen}</td>
              <td>{p.prijavio}</td>
              <td>{p.razlog}</td>
              <td>{p.datum}</td>
              <td>{p.status}</td>
              <td className={styles.actions}>
                <form action="/prijava-detalji" method="get">
                  <input type="hidden" name="idPrijave" value={p.id} />
                  <button type="submit" className={styles.btnDetails}>🔍</button>
                </form>
                <form action="/oznaci-kao-obradjeno" method="post">
                  <input type="hidden" name="idPrijave" value={p.id} />
                  <button type="submit" className={styles.btnProcessed}>✅</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserReports;