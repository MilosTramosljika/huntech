import React, { useState } from 'react';
import styles from './PasswordChange.module.css';

const PasswordChange = () => {
  const [trenutna, setTrenutna] = useState('');
  const [nova, setNova] = useState('');
  const [potvrda, setPotvrda] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nova !== potvrda) {
      alert('Nova lozinka i potvrda se ne poklapaju.');
      return;
    }
    // Poziv ka backendu ide ovde
    console.log('Promjena lozinke:', { trenutna, nova });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Promjena lozinke</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="trenutnaLozinka">Trenutna lozinka:</label>
        <input
          type="password"
          id="trenutnaLozinka"
          name="trenutnaLozinka"
          required
          value={trenutna}
          onChange={(e) => setTrenutna(e.target.value)}
        />

        <label htmlFor="novaLozinka">Nova lozinka:</label>
        <input
          type="password"
          id="novaLozinka"
          name="novaLozinka"
          required
          value={nova}
          onChange={(e) => setNova(e.target.value)}
        />

        <label htmlFor="potvrdiLozinku">Potvrdi novu lozinku:</label>
        <input
          type="password"
          id="potvrdiLozinku"
          name="potvrdiLozinku"
          required
          value={potvrda}
          onChange={(e) => setPotvrda(e.target.value)}
        />

        <button type="submit" className={styles.submitBtn}>Promijeni lozinku</button>
      </form>
    </div>
  );
};

export default PasswordChange;