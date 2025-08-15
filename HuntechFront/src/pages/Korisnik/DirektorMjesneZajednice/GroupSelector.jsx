import React, { useState } from 'react';
import styles from './GroupSelector.module.css';

const GroupSelector = () => {
  const [selectedGroup, setSelectedGroup] = useState('');

  const groups = [
    { value: 'jaruzani', label: 'Sekcija Jaružani (27 članova)' },
    { value: 'planina', label: 'Sekcija Planina (15 članova)' },
    { value: 'potok', label: 'Sekcija Potok (21 član)' },
    // TODO: Dinamički učitati iz baze
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pregled grupe:', selectedGroup);
    // TODO: Navigacija ka /pregled-grupe?grupa=selectedGroup
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>📂 Moje grupe u nadležnosti</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="grupa">Odaberi grupu za pregled:</label>
        <select
          id="grupa"
          name="grupa"
          required
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="">-- Izaberi grupu --</option>
          {groups.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>

        <button type="submit">📁 Prikaži grupu</button>
      </form>
    </div>
  );
};

export default GroupSelector;