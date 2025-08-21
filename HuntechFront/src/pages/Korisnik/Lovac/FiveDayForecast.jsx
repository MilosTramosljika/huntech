import React, { useState, useEffect } from 'react';
import styles from './FiveDayForecast.module.css';

const Weather = () => {
  const [grad, setGrad] = useState('');
  const [trenutniGrad, setTrenutniGrad] = useState('');
  const [dani, setDani] = useState([]);
  const [greska, setGreska] = useState('');

  const apiKey = '517363afb3d0b9294d3c76a5f6295f7f'; // zameni svojim ključem

  // Funkcija za dohvat podataka sa OpenWeatherMap
  const fetchWeather = async (gradZaPretragu) => {
    try {
      setGreska('');
      setDani([]);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${gradZaPretragu}&units=metric&lang=sr&appid=${apiKey}`
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
      setTrenutniGrad(data.city.name);
    } catch {
      setGreska('Došlo je do greške u komunikaciji.');
    }
  };

  // Pokušaj automatske geolokacije
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            );
            const data = await res.json();
            if (data.name) {
              fetchWeather(data.name); // prikazujemo prognozu za trenutni grad
            }
          } catch {
            setGreska('Ne mogu da dohvatim trenutnu lokaciju.');
          }
        },
        () => setGreska('Ne mogu da dobijem tvoju lokaciju.')
      );
    } else {
      setGreska('Geolokacija nije podržana u ovom pretraživaču.');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (grad.trim() !== '') {
      fetchWeather(grad);
      setGrad('');
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
        />
        <button type="submit" className={styles.searchButton}>Pretraži</button>
      </form>

      {greska && <p className={styles.error}>{greska}</p>}

      {trenutniGrad && <h3 className={styles.subheading}>Prognoza za: {trenutniGrad}</h3>}

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

export default Weather;
