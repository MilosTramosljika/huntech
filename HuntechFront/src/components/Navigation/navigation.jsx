/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import styles from "./Navigation.module.css";
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
  Search,
  Footprints,
  ThermometerSun,
  UsersIcon,
  InfoIcon,
  PawPrintIcon,
  UserStarIcon,
  CompassIcon,
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

  const closeSidebar = () => {
    setSidebarOpen(false);
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
      <div className={styles.topNavbar}>
        <div
          className={`${styles.topLeft} ${sidebarOpen ? styles.shifted : ""}`}
        >
          <button className={styles.burgerButton} onClick={toggleSidebar}>
            <Menu />
          </button>

          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Pretraži..."
              className={styles.searchBar}
            />
          </div>
        </div>

        <div className={styles.iconButtons}>
          <Link to="notifikacije" className={styles.iconButton}>
            <Bell />
            {notifications > 0 && (
              <span className={styles.badge}>{notifications}</span>
            )}
          </Link>
          <Link to="poruke" className={styles.iconButton}>
            <MessageCircle />
            {messages > 0 && <span className={styles.badge}>{messages}</span>}
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <Link to="/" className={styles.sidebarLink} onClick={closeSidebar}>
              <Home /> Početna
            </Link>
          </li>
          <li>
            <Link
              to="/statistika"
              className={styles.sidebarLink}
              onClick={closeSidebar}
            >
              <BarChart /> Statistika
            </Link>
          </li>
          <li>
            <Link
              to="/lovackeGrupe"
              className={styles.sidebarLink}
              onClick={closeSidebar}
            >
              <UsersIcon /> Lovačke grupe
            </Link>
          </li>
          <li>
            <Link
              to="/podesavanjaLova"
              className={styles.sidebarLink}
              onClick={closeSidebar}
            >
              <Target /> Podešavanja lova
            </Link>
          </li>
          <li>
            <Link
              to="/aktivnostDivljaci"
              className={styles.sidebarLink}
              onClick={closeSidebar}
            >
              <PawPrintIcon /> Aktivnost divljači
            </Link>
          </li>
          <li>
            <Link
              to="/Pedometar"
              className={styles.sidebarLink}
              onClick={closeSidebar}
            >
              <Footprints /> Pedometar
            </Link>
          </li>
          <li>
            <Link
              to="/kompas"
              className={styles.sidebarLink}
              onClick={closeSidebar}
            >
              <CompassIcon /> Kompas
            </Link>
          </li>
          <li>
            <Link
              to="/vremenskaPrognoza"
              className={styles.sidebarLink}
              onClick={closeSidebar}
            >
              <ThermometerSun /> Vremenska prognoza
            </Link>
          </li>
          <li>
            <Link
              to="/infoSekcija"
              className={styles.sidebarLink}
              onClick={closeSidebar}
            >
              <InfoIcon /> Info sekcija
            </Link>
          </li>
          <li>
            <Link
              to="/podesavanja"
              className={styles.sidebarLink}
              onClick={closeSidebar}
            >
              <Settings /> Podešavanja
            </Link>
          </li>
          <li>
            <Link
              to="/adminDashboard"
              className={styles.sidebarLink}
              onClick={closeSidebar}
            >
              <UserStarIcon /> Admin
            </Link>
          </li>
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
        <Link to="/profilePage" className={styles.navItem}>
          <User />
          <span>Profil</span>
        </Link>
      </div>
    </div>
  );
}
