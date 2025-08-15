import React, { useState } from 'react';
import styles from './FiveDayForecast.module.css';

const FiveDayForecast = () => {
  const [grad, setGrad] = useState('');
  const [dani, setDani] = useState([]);
  const [greska, setGreska] = useState('');

  const apiKey = '517363afb3d0b9294d3c76a5f6295f7f'; // zameni svojim ključem

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska('');
    setDani([]);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${grad}&units=metric&lang=sr&appid=${apiKey}`
      );
      const data = await res.json();

      if (data.cod !== '200') {
        setGreska(`Greška: ${data.message}`);
        return;
      }

      const daniMap = {};
      data.list.forEach(item => {
        const datum = item.dt_txt.split(' ')[0];
        if (!daniMap[datum]) {
          daniMap[datum] = item;
        }
      });

      const sortirano = Object.keys(daniMap)
        .slice(0, 5)
        .map(datum => ({ datum, ...daniMap[datum] }));

      setDani(sortirano);
    } catch {
      setGreska('Došlo je do greške u komunikaciji.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📅 Prognoza za narednih 5 dana</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Unesi grad..."
          value={grad}
          onChange={(e) => setGrad(e.target.value)}
          required
        />
        <button type="submit">Prikaži</button>
      </form>

      {greska && <p className={styles.error}>{greska}</p>}

      <div className={styles.cards}>
        {dani.map((d, i) => (
          <div key={i} className={styles.card}>
            <strong>{d.datum}</strong>
            <img
              src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
              alt={d.weather[0].description}
            />
            <p>{d.weather[0].description}</p>
            <p>🌡️ {d.main.temp}°C</p>
            <p>💧 {d.main.humidity}%</p>
            <p>🌬️ {d.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;