import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    korisnickoIme: '',
    lozinka: '',
    potvrdaLozinke: '',
    ime: '',
    prezime: '',
    datumRodjenja: '',
    pol: 'Muški',
    email: '',
    telefon: '',
    status: 'Početnik',
    bio: '',
    lovackiPsi: '',
    arsenal: '',
    dokumenti: null,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.lozinka !== formData.potvrdaLozinke) {
      setError('Lozinka i potvrda se ne poklapaju.');
      return;
    }

    try {
      // Simulacija slanja podataka
      console.log('Slanje podataka:', formData);
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Došlo je do greške prilikom slanja.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Zahtjev za registraciju</h2>

      {success && <div className={styles.success}>✅ Zahtjev je uspješno poslat!</div>}
      {error && <div className={styles.error}>⚠️ {error}</div>}

      <label>Korisničko ime:</label>
      <input type="text" name="korisnickoIme" required onChange={handleChange} />

      <label>Lozinka:</label>
      <input type="password" name="lozinka" required onChange={handleChange} />

      <label>Potvrdi lozinku:</label>
      <input type="password" name="potvrdaLozinke" required onChange={handleChange} />

      <label>Ime:</label>
      <input type="text" name="ime" required onChange={handleChange} />

      <label>Prezime:</label>
      <input type="text" name="prezime" required onChange={handleChange} />

      <label>Datum rođenja:</label>
      <input type="date" name="datumRodjenja" required onChange={handleChange} />

      <label>Pol:</label>
      <select name="pol" onChange={handleChange}>
        <option>Muški</option>
        <option>Ženski</option>
        <option>Drugo</option>
      </select>

      <label>Email:</label>
      <input type="email" name="email" required onChange={handleChange} />

      <label>Telefon:</label>
      <input type="tel" name="telefon" onChange={handleChange} />

      <label>Status korisnika:</label>
      <select name="status" onChange={handleChange}>
        <option>Početnik</option>
        <option>Aktivan lovac</option>
        <option>Veteran</option>
        <option>Neaktivan</option>
      </select>

      <label>Kratke informacije o sebi:</label>
      <textarea
        name="bio"
        rows="4"
        placeholder="Napišite nešto o svom lovačkom iskustvu..."
        required
        onChange={handleChange}
      />

      <label>Lovački psi (ime i rasa – opciono):</label>
      <textarea
        name="lovackiPsi"
        rows="3"
        placeholder="Ajk – ptičar, Bela – gonič"
        onChange={handleChange}
      />

      <label>Arsenal oružja (razdvoj oružja zarezima – opciono):</label>
      <input
        type="text"
        name="arsenal"
        placeholder="Karabin .308, Puška 30-06"
        onChange={handleChange}
      />

      <label>Priloži dokumentaciju (PDF, slika, potvrda...):</label>
      <input
        type="file"
        name="dokumenti"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        required
        onChange={handleChange}
      />

      <button type="submit" className={styles.submitBtn}>Pošalji zahtjev</button>
    </form>
  );
};

export default RegistrationForm;