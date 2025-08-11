import React, { useEffect, useState } from 'react';

function Lokacije() {
  const [lokacije, setLokacije] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/lokacijas')
      .then(res => res.json())
      .then(data => setLokacije(data))
      .catch(err => console.error('Greška prilikom učitavanja:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista lokacija</h2>
      <ul>
        {lokacije.map((lok) => (
          <li key={lok.id}>
            📍 Lokacija #{lok.id}: ({lok.geografskaSirina}, {lok.geografskaDuzina})  
            {lok.idGrupe && lok.idGrupe.id ? <> – Grupa #{lok.idGrupe.id}</> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lokacije;