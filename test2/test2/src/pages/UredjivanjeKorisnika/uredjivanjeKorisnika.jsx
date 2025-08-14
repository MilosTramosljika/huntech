import React, { useState, useEffect } from "react";
import * as korisnikService from '../../services/korisnik.service.js';

const UrediProfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/korisniks/singleKorisnik/3")
      .then((res) => {
        if (!res.ok) throw new Error("Greška pri učitavanju korisnika");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);


const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const allowedFields = ["ime", "prezime", "username", "mail", "lozinka", "slika"]; // samo ono što backend očekuje
    const updatedUser = {};

    formData.forEach((value, key) => {
        if (allowedFields.includes(key)) {
            updatedUser[key] = value;
        }
    });

    console.log("Šaljem update:", updatedUser);

    korisnikService.updateUser(user.id, updatedUser)
        .then(() => alert("Podaci su uspješno ažurirani!"))
        .catch((err) => {
            console.error("Greška pri ažuriranju:", err);
            alert("Došlo je do greške pri ažuriranju.");
        });
};

  if (!user) {
    return <div>Učitavanje korisnika...</div>;
  }

  return (
    <>
      <h2>Uredi profil</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="username">Username:</label><br />
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={user.username}
          required
        />
        <br /><br />

        <label htmlFor="mail">Mail:</label><br />
        <input
          type="email"
          id="mail"
          name="mail"
          defaultValue={user.mail}
          required
        />
        <br /><br />

        <label htmlFor="lozinka">Lozinka (opciono):</label><br />
        <input type="password" id="lozinka" name="lozinka" defaultValue={user.lozinka}/>
        <br /><br />

        <label htmlFor="ime">Ime:</label><br />
        <input type="text" id="ime" name="ime" defaultValue={user.ime} />
        <br /><br />

        <label htmlFor="prezime">Prezime:</label><br />
        <input type="text" id="prezime" name="prezime" defaultValue={user.prezime} />
        <br /><br />

        <label htmlFor="datumRodjenja">Datum rođenja:</label><br />
        <input type="date" id="datumRodjenja" name="datumRodjenja" defaultValue="1999-08-15" />
        <br /><br />

        <label htmlFor="pol">Pol:</label><br />
        <select id="pol" name="pol" defaultValue="Muški">
          <option>Muški</option>
          <option>Ženski</option>
          <option>Drugo</option>
        </select>
        <br /><br />

        <label htmlFor="telefon">Telefon:</label><br />
        <input type="tel" id="telefon" name="telefon" defaultValue="+387 65 123 456" />
        <br /><br />

        <label htmlFor="status">Status korisnika:</label><br />
        <select id="status" name="status" defaultValue="Aktivan lovac">
          <option>Aktivan lovac</option>
          <option>Početnik</option>
          <option>Veteran</option>
          <option>Neaktivan</option>
        </select>
        <br /><br />

        <label htmlFor="bio">Kratka biografija:</label><br />
        <textarea
          id="bio"
          name="bio"
          rows={4}
          cols={40}
          defaultValue="Strastveni lovac sa 10 godina iskustva..."
        />
        <br /><br />

        <label htmlFor="slika">Trenutna putanja slike:</label><br />
        <input 
          type="text" 
          id="slika" 
          name="slika" 
          defaultValue={user.slika}
        />
        <br /><br />


        <label htmlFor="udruzenja">Lovacka udruženja (razdvojena zarezom):</label><br />
        <input
          type="text"
          id="udruzenja"
          name="udruzenja"
          defaultValue={`LD 'Zelengora', LD 'Romanija'`}
        />
        <br /><br />

        <label htmlFor="lovackiPsi">Lovački psi (ime – rasa, razdvojeno zarezom):</label><br />
        <textarea
          id="lovackiPsi"
          name="lovackiPsi"
          rows={2}
          cols={40}
          defaultValue="Ajk – ptičar, Bela – gonič"
        />
        <br /><br />

        <label htmlFor="arsenal">Arsenal oružja (razdvojeno zarezom):</label><br />
        <input
          type="text"
          id="arsenal"
          name="arsenal"
          defaultValue="Karabin .308, Puska 30-06"
        />
        <br /><br />

        <label htmlFor="trofeji">
          Trofeji (format: Životinja – datum – oružje; po jedan po liniji):
        </label>
        <br />
        <textarea
          id="trofeji"
          name="trofeji"
          rows={4}
          cols={60}
          defaultValue={`Srndać – 2024-05-03 – Karabin .308
Vuk – 2023-11-18 – Puska 30-06
`}
        />
        <br /><br />

        <input type="submit" value="Sačuvaj izmjene" />
      </form>
    </>
  );
};

export default UrediProfil;
