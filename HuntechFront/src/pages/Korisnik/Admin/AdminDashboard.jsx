import React from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Administratorska kontrolna tabla</h2>

      <form action="/odjavi-se" method="post" className={styles.form}>
        <input type="submit" value="Odjavi se" className={styles.button} />
      </form>

      <form action="/korisnicki-nalozi" method="get" className={styles.form}>
        <input type="submit" value="Prikaži korisničke naloge" className={styles.button} />
      </form>

      <form action="/zahtjevi-za-registraciju" method="get" className={styles.form}>
        <input type="submit" value="Prikaži zahtjeve za registraciju" className={styles.button} />
      </form>

      <form action="/prijave" method="get" className={styles.form}>
        <input type="submit" value="Prikaži prijave" className={styles.button} />
      </form>

      <form action="/zahtjevi-za-status" method="get" className={styles.form}>
        <input type="submit" value="Prikaži zahtjeve za promjenu statusa" className={styles.button} />
      </form>

      <form action="/promjena-lozinke" method="get" className={styles.form}>
        <input type="submit" value="Promijeni lozinku" className={styles.button} />
      </form>
    </div>
  );
};

export default AdminDashboard;