import React, { useState } from "react";
import "./navigation.css";
import {
  FaBars,
  FaBell,
  FaCommentDots,
  FaHome,
  FaMapMarkedAlt,
  FaBook,
  FaUser,
  FaCog,
  FaChartBar,
  FaBullseye,
} from "react-icons/fa";

export default function Navigation({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars size={20} color="#fff" />
        </button>

        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />

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

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li><FaCog /> Postavke</li>
          <li><FaChartBar /> Statistika</li>
          <li><FaBullseye /> Podešavanja lova</li>
        </ul>
      </div>

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
