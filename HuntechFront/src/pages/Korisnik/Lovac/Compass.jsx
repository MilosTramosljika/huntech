import React, { useEffect, useState } from 'react';
import styles from './Compass.module.css';

const Compass = () => {
  const [azimuth, setAzimuth] = useState(0);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      const handler = (event) => {
        if (typeof event.alpha === 'number') {
          setAzimuth(Math.round(event.alpha));
        }
      };
      window.addEventListener('deviceorientation', handler, true);
      return () => window.removeEventListener('deviceorientation', handler);
    } else {
      setSupported(false);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2>🧭 Kompas</h2>
      <div className={styles.compass}>
        <div
          className={styles.needle}
          style={{ transform: `translate(-50%, -100%) rotate(${azimuth}deg)` }}
        ></div>
      </div>
      <div className={styles.label}>
        {supported ? `Ugao: ${azimuth}°` : 'Gyroskop nije podržan na ovom uređaju.'}
      </div>
    </div>
  );
};

export default Compass;