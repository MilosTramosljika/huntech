import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const isMessageNotification = (notification) => {
    return (
      notification.message &&
      (notification.message.includes("poruku") ||
        notification.message.includes("poruka") ||
        notification.message.includes("message"))
    );
  };

  useEffect(() => {
    if (!currentUser) return;

    const fetchCounts = async () => {
      // Nepročitana obaveštenja (bez poruka)
      const { data: notifications, error: notificationsError } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", currentUser.id)
        .eq("is_read", false);

      if (notificationsError) {
        console.error("Error fetching notifications:", notificationsError);
      } else {
        const nonMessageNotifications = notifications.filter(
          (n) => !isMessageNotification(n)
        );
        setUnreadNotifications(nonMessageNotifications.length);
      }

      // Nepročitane poruke
      const { count: messagesCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("receiver_id", currentUser.id)
        .eq("is_read", false);

      setUnreadMessages(messagesCount || 0);
    };

    fetchCounts();

    // Real-time pretplate
    const notificationsChannel = supabase
      .channel("navbar-notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${currentUser.id}`,
        },
        async () => {
          const { data: notifications } = await supabase
            .from("notifications")
            .select("*")
            .eq("user_id", currentUser.id)
            .eq("is_read", false);

          if (notifications) {
            const nonMessageNotifications = notifications.filter(
              (n) => !isMessageNotification(n)
            );
            setUnreadNotifications(nonMessageNotifications.length);
          }
        }
      )
      .subscribe();

    const messagesChannel = supabase
      .channel("navbar-messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${currentUser.id}`,
        },
        () => {
          supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("receiver_id", currentUser.id)
            .eq("is_read", false)
            .then(({ count }) => {
              setUnreadMessages(count || 0);
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notificationsChannel);
      supabase.removeChannel(messagesChannel);
    };
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Greška pri odjavi:", error);
      alert("Greška pri odjavi. Pokušajte ponovo.");
    }
  };

  return (
    <nav
      style={{
        background: "#333",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={linkStyle}>
          Huntech App
        </Link>

        {currentUser && (
          <>
            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>
            <Link to="/profile" style={linkStyle}>
              Moj Profil
            </Link>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {currentUser && (
          <>
            <Link to="/messages" style={badgeLinkStyle}>
              Poruke
              {unreadMessages > 0 && (
                <span style={badgeStyle}>{unreadMessages}</span>
              )}
            </Link>

            <Link to="/notifications" style={badgeLinkStyle}>
              Obaveštenja
              {unreadNotifications > 0 && (
                <span style={badgeStyle}>{unreadNotifications}</span>
              )}
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {currentUser.user_metadata?.avatar_url ? (
                <img
                  src={currentUser.user_metadata.avatar_url}
                  alt="Profilna"
                  style={avatarStyle}
                />
              ) : (
                <div style={avatarFallbackStyle}>
                  {currentUser.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <span>{currentUser.email}</span>
            </div>
          </>
        )}

        {currentUser ? (
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Odjavi se
          </button>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/login" style={linkStyle}>
              Prijavi se
            </Link>
            <Link to="/register" style={linkStyle}>
              Registruj se
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// Stilovi
const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const badgeLinkStyle = {
  position: "relative",
  color: "white",
  textDecoration: "none",
};

const badgeStyle = {
  position: "absolute",
  top: "-8px",
  right: "-8px",
  backgroundColor: "red",
  color: "white",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
};

const avatarStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid white",
};

const avatarFallbackStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#555",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  color: "#ccc",
};

const logoutButtonStyle = {
  background: "none",
  border: "1px solid white",
  color: "white",
  padding: "8px 15px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Navbar;
