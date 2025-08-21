import React from "react";
import styles from "./UserProfile.module.css";

const user = {
  tip: "Standardni korisnik",
  datumRegistracije: "2025-02-28",
  korisnickoIme: "lazar99",
  email: "lazar99@email.com",
  ime: "Lazar",
  prezime: "Petrović",
  datumRodjenja: "1999-08-15",
  pol: "Muški",
  telefon: "+387 65 123 456",
  bio: "Strastveni lovac sa preko 10 godina iskustva. Član više udruženja, voli planinske terene i precizno pucanje.",
  udruzenja: ['LD "Zelengora"', 'LD "Romanija"'],
  psi: [
    "Ajk – Nemački kratkodlaki ptičar",
    "Bela – Posavski gonič",
    "Flek – Engleski seter",
  ],
  trofeji: [
    { zivotinja: "Srndać", datum: "2024-05-03", oruzje: "Karabin .308 Win" },
    { zivotinja: "Vuk", datum: "2023-11-18", oruzje: "Puska 30-06" },
  ],
  oruzje: [
    "Karabin .308 Winchester",
    "Puska 30-06 Springfield",
    "Poluautomatska sačmarica 12mm",
  ],
};

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Pregled korisničkog naloga</h2>

      <div className={styles.basic}>
        <img
          src="profilna.jpg"
          alt="Profilna slika korisnika"
          className={styles.avatar}
        />

        <form action="/uredi-profil" method="get">
          <button type="submit" className={styles.editBtn}>
            Uredi profil
          </button>
        </form>

        <div className={styles.details}>
          <p>
            <strong>Tip korisnika:</strong> {user.tip}
          </p>
          <p>
            <strong>Datum registracije:</strong> {user.datumRegistracije}
          </p>
          <p>
            <strong>Korisničko ime:</strong> {user.korisnickoIme}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Ime:</strong> {user.ime}
          </p>
          <p>
            <strong>Prezime:</strong> {user.prezime}
          </p>
          <p>
            <strong>Datum rođenja:</strong> {user.datumRodjenja}
          </p>
          <p>
            <strong>Pol:</strong> {user.pol}
          </p>
          <p>
            <strong>Telefon:</strong> {user.telefon}
          </p>
        </div>

        <div className={styles.bio}>
          <strong>Osnovne informacije (Bio):</strong>
          <p>{user.bio}</p>
        </div>
      </div>

      <hr className={styles.divider} />

      <h3 className={styles.subheading}>Lovacka udruženja</h3>
      <ul className={styles.list}>
        {user.udruzenja.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>

      <hr className={styles.divider} />

      <h3 className={styles.subheading}>Lovački psi</h3>
      <ul className={styles.list}>
        {user.psi.map((pas, i) => (
          <li key={i}>{pas}</li>
        ))}
      </ul>

      <hr className={styles.divider} />

      <h3 className={styles.subheading}>Spisak trofeja</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Životinja</th>
            <th>Datum ustreljenja</th>
            <th>Oružje</th>
          </tr>
        </thead>
        <tbody>
          {user.trofeji.map((t, i) => (
            <tr key={i}>
              <td>{t.zivotinja}</td>
              <td>{t.datum}</td>
              <td>{t.oruzje}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className={styles.divider} />

      <h3 className={styles.subheading}>Arsenal oružja</h3>
      <ul className={styles.list}>
        {user.oruzje.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
