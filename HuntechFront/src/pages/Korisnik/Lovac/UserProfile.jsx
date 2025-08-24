import React, { useEffect, useState } from "react";
import "./UserProfile.module.css";
import { getUserById } from "../../../services/korisnik.service.js";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const id = 3; // Hardkodirano za testiranje
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Greška pri učitavanju korisnika:", err));
  }, [id]);

  if (!user) return <p>Korisnik nije pronađen ili se učitava...</p>;

  return (
    <div className="user-profile">
      <h2>Pregled korisničkog naloga</h2>

      <div>
        <img
          src={"http://localhost:8080/korisniks/uploads/korisnik_3.jpg"}
          alt="Profilna"
          width={150}
          height={150}
        />
        <br />
        <br />
        <Link
          to="/uredjivanjeKorisnika"
          style={{ marginBottom: "20px", display: "inline-block" }}
        >
          <button>Uredi profil</button>
        </Link>
        <label>
          <br />
          Tip korisnika:
        </label>{" "}
        <span>{user.tipKorisnika}</span>
        <br />
        <label>Datum registracije:</label> <span>{user.datumRegistracije}</span>
        <br />
        <label>Korisničko ime:</label> <span>{user.username}</span>
        <br />
        <label>Email:</label> <span>{user.mail}</span>
        <br />
        <label>Ime:</label> <span>{user.ime}</span>
        <br />
        <label>Prezime:</label> <span>{user.prezime}</span>
        <br />
        <label>Datum rođenja:</label> <span>{user.datumRodjenja}</span>
        <br />
        <label>Pol:</label> <span>{user.pol}</span>
        <br />
        <label>Telefon:</label> <span>{user.telefon}</span>
        <br />
        <br />
        <label>Osnovne informacije (Bio):</label>
        <br />
        <p>{user.bio}</p>
      </div>

      <hr />

      <h3>Lovačka udruženja</h3>
      <ul>
        {user.lovackaUdruzenja?.length > 0 ? (
          user.lovackaUdruzenja.map((udruzenje, index) => (
            <li key={index}>{udruzenje}</li>
          ))
        ) : (
          <li>Nema podataka</li>
        )}
      </ul>

      <hr />

      <h3>Lovački psi</h3>
      <ul>
        {user.lovackiPsi?.length > 0 ? (
          user.lovackiPsi.map((pas, index) => <li key={index}>{pas}</li>)
        ) : (
          <li>Nema podataka</li>
        )}
      </ul>

      <hr />

      <h3>Spisak trofeja</h3>
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>Životinja</th>
            <th>Datum ustreljenja</th>
            <th>Oružje</th>
          </tr>
        </thead>
        <tbody>
          {user.trofeji?.length > 0 ? (
            user.trofeji.map((trofej, index) => (
              <tr key={index}>
                <td>{trofej.zivotinja}</td>
                <td>{trofej.datum}</td>
                <td>{trofej.oruzje}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nema podataka</td>
            </tr>
          )}
        </tbody>
      </table>

      <hr />

      <h3>Arsenal oružja</h3>
      <ul>
        {user.oruzja?.length > 0 ? (
          user.oruzja.map((oruzje, index) => <li key={index}>{oruzje}</li>)
        ) : (
          <li>Nema podataka</li>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;
