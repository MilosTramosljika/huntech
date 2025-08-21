// Navigation.jsx
import React from "react";
import "./navigation.css";
import {
  FaBell,
  FaCommentDots,
  FaHome,
  FaMapMarkedAlt,
  FaBook,
  FaUser,
} from "react-icons/fa";
import SearchBox from "./searchBox";
import BurgerMenu from "./burgerButton";

export default function Navigation({ children }) {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        {/* Sidebar */}
        <BurgerMenu /> {/* sada je odvojeno od header-a */}
        <SearchBox /> {/* Search box */}
        <div className="header-icons">
          <div className="icon-with-badge">
            <FaBell size={20} color="#fff" />
            <span className="badge">3</span>
          </div>
          <div className="icon-with-badge">
            <FaCommentDots size={20} color="#fff" />
            <span className="badge">6</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">{children}</main>

      {/* Footer nav */}
      <footer className="footer">
        <div className="footer-item">
          <FaHome size={20} />
          <span>Početna</span>
        </div>
        <div className="footer-item">
          <FaMapMarkedAlt size={20} />
          <span>Mapa</span>
        </div>
        <div className="footer-item">
          <FaBook size={20} />
          <span>Dnevnik</span>
        </div>
        <div className="footer-item">
          <FaUser size={20} />
          <span>Profil</span>
        </div>
      </footer>
    </div>
  );
}
