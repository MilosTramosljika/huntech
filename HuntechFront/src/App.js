import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import AdminDashboard from "./pages/Korisnik/Admin/AdminDashboard";
import UserProfile from "./pages/Korisnik/Lovac/UserProfile";
import Map from "./pages/Korisnik/Lovac/Map";
import MapDirektor from "./pages/Korisnik/Lovac/MapDirektor";

function HomePage() {
  return <h1>Početna stranica</h1>;
}
function MapPage() {
  return <h1>Mapa</h1>;
}
function DnevnikPage() {
  return <h1>Lovčki dnevnik</h1>;
}
function ProfilPage() {
  return <h1>Korisnički profil</h1>;
}

export default function App() {
  return (
    <Router>
      <Navigation>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/mapa" element={<MapDirektor />} />
          <Route path="/dnevnik" element={<Map />} />
          <Route path="/profil" element={<UserProfile />} />
        </Routes>
      </Navigation>
    </Router>
  );
}
