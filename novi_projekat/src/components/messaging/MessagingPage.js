import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../supabaseClient";
import { sendNotification } from "../../utils/notifications";
import { v4 as uuidv4 } from "uuid";

function MessagingPage() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});
  const messagesEndRef = useRef(null);
  const messagesRef = useRef([]);
  const pendingMessagesRef = useRef({});

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Load users and unread counts
  useEffect(() => {
    if (!currentUser) return;

    const fetchUsersAndUnread = async () => {
      setLoading(true);
      setError(null);

      try {
        // Load users
        const { data: usersData, error: usersError } = await supabase
          .from("profiles")
          .select("id, username, ime, prezime, profile_picture_url")
          .neq("id", currentUser.id)
          .order("username", { ascending: true });

        if (usersError) throw usersError;

        setUsers(usersData || []);

        // Load unread message counts
        const { data: unreadData, error: unreadError } = await supabase
          .from("messages")
          .select("sender_id")
          .eq("receiver_id", currentUser.id)
          .eq("is_read", false);

        if (unreadError) throw unreadError;

        // Calculate unread counts per user
        const countsMap = {};
        unreadData.forEach((item) => {
          countsMap[item.sender_id] = (countsMap[item.sender_id] || 0) + 1;
        });

        setUnreadCounts(countsMap);
      } catch (err) {
        console.error("Greška pri učitavanju korisnika:", err);
        setError("Greška pri učitavanju korisnika");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndUnread();
  }, [currentUser]);

  // Load messages and setup real-time subscription
  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .or(
            `and(sender_id.eq.${currentUser.id},receiver_id.eq.${selectedUser}),and(sender_id.eq.${selectedUser},receiver_id.eq.${currentUser.id})`
          )
          .order("created_at", { ascending: true });

        if (error) throw error;

        setMessages(data || []);

        // Mark messages as read
        await supabase
          .from("messages")
          .update({ is_read: true })
          .eq("receiver_id", currentUser.id)
          .eq("sender_id", selectedUser)
          .eq("is_read", false);

        // Reset unread count for this user
        setUnreadCounts((prev) => ({
          ...prev,
          [selectedUser]: 0,
        }));
      } catch (err) {
        console.error("Greška pri učitavanju poruka:", err);
      }
    };

    fetchMessages();

    // Real-time subscription
    const messagesSubscription = supabase
      .channel("direct-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `or(and(sender_id.eq.${selectedUser},receiver_id.eq.${currentUser.id}),and(sender_id.eq.${currentUser.id},receiver_id.eq.${selectedUser}))`,
        },
        async (payload) => {
          // Check if this is a confirmation of an optimistic message
          const tempId = pendingMessagesRef.current[payload.new.content];
          if (tempId) {
            // Replace optimistic message with actual message
            setMessages((prev) =>
              prev.map((msg) => (msg.tempId === tempId ? payload.new : msg))
            );
            delete pendingMessagesRef.current[payload.new.content];
            return;
          }

          // Handle new messages from other users
          const exists = messagesRef.current.some(
            (msg) => msg.id === payload.new.id
          );

          if (!exists) {
            setMessages((prev) => [...prev, payload.new]);

            // Update unread count if message is for current user
            if (payload.new.receiver_id === currentUser.id) {
              setUnreadCounts((prev) => ({
                ...prev,
                [payload.new.sender_id]: (prev[payload.new.sender_id] || 0) + 1,
              }));
            }
          }

          // Mark as read if needed
          if (payload.new.receiver_id === currentUser.id) {
            await supabase
              .from("messages")
              .update({ is_read: true })
              .eq("id", payload.new.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesSubscription);
    };
  }, [selectedUser, currentUser]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !currentUser) return;

    let tempId;
    try {
      // Generate temp ID
      tempId = uuidv4();

      // Create optimistic message
      const optimisticMessage = {
        tempId,
        sender_id: currentUser.id,
        receiver_id: selectedUser,
        content: newMessage,
        created_at: new Date().toISOString(),
        is_read: true,
        is_optimistic: true,
      };

      // Store reference for matching server response
      pendingMessagesRef.current[newMessage] = tempId;

      // Update UI immediately
      setMessages((prev) => [...prev, optimisticMessage]);
      setNewMessage("");
      scrollToBottom();

      // Send to server
      const { error } = await supabase.from("messages").insert({
        sender_id: currentUser.id,
        receiver_id: selectedUser,
        content: newMessage,
      });

      if (error) throw error;

      // Send notification - but only for actual messages, not optimistic ones
      // await sendNotification(
      //   selectedUser,
      //   `Imate novu poruku od ${currentUser.user_metadata?.username || currentUser.email}`,
      //   "/messages"
      // );
    } catch (error) {
      console.error("Greška pri slanju poruke:", error.message);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((msg) => msg.tempId !== tempId));
      delete pendingMessagesRef.current[newMessage];
    }
  };

  if (loading) {
    return <div className="loading">Učitavanje korisnika...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="messaging-container">
      <div className="users-list">
        <h3>Korisnici</h3>
        {users.length === 0 ? (
          <p>Nema drugih korisnika</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className={`user-item ${selectedUser === user.id ? "active" : ""} ${
                unreadCounts[user.id] > 0 ? "unread-user" : ""
              }`}
              onClick={() => setSelectedUser(user.id)}
            >
              {user.profile_picture_url ? (
                <img
                  src={user.profile_picture_url}
                  alt="Profil"
                  className="user-avatar"
                />
              ) : (
                <div className="avatar-placeholder">
                  {user.username.charAt(0)}
                </div>
              )}
              <div className="user-info">
                <strong>{user.username}</strong>
                <small>
                  {user.ime} {user.prezime}
                </small>
              </div>

              {/* Indicator for unread messages */}
              {unreadCounts[user.id] > 0 && (
                <span className="unread-indicator">
                  {unreadCounts[user.id]}
                </span>
              )}
            </div>
          ))
        )}
      </div>

      <div className="chat-container">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div className="header-user">
                {users.find((u) => u.id === selectedUser)?.username}
                {unreadCounts[selectedUser] > 0 && (
                  <span className="header-unread-indicator">
                    {unreadCounts[selectedUser]} nova poruka
                  </span>
                )}
              </div>
            </div>

            <div className="messages-list">
              {messages.map((message) => (
                <div
                  key={message.id || message.tempId}
                  className={`message ${message.sender_id === currentUser.id ? "sent" : "received"} ${
                    !message.is_read && message.receiver_id === currentUser.id
                      ? "unread"
                      : ""
                  }`}
                >
                  <div className="message-content">
                    {message.content}
                    <div className="message-time">
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {message.is_optimistic && (
                        <span className="sending-indicator">
                          {" "}
                          (šalje se...)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Unesite poruku..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Pošalji</button>
            </div>
          </>
        ) : (
          <div className="select-user-prompt">
            <p>Izaberite korisnika za početak razgovora</p>
            {Object.keys(unreadCounts).length > 0 && (
              <p className="unread-hint">
                Imate nepročitane poruke od {Object.keys(unreadCounts).length}{" "}
                korisnika
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagingPage;
