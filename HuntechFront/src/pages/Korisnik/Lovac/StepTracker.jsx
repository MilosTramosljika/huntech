import React, { useState } from 'react';
import styles from './StepTracker.module.css';

const StepTracker = () => {
  const [formData, setFormData] = useState({
    datum: '',
    koraka: '',
  });

  const [nedjelja, setNedjelja] = useState([
    { datum: '21.07.2025', koraka: 9812 },
    { datum: '20.07.2025', koraka: 6450 },
    { datum: '19.07.2025', koraka: 10102 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sačuvani podaci:', formData);
    // TODO: slanje ka backendu
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📈 Lovačka aktivnost – Broj pređenih koraka</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Datum:</label>
        <input type="date" name="datum" required onChange={handleChange} />

        <label>Pređeni broj koraka:</label>
        <input
          type="number"
          name="koraka"
          placeholder="npr. 8423"
          required
          onChange={handleChange}
        />

        <button type="submit">Sačuvaj</button>
      </form>

      <hr className={styles.divider} />

      <h3 className={styles.subheading}>📅 Nedjeljni pregled</h3>
      <ul className={styles.list}>
        {nedjelja.map((d, i) => (
          <li key={i}>
            {d.datum} — {d.koraka.toLocaleString()} koraka
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepTracker;