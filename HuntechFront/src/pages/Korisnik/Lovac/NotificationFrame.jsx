import React from 'react';
import styles from './NotificationFrame.module.css';

const NotificationFrame = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Obavještenje</h2>

      <a
        href="https://sistem-lovaca.example.com/obavjestenje/SYS103"
        target="notificationIframe"
        className={styles.linkButton}
      >
        📄 Pogledaj obavještenje: Vaš zahtjev je odobren
      </a>

      <iframe
        name="notificationIframe"
        title="Obavještenje"
        width="100%"
        height="400px"
        className={styles.iframe}
      >
        Ako se obavještenje ne učita, provjerite internet konekciju ili pokušajte kasnije.
      </iframe>
    </div>
  );
};

export default NotificationFrame;