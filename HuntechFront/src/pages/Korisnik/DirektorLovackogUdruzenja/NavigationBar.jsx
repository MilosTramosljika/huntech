import { Link, useLocation } from "react-router-dom";
import styles from "./navigation.module.css";
import { Home, Map, Book, User } from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <Link
        to="/"
        className={`${styles.navItem} ${location.pathname === "/" ? styles.active : ""}`}
      >
        <Home size={24} />
        <span>Početna</span>
      </Link>

      <Link
        to="/mapa"
        className={`${styles.navItem} ${location.pathname === "/mapa" ? styles.active : ""}`}
      >
        <Map size={24} />
        <span>Mapa</span>
      </Link>

      <Link
        to="/dnevnik"
        className={`${styles.navItem} ${location.pathname === "/dnevnik" ? styles.active : ""}`}
      >
        <Book size={24} />
        <span>Dnevnik</span>
      </Link>

      <Link
        to="/profil"
        className={`${styles.navItem} ${location.pathname === "/profil" ? styles.active : ""}`}
      >
        <User size={24} />
        <span>Profil</span>
      </Link>
    </nav>
  );
}