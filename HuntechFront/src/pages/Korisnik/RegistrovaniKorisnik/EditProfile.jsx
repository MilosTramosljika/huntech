import React, { useState } from "react";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    korisnickoIme: "lazar99",
    email: "lazar99@email.com",
    lozinka: "",
    ime: "Lazar",
    prezime: "Petrović",
    datumRodjenja: "1999-08-15",
    pol: "Muški",
    telefon: "+387 65 123 456",
    status: "Aktivan lovac",
    bio: "Strastveni lovac sa 10 godina iskustva...",
    profilnaSlika: null,
    udruzenja: "LD 'Zelengora', LD 'Romanija'",
    lovackiPsi: "Ajk – ptičar, Bela – gonič",
    arsenal: "Karabin .308, Puska 30-06",
    trofeji:
      "Srndać – 2024-05-03 – Karabin .308\nVuk – 2023-11-18 – Puska 30-06",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Izmjene profila:", formData);
    // TODO: Slanje ka backendu
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Uredi profil</h2>

      <label>Korisničko ime:</label>
      <input
        type="text"
        name="korisnickoIme"
        value={formData.korisnickoIme}
        required
        onChange={handleChange}
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        required
        onChange={handleChange}
      />

      <label>Nova lozinka (opciono):</label>
      <input type="password" name="lozinka" onChange={handleChange} />

      <label>Ime:</label>
      <input
        type="text"
        name="ime"
        value={formData.ime}
        onChange={handleChange}
      />

      <label>Prezime:</label>
      <input
        type="text"
        name="prezime"
        value={formData.prezime}
        onChange={handleChange}
      />

      <label>Datum rođenja:</label>
      <input
        type="date"
        name="datumRodjenja"
        value={formData.datumRodjenja}
        onChange={handleChange}
      />

      <label>Pol:</label>
      <select name="pol" value={formData.pol} onChange={handleChange}>
        <option>Muški</option>
        <option>Ženski</option>
        <option>Drugo</option>
      </select>

      <label>Telefon:</label>
      <input
        type="tel"
        name="telefon"
        value={formData.telefon}
        onChange={handleChange}
      />

      <label>Status korisnika:</label>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Početnik</option>
        <option>Aktivan lovac</option>
        <option>Veteran</option>
        <option>Neaktivan</option>
      </select>

      <label>Kratka biografija:</label>
      <textarea
        name="bio"
        rows="4"
        value={formData.bio}
        onChange={handleChange}
      />

      <label>Promijeni profilnu sliku:</label>
      <input
        type="file"
        name="profilnaSlika"
        accept=".jpg,.jpeg,.png"
        onChange={handleChange}
      />

      <label>Lovacka udruženja (razdvojena zarezom):</label>
      <input
        type="text"
        name="udruzenja"
        value={formData.udruzenja}
        onChange={handleChange}
      />

      <label>Lovački psi (ime – rasa, razdvojeno zarezom):</label>
      <textarea
        name="lovackiPsi"
        rows="2"
        value={formData.lovackiPsi}
        onChange={handleChange}
      />

      <label>Arsenal oružja (razdvojeno zarezom):</label>
      <input
        type="text"
        name="arsenal"
        value={formData.arsenal}
        onChange={handleChange}
      />

      <label>
        Trofeji (format: Životinja – datum – oružje; po jedan po liniji):
      </label>
      <textarea
        name="trofeji"
        rows="4"
        value={formData.trofeji}
        onChange={handleChange}
      />

      <button type="submit" className={styles.submitBtn}>
        Sačuvaj izmjene
      </button>
    </form>
  );
};

export default EditProfile;
