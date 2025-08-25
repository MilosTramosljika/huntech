import React from "react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ProtectedRoute({ children, allowedRoles }) {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setUserRole(null);
        setLoading(false);
        return;
      }

      const { data: uloge, error } = await supabase
        .from("korisnik_has_uloga")
        .select("uloga ( naziv )")
        .eq("profile_id", user.id);

      if (error) {
        console.error(error);
        setUserRole(null);
      } else {
        setUserRole(uloge?.[0]?.uloga?.naziv);
      }
      setLoading(false);
    };

    fetchRole();
  }, []);

  if (loading) return <p>Učitavanje...</p>;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
