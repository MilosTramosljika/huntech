import React, { useState, useEffect } from "react";
import styles from "../../components/Navigation/Navigation.module.css";
import { Link } from "react-router-dom";
import {
  Menu,
  Bell,
  MessageCircle,
  Home,
  Map,
  Notebook,
  User,
  Settings,
  BarChart,
  Target,
  Search
} from "lucide-react";

export default function Navigation({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bottomBlur, setBottomBlur] = useState(false);

  // Brojevi nepročitanih notifikacija i poruka
  const [notifications] = useState(12);
  const [messages] = useState(6);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setBottomBlur(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.navigationWrapper}>
      {/* Top Navbar */}
      <div
        className={styles.topNavbar}
        style={{
          transform: sidebarOpen ? "translateX(220px)" : "translateX(0)"
        }}
      >
        <button className={styles.burgerButton} onClick={toggleSidebar}>
          <Menu />
        </button>

        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchBar}
          />
        </div>

        <div className={styles.iconButtons}>
          <button className={styles.iconButton}>
            <Bell />
            {notifications > 0 && (
              <span className={styles.badge}>{notifications}</span>
            )}
          </button>
          <button className={styles.iconButton}>
            <MessageCircle />
            {messages > 0 && (
              <span className={styles.badge}>{messages}</span>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <ul>
          <li><Settings /> Postavke</li>
          <li><BarChart /> Statistika</li>
          <li><Target /> Podešavanja lova</li>
          {/* ➕ Ovdje dodaj dodatne stavke prema tipu korisnika */}
        </ul>
      </div>

      {/* Sadržaj stranice */}
      <div className={styles.pageContent}>{children}</div>

      {/* Bottom Navbar */}
      <div
        className={`${styles.bottomNavbar} ${bottomBlur ? styles.blurred : ""}`}
      >
        <Link to="/" className={styles.navItem}>
          <Home />
          <span>Početna</span>
        </Link>
        <Link to="/mapa" className={styles.navItem}>
          <Map />
          <span>Mapa</span>
        </Link>
        <Link to="/dnevnik" className={styles.navItem}>
          <Notebook />
          <span>Dnevnik</span>
        </Link>
        <Link to="/profil" className={styles.navItem}>
          <User />
          <span>Profil</span>
        </Link>
      </div>
    </div>
  );
}
