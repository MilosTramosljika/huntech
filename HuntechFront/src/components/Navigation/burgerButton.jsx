import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaCog, FaChartBar, FaBullseye } from "react-icons/fa";
import { LuNotebook } from "react-icons/lu";
import { TiWeatherPartlySunny } from "react-icons/ti";
import "./burgerButton.css";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);
  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Dugme u headeru */}
      <button className="menu-btn" onClick={toggleSidebar}>
        <FaBars size={22} color="#fff" />
      </button>

      {/* Overlay */}
      {open && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <h2 className="sidebar-title">Meni</h2>
        <ul>
          <li>
            <Link
              to="/postavke"
              className="sidebar-link"
              onClick={closeSidebar}
            >
              <FaCog /> <span>Podešavanje</span>
            </Link>
          </li>
          <li>
            <Link
              to="/statistika"
              className="sidebar-link"
              onClick={closeSidebar}
            >
              <FaChartBar /> <span>Statistika</span>
            </Link>
          </li>
          <li>
            <Link
              to="/podesavanja-lova"
              className="sidebar-link"
              onClick={closeSidebar}
            >
              <FaBullseye /> <span>Podešavanja lova</span>
            </Link>
          </li>
          <li>
            <Link
              to="/lovackiDnevnik"
              className="sidebar-link"
              onClick={closeSidebar}
            >
              <LuNotebook /> <span>Dnevnik</span>
            </Link>
          </li>
          <li>
            <Link
              to="/vremenskaPrognoza"
              className="sidebar-link"
              onClick={closeSidebar}
            >
              <TiWeatherPartlySunny /> <span>Vremenska prognoza</span>
            </Link>
          </li>
        </ul>
        {/* User panel na dnu */}
        <div className="sidebar-user">
          <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">Marko Marković</span>
            <button
              onClick={() => console.log("Odjava")}
              className="logout-btn"
            >
              Odjava
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
