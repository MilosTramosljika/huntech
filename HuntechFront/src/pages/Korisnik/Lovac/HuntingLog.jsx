import React, { useState } from 'react';
import styles from './HuntingLog.module.css';

const HuntingLog = () => {
  const [search, setSearch] = useState({
    datum: '',
    lokacija: '',
    divljac: '',
  });

  const [zapisi, setZapisi] = useState([
    {
      id: '001',
      datum: '2025-07-18',
      lokacija: 'Jaružani kod stare česme',
      divljac: 'Srndać',
      oruzje: 'Karabin .308',
      napomena: 'Primećen u pokretu, odstrijel u šipražju',
    },
    {
      id: '002',
      datum: '2025-07-12',
      lokacija: 'Prilaz Lovna staza',
      divljac: 'Lisica',
      oruzje: 'Puska 30-06',
      napomena: 'Jedna odrasla jedinka',
    },
  ]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Pretraga:', search);
    // TODO: filtriraj iz baze
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Lovački dnevnik</h2>

      {/* Dodaj novi zapis */}
      <div className={styles.newEntry}>
        <form action="/novi-zapis" method="post" encType="multipart/form-data">
          <label>Datum:</label>
          <input type="date" name="datum" required />

          <label>Lokacija:</label>
          <input type="text" name="lokacija" placeholder="Mjestanjska šuma - kod hranilice" required />

          <label>Vrsta divljači:</label>
          <input type="text" name="divljac" placeholder="Srndać, lisica, zec..." required />

          <label>Korišteno oružje:</label>
          <input type="text" name="oruzje" placeholder="Karabin .308, sačmarica 12mm..." required />

          <label>Opis / beleška:</label>
          <textarea name="zabiljeska" rows="4" placeholder="U 5:45 primjećena divljač..." />

          <label>Prilog (slika, sken, GPS...):</label>
          <input type="file" name="prilog" accept=".jpg,.jpeg,.png,.pdf,.docx" />

          <button type="submit">Dodaj zapis</button>
        </form>
      </div>

      {/* Pretraga */}
      <h3 className={styles.subheading}>Pretraži zapise</h3>
      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <label>Datum:</label>
        <input type="date" name="datum" value={search.datum} onChange={handleSearchChange} />

        <label>Lokacija:</label>
        <input type="text" name="lokacija" placeholder="npr. Jaružani, kod česme" value={search.lokacija} onChange={handleSearchChange} />

        <label>Vrsta divljači:</label>
        <select name="divljac" value={search.divljac} onChange={handleSearchChange}>
          <option value="">-- Odaberi --</option>
          <option value="srndac">Srndać</option>
          <option value="lisica">Lisica</option>
          <option value="zec">Zec</option>
          <option value="divlja_sv">Divlja svinja</option>
          <option value="ostalo">Ostalo</option>
        </select>

        <button type="submit">Prikaži rezultate</button>
      </form>

      {/* Prikaz zapisa */}
      <div className={styles.logList}>
        <h3>Zapisi iz prethodnih dana</h3>
        {zapisi.map((z) => (
          <div key={z.id} className={styles.logItem}>
            <strong>📅 {z.datum}</strong> — <em>{z.lokacija}</em><br />
            Divljač: {z.divljac}<br />
            Oružje: {z.oruzje}<br />
            Napomena: {z.napomena}<br />
            <button onClick={() => window.location = `/uredi-zapis/${z.id}`}>✏️ Uredi zapis</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HuntingLog;S