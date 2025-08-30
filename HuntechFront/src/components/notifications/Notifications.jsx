import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);

  // Učitavanje obaveštenja
  useEffect(() => {
    if (!currentUser) return;

    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setNotifications(data || []);
        setUnreadCount(data.filter((n) => !n.is_read).length);
        setError(null);
      } catch (err) {
        console.error("Greška pri učitavanju obaveštenja:", err);
        setError("Greška pri učitavanju obaveštenja");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Real-time pretplata za nova obaveštenja
    const notificationsSubscription = supabase
      .channel("user-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${currentUser.id}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notificationsSubscription);
    };
  }, [currentUser]);

  const markAsRead = async (id) => {
    try {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id);

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error(
        "Greška pri označavanju obaveštenja kao pročitano:",
        error.message
      );
    }
  };

  const markAllAsRead = async () => {
    try {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", currentUser.id)
        .eq("is_read", false);

      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Greška pri označavanju svih obaveštenja kao pročitano:",
        error.message
      );
    }
  };

  if (loading) {
    return <div className="loading">Učitavanje obaveštenja...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>
          Obaveštenja{" "}
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </h2>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="mark-all-read">
            Označi sve kao pročitano
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="no-notifications">Nemate obaveštenja</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`notification-item ${notification.is_read ? "" : "unread"}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-content">
                <p>{notification.message}</p>
                <small>
                  {new Date(notification.created_at).toLocaleString()}
                </small>
              </div>
              {notification.link && (
                <Link to={notification.link} className="notification-link">
                  Pogledaj
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
