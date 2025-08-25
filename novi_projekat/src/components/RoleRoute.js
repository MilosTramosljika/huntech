import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RoleRoute({ children, allowedRoles }) {
  const { currentUser, userRoles, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Učitavanje...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!userRoles?.some((r) => allowedRoles.includes(r))) {
    return <Navigate to="/profile" replace />; // ili /unauthorized page
  }

  return children;
}

export default RoleRoute;
