import React, { useState } from "react";
import styles from "./FiveDayForecast.module.css";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThermometer,
  WiRaindrop,
  WiStrongWind,
  WiBarometer,
  WiCloud,
  WiDayFog,
} from "react-icons/wi";

const FiveDayForecast = () => {
  const [grad, setGrad] = useState("");
  const [dani, setDani] = useState([]);
  const [poSatima, setPoSatima] = useState({});
  const [odabraniDan, setOdabraniDan] = useState(null);
  const [greska, setGreska] = useState("");

  const apiKey = "517363afb3d0b9294d3c76a5f6295f7f"; // zameni svojim ključem

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska("");
    setDani([]);
    setPoSatima({});
    setOdabraniDan(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${grad}&units=metric&lang=sr&appid=${apiKey}`,
      );
      const data = await res.json();

      if (data.cod !== "200") {
        setGreska(`Greška: ${data.message}`);
        return;
      }

      // grupisanje po datumima
      const grupisano = {};
      data.list.forEach((item) => {
        const datum = item.dt_txt.split(" ")[0];
        if (!grupisano[datum]) grupisano[datum] = [];
        grupisano[datum].push(item);
      });

      // izvuci prvi zapis za dnevni prikaz
      const sortirano = Object.keys(grupisano)
        .slice(0, 5)
        .map((datum) => ({
          datum,
          ...grupisano[datum][0],
        }));

      setDani(sortirano);
      setPoSatima(grupisano);
    } catch {
      setGreska("Došlo je do greške u komunikaciji.");
    }
  };

  const getCardClass = (icon) => {
    if (icon.startsWith("01")) return styles.sunnyCard;
    if (icon.startsWith("02") || icon.startsWith("03") || icon.startsWith("04"))
      return styles.cloudyCard;
    if (icon.startsWith("09") || icon.startsWith("10") || icon.startsWith("11"))
      return styles.rainyCard;
    if (icon.startsWith("13")) return styles.snowyCard;
    return "";
  };

  const getWeatherIcon = (icon) => {
    if (icon.startsWith("01")) return <WiDaySunny color="#FFD700" size={48} />;
    if (icon.startsWith("02") || icon.startsWith("03") || icon.startsWith("04"))
      return <WiCloudy color="#90A4AE" size={48} />;
    if (icon.startsWith("09") || icon.startsWith("10") || icon.startsWith("11"))
      return <WiRain color="#2196F3" size={48} />;
    if (icon.startsWith("13")) return <WiSnow color="#81D4FA" size={48} />;
    return null;
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
          <div
            key={i}
            className={`${styles.card} ${getCardClass(d.weather[0].icon)}`}
            onClick={() =>
              setOdabraniDan(odabraniDan === d.datum ? null : d.datum)
            }
          >
            <strong>{d.datum}</strong>
            <div className={styles.weatherIcon}>
              {getWeatherIcon(d.weather[0].icon)}
            </div>
            <p>{d.weather[0].description}</p>

            <p>
              <WiThermometer color="#FF5722" /> {d.main.temp}°C (osjećaj{" "}
              {d.main.feels_like}°C)
            </p>
            <p>
              <WiBarometer color="#607D8B" /> Pritisak: {d.main.pressure} hPa
            </p>
            <p>
              <WiRaindrop color="#2196F3" /> Vlažnost: {d.main.humidity}%
            </p>
            <p>
              <WiCloud color="#90A4AE" /> Oblaci: {d.clouds.all}%
            </p>
            <p>
              <WiDayFog color="#9E9E9E" /> Vidljivost:{" "}
              {Math.round(d.visibility / 1000)} km
            </p>
            <p>
              <WiStrongWind color="#00BCD4" /> Vjetar: {d.wind.speed} m/s (smjer{" "}
              {d.wind.deg}°)
            </p>
            {d.pop !== undefined && (
              <p>🌧️ Šansa za padavine: {Math.round(d.pop * 100)}%</p>
            )}
            {d.rain && <p>🌧️ Kiša: {d.rain["3h"]} mm</p>}
            {d.snow && <p>❄️ Snijeg: {d.snow["3h"]} mm</p>}

            {/* satna prognoza ako je kliknut dan */}
            {odabraniDan === d.datum && (
              <div className={styles.hourly}>
                <h4>⏰ Prognoza po satima</h4>
                {poSatima[d.datum].map((h, idx) => (
                  <div key={idx} className={styles.hourCard}>
                    <span>
                      <b>{h.dt_txt.split(" ")[1].slice(0, 5)}</b>
                    </span>
                    {getWeatherIcon(h.weather[0].icon)}
                    <span>
                      {h.main.temp}°C (osjećaj {h.main.feels_like}°C)
                    </span>
                    <span>💧 {h.main.humidity}%</span>
                    <span>🌬️ {h.wind.speed} m/s</span>
                    {h.pop !== undefined && (
                      <span>🌧️ {Math.round(h.pop * 100)}%</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
