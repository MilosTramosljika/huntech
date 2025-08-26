import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import AdminDashboard from "./pages/Korisnik/Admin/AdminDashboard.jsx";
import HomePage from "./pages/Korisnik/Lovac/HomePage.jsx";
import UserProfile from "./pages/Korisnik/Lovac/UserProfile.jsx";
// import Map from "./pages/Korisnik/Lovac/Map.jsx";
import MapDirektor from "./pages/Korisnik/Lovac/MapDirektor.jsx";
import HuntingLog from "./pages/Korisnik/Lovac/HuntingLog.jsx";
import GroupSection from "./pages/Korisnik/Lovac/GroupSection.jsx";
import LocationActivity from "./pages/Korisnik/Lovac/LocationActivity.jsx";
import StepTracker from "./pages/Korisnik/Lovac/StepTracker.jsx";
import FiveDayForecast from "./pages/Korisnik/Lovac/FiveDayForecast.jsx";
import InfoSection from "./pages/Korisnik/Lovac/InfoSection.jsx";
import RegistrationRequests from "./pages/Korisnik/Admin/RegistrationRequests.jsx";
import UserReports from "./pages/Korisnik/Admin/UserReports.jsx";
import RoleRequests from "./pages/Korisnik/Admin/RoleRequests.jsx";
import PasswordChange from "./pages/Korisnik/Admin/PasswordChange.jsx";
import Compass from "./pages/Korisnik/Lovac/Compass.jsx";
import LogEntry from "./pages/Korisnik/Lovac/LogEntry.jsx";

export default function AppComla() {
  return (
    <Router>
      <Navigation>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MapDirektor />} />
          <Route path="/dnevnik" element={<HuntingLog />} />
          <Route path="/dodavanjeObjaveNaLD" element={<LogEntry />} />
          <Route path="/uredjivanjeObjaveNaLD/:id" element={<LogEntry />} />
          <Route path="/profil" element={<UserProfile />} />
          <Route path="/statistika" element={<UserProfile />} />
          <Route path="/lovackeGrupe" element={<GroupSection />} />
          <Route path="/podesavanjaLova" element={<UserProfile />} />
          <Route path="/aktivnostDivljaci" element={<LocationActivity />} />
          <Route path="/pedometar" element={<StepTracker />} />
          <Route path="/kompas" element={<Compass />} />
          <Route path="/vremenskaPrognoza" element={<FiveDayForecast />} />
          <Route path="/infoSekcija" element={<InfoSection />} />
          <Route path="/podesavanja" element={<UserProfile />} />
          <Route path="/notifikacije" element={<UserProfile />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route
            path="/zahtjeviZaRegistraciju"
            element={<RegistrationRequests />}
          />
          <Route path="/prijave" element={<UserReports />} />
          <Route path="/zahtjeviZaUlogu" element={<RoleRequests />} />
          <Route path="/promjenaLozinke" element={<PasswordChange />} />
        </Routes>
      </Navigation>
    </Router>
  );
}
