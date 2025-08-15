import React, { useState } from 'react';
import styles from './GroupSection.module.css';

const GroupSection = () => {
  const [direktoriVisible, setDirektoriVisible] = useState(false);

  const clanovi = ['lazar99', 'vuk_balkan', 'milena_hunt'];
  const objave = [
    {
      id: 1,
      naslov: 'Izvještaj odstrjela za septembar',
      sadrzaj: 'U prilogu je PDF dokument: ',
      link: '#',
      tip: 'standardna',
      like: 14,
      dislike: 0,
      komentar: 4,
    },
    {
      id: 2,
      naslov: 'Potvrda dolaska 8.10.2023',
      sadrzaj: 'Planirano okupljanje kod Jekića cera u 6:00. Potvrdite do petka.',
      tip: 'potvrda',
      potvrda: 2,
    },
    {
      id: 3,
      naslov: 'Postavljanje hranilica',
      sadrzaj: 'Danas smo postavili 4 hranilice soli u šumi.',
      tip: 'standardna',
      like: 9,
      dislike: 1,
      komentar: 3,
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Sekcija Jaružani</h2>
      <p>
        Lokacija: Hercegovina <br />
        Aktivna od: 2020 <br />
        Broj članova: 27 <br />
        Fokus: planinsko stanište, divljač i ekološke aktivnosti
      </p>

      <button onClick={() => setDirektoriVisible(true)}>Direktori ⬇️</button>
      {direktoriVisible && (
        <div className={styles.panel}>
          <strong>Direktor lovačkog udruženja:</strong><br />
          Petar Đukić<br /><br />
          <strong>Direktori mjesnih zajednica:</strong><br />
          - Marko Jovanović<br />
          - Ivana Milinković<br />
          <button onClick={() => setDirektoriVisible(false)}>Zatvori</button>
        </div>
      )}

      <h3>Članovi grupe:</h3>
      <ul className={styles.list}>
        {clanovi.map((c, i) => <li key={i}>{c}</li>)}
      </ul>

      <hr className={styles.divider} />

      <h3>Objave:</h3>
      {objave.map((o) => (
        <div key={o.id} className={o.tip === 'potvrda' ? styles.potvrda : styles.objava}>
          <h4>{o.naslov}</h4>
          <p>{o.sadrzaj} {o.link && <a href={o.link}>Izvještaj Odstrela</a>}</p>
          {o.tip === 'standardna' && (
            <div className={styles.akcije}>
              👍 <span>{o.like}</span> &nbsp;
              👎 <span>{o.dislike}</span> &nbsp;
              💬 <span>{o.komentar}</span><br />
              <button>Like</button>
              <button>Dislike</button>
              <button>Komentar</button>
            </div>
          )}
          {o.tip === 'potvrda' && (
            <>
              <button>✅ Dolazim</button>
              <button>❌ Ne dolazim</button>
              <p>Potvrđeno: {o.potvrda} člana</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupSection;