import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Administratorska kontrolna tabla</h2>

      <Link to="/zahtjeviZaRegistraciju" className={styles.button}>
        Prikaži zahtjeve za registraciju
      </Link>

      <Link to="/prijave" className={styles.button}>
        Prikaži prijave
      </Link>

      <Link to="/zahtjeviZaUlogu" className={styles.button}>
        Prikaži zahtjeve za promjenu uloge
      </Link>

      <Link to="/promjenaLozinke" className={styles.button}>
        Promijeni lozinku
      </Link>

      <Link to="/odjaviSe" className={styles.button}>
        Odjavi se
      </Link>
    </div>
  );
};

export default AdminDashboard;
