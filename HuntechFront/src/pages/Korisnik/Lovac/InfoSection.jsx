import React, { useState } from 'react';
import styles from './InfoSection.module.css';

const InfoSection = () => {
  const [kategorija, setKategorija] = useState('');

  const handleChange = (e) => {
    setKategorija(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Odabrana kategorija:', kategorija);
    // TODO: Prikaz sadržaja na osnovu kategorije
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📚 Lov Info Sekcija</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="kategorija">Odaberi kategoriju:</label>
        <select id="kategorija" name="kategorija" required onChange={handleChange}>
          <option value="">-- Izaberi --</option>
          <option value="zakoni">📜 Lovački zakoni i pravilnici</option>
          <option value="oprema">🧢 Prodavnica lovačke opreme</option>
          <option value="recepti">🍲 Lovački recepti</option>
        </select>

        <button type="submit">Prikaži</button>
      </form>
    </div>
  );
};

export default InfoSection;