import React from 'react';
import styles from './GroupManagement.module.css';

const GroupManagement = () => {
  const zahtjevi = [
    { korisnik: 'vuk_balkan', datum: '20.07.2025' },
    { korisnik: 'ivan_hunt', datum: '21.07.2025' },
  ];

  const mape = [
    {
      id: '001',
      naziv: 'Jaružani - Greben',
      datum: '10.07.2025',
      zona: 'Planinski greben',
      poi: 4,
    },
    {
      id: '002',
      naziv: 'Potok - Donji teren',
      datum: '15.07.2025',
      zona: 'Šumarak',
      poi: 2,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>🔧 Upravljanje grupom: Sekcija Jaružani</h2>

      {/* Novi događaj */}
      <section className={styles.panel}>
        <h3>🗓️ Novi događaj</h3>
        <form action="/nova-objava" method="post">
          <input type="text" name="naslov" placeholder="Naslov događaja/objave" required />
          <textarea name="sadrzaj" rows="4" placeholder="Opis aktivnosti, vrijeme, mjesto..." required />
          <input type="date" name="datum" required />
          <button type="submit">📢 Objavi</button>
        </form>
      </section>

      {/* Nova objava */}
      <section className={styles.panel}>
        <h3>🗓️ Nova objava</h3>
        <form action="/nova-objava" method="post">
          <input type="text" name="naslov" placeholder="Naslov događaja/objave" required />
          <textarea name="sadrzaj" rows="4" placeholder="Opis aktivnosti, vrijeme, mjesto..." required />
          <input type="date" name="datum" required />
          <button type="submit">📢 Objavi</button>
        </form>
      </section>

      {/* Zahtjevi za učlanjenje */}
      <section className={styles.panel}>
        <h3>📥 Zahtjevi za učlanjenje</h3>
        <ul className={styles.list}>
          {zahtjevi.map((z, i) => (
            <li key={i}>
              <strong>{z.korisnik}</strong> — poslao zahtjev {z.datum}<br />
              <button>✅ Prihvati</button>
              <button>❌ Odbij</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Poziv za učlanjenje */}
      <section className={styles.panel}>
        <h3>📤 Pozovi člana</h3>
        <form action="/posalji-poziv" method="post">
          <input type="email" name="emailPozvanog" placeholder="Unesi email korisnika" required />
          <textarea name="poruka" rows="2" placeholder="Dodaj poruku (opcionalno)" />
          <button type="submit">📨 Pošalji poziv</button>
        </form>
      </section>

      {/* Moje lovačke mape */}
      <section className={styles.panel}>
        <h3>🗺️ Moje lovačke mape</h3>
        <ul className={styles.list}>
          {mape.map((m) => (
            <li key={m.id}>
              <strong>{m.naziv}</strong><br />
              Kreirano: {m.datum}<br />
              Zona: {m.zona}, POI: {m.poi} tačke<br />
              <button onClick={() => window.location.href = `/uredi-mapu/${m.id}`}>✏️ Uredi</button>
              <button onClick={() => console.log(`Obriši mapu ${m.id}`)}>🗑️ Obriši</button>
            </li>
          ))}
        </ul>
        <button onClick={() => window.location.href = '/nova-mapa'}>➕ Kreiraj novu mapu</button>
      </section>

      {/* Lovne zone */}
      <section className={styles.panel}>
        <h3>🗺️ Lovne zone i POI</h3>
        <p>Zona: <em>Jaružani – planinski greben</em></p>
        <button onClick={() => window.location.href = '/zona-uredi/001'}>⚙️ Uredi zonu</button>
        <button onClick={() => window.location.href = '/dodaj-tacku-interesa'}>📍 Dodaj POI</button>
      </section>
    </div>
  );
};

export default GroupManagement;