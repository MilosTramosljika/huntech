import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Komponente
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import MessagingPage from "./components/messaging/MessagingPage";
import Notifications from "./components/notifications/Notifications";

// Dashboardi po ulogama
import AdminDashboard from "./components/dashboards/AdminDashboard";
import LovacDashboard from "./components/dashboards/LovacDashboard";
import DMZDashboard from "./components/dashboards/DMZDashboard";
import DLUDashboard from "./components/dashboards/DLUDashboard";

// Dodatne stranice za status profila
import PendingPage from "./pages/PendingPage";
import RejectedPage from "./pages/RejectedPage";

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
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />

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
            path="/profile"
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
            path="/messages"
            element={
              <PrivateRoute>
                <MessagingPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
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
