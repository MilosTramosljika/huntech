import React, { useState, useEffect } from "react";
import styles from "./WeatherForecast.module.css";

const WeatherForecast = () => {
  const [grad, setGrad] = useState("");
  const [podaci, setPodaci] = useState(null);
  const [greska, setGreska] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "b5d7716953aaf1df6bceb5b6e436c809"; // zameni svojim ključem

  const fetchWeather = (query) => {
    setLoading(true);
    setGreska("");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=sr&appid=${apiKey}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setPodaci(data);
        } else {
          setGreska(`Greška: ${data.message}`);
          setPodaci(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setGreska("Došlo je do greške pri dohvaćanju podataka.");
        setPodaci(null);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (grad.trim()) fetchWeather(grad.trim());
  };

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=sr&appid=${apiKey}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            setPodaci(data);
            setGrad(data.name);
          }
        });
    });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🌤 Pregled vremenske prognoze</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="grad">Unesi grad:</label>
        <input
          type="text"
          id="grad"
          name="grad"
          value={grad}
          onChange={(e) => setGrad(e.target.value)}
          required
        />
        <button type="submit">Prikaži prognozu</button>
      </form>

      {loading && <p className={styles.loader}>Učitavanje...</p>}

      {greska && <div className={styles.error}>{greska}</div>}

      {podaci && (
        <div className={styles.rezultat}>
          <h3>
            {podaci.name}, {podaci.sys.country}
          </h3>
          <img
            src={`https://openweathermap.org/img/wn/${podaci.weather[0].icon}@2x.png`}
            alt={podaci.weather[0].description}
          />
          <p>
            <strong>Temperatura:</strong> {podaci.main.temp}°C
          </p>
          <p>
            <strong>Vlažnost:</strong> {podaci.main.humidity}%
          </p>
          <p>
            <strong>Vjetar:</strong> {podaci.wind.speed} m/s
          </p>
          <p>
            <strong>Opis:</strong> {podaci.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
