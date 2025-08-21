// src/App.js
import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importuj komponente za forme i profile
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
// import Dashboard from "./components/Dashboard"; // <-- Ovaj red je trenutno uklonjen
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";

// Komponenta zaštićena autentifikacijom
function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{ textAlign: "center", marginTop: "100px", fontSize: "20px" }}
      >
        Učitavanje...
      </div>
    );
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

// Glavna App komponenta koja definiše rute
function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar /> {/* Navigacioni bar vidljiv na svim stranicama */}
      <Routes>
        {/* Javne rute */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* Zaštićena ruta za profil */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />{" "}
              {/* Koristimo ProfilePage kao glavnu zaštićenu stranicu */}
            </PrivateRoute>
          }
        />

        {/* Podrazumevana ruta: preusmeri na profil ako je korisnik prijavljen, inače na login */}
        <Route
          path="*"
          element={
            currentUser ? (
              <Navigate to="/profile" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

// Omotaj celu aplikaciju sa AuthProviderom i BrowserRouterom
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
