import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Komponente
import NotFound from "./components/NotFound.jsx";
import MessagingPage from "./components/messaging/MessagingPage.jsx";
import Notifications from "./components/notifications/Notifications.jsx";

import Navigation from "./components/Navigation/Navigation.jsx";
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
import GroupSelector from "./pages/Korisnik/DirektorLovackogUdruzenja/GroupSelector.jsx";
import GroupManagement from "./pages/Korisnik/DirektorLovackogUdruzenja/GroupManagement.jsx";
import ZahtjeviPage from "./pages/Korisnik/DirektorLovackogUdruzenja/ZahtjeviPage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import ProfilePage from "./components/ProfilePage.jsx";

// Dashboardi po ulogama
import AdminDashboard from "./components/dashboards/AdminDashboard.jsx";
import LovacDashboard from "./components/dashboards/LovacDashboard.jsx";
import DMZDashboard from "./components/dashboards/DMZDashboard.jsx";
import DLUDashboard from "./components/dashboards/DLUDashboard.jsx";

// Dodatne stranice za status profila
import PendingPage from "./pages/PendingPage.jsx";
import RejectedPage from "./pages/RejectedPage.jsx";

// Zaštićena ruta
function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Učitavanje...</div>;
  }

  return currentUser ? children : <Navigate to="/login" replace />;
}

// Glavne rute
function AppRoutes() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Učitavanje...</div>;
  }

  return (
    <>
      <Navigation />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<LoginForm />} />

          {/* Ako je korisnik već logovan -> odmah ga šaljemo na profil */}
          <Route
            path="/login"
            element={
              currentUser ? <Navigate to="/profile" replace /> : <LoginForm />
            }
          />

          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/pending" element={<PendingPage />} />
          <Route path="/rejected" element={<RejectedPage />} />

          <Route
            path="/profilePage"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Dashboardi po ulogama */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/lovac"
            element={
              <PrivateRoute>
                <LovacDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dmz"
            element={
              <PrivateRoute>
                <DMZDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dlu"
            element={
              <PrivateRoute>
                <DLUDashboard />
              </PrivateRoute>
            }
          />

          {/* Nove rute za messaging i obaveštenja */}
          <Route
            path="/poruke"
            element={
              <PrivateRoute>
                <MessagingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifikacije"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />

          {/* 404 stranica */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />

          <Route path="/pocetnaStranica" element={<HomePage />} />
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
          <Route path="/GroupSelector" element={<GroupSelector />} />
          <Route path="/GroupManagement/:id" element={<GroupManagement />} />
          <Route
            path="/GroupManagement/:id/zahtjevi"
            element={<ZahtjeviPage />}
          />
        </Routes>
      </div>
    </>
  );
}

// Glavna App komponenta
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
