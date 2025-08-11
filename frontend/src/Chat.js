// Chat.js (samo par sitnih komentara/napomena)
import React, { useEffect, useState } from "react";
import { database } from "./firebase.js"; // Sada uzima 'database' iz naše 'firebase.js'
import { ref, push, onChildAdded } from "firebase/database";
import "./Chat.css";

const Chat = ({ username }) => {
  // 'username' je sada displayName/email/UID prijavljenog korisnika
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [uniqueUsers, setUniqueUsers] = useState([]);

  // Učitavanje poruka i kontakata
  useEffect(() => {
    const messagesRef = ref(database, "messages/");
    const unsubscribe = onChildAdded(messagesRef, (data) => {
      const msg = data.val();
      // Filtriramo poruke koje su poslane ili primljene od TRENUTNO prijavljenog korisnika
      if (msg.sender === username || msg.recipient === username) {
        setMessages((prev) => [...prev, msg]);

        // Pronalazi drugog korisnika u konverzaciji
        const otherUser = msg.sender === username ? msg.recipient : msg.sender;
        setUniqueUsers((prev) =>
          prev.includes(otherUser) ? prev : [...prev, otherUser]
        );
      }
    });

    // Cleanup funkcija za Realtime Database listener
    return () => {
      // Nema direktne "off" funkcije za onChildAdded kao za onSnapshot,
      // ali za production aplikacije, razmislio bi o tome kako prekinuti slušanje
      // kad komponenta nije vidljiva (npr. ako se prebaci na drugu stranicu).
      // Za ovu demonstraciju je ok.
    };
  }, [username]); // Ovisnost o 'username'

  // Filtrirane poruke s odabranim korisnikom
  const filteredMessages = selectedUser
    ? messages.filter(
        (msg) =>
          (msg.sender === username && msg.recipient === selectedUser) ||
          (msg.sender === selectedUser && msg.recipient === username)
      )
    : [];

  // Slanje poruke
  const sendMessage = () => {
    if (!selectedUser || !input.trim()) return;

    const messagesRef = ref(database, "messages/");
    const newMessage = {
      sender: username, // 'sender' je sada prijavljeni korisnik
      recipient: selectedUser,
      text: input,
      timestamp: Date.now(),
    };

    push(messagesRef, newMessage)
      .then(() => setInput(""))
      .catch((err) => console.error("Greška pri slanju poruke:", err));
  };
  const [newContactInput, setNewContactInput] = useState("");

  const addNewContact = () => {
    if (
      newContactInput.trim() &&
      !uniqueUsers.includes(newContactInput.trim()) &&
      newContactInput.trim() !== username
    ) {
      setUniqueUsers((prev) => [...prev, newContactInput.trim()]);
      setSelectedUser(newContactInput.trim()); // Automatski odaberi dodani kontakt
      setNewContactInput("");
    } else if (newContactInput.trim() === username) {
      alert("Ne možete dodati sebe kao kontakt.");
    }
  };

  return (
    <div className="chat-layout">
      {/* Ostatak koda za UI ostaje isti */}
      <div className="sidebar">
        <h3>Kontakti</h3>
        <div className="add-contact-section">
          <input
            type="email" // ili text, ovisno što koristite kao username
            placeholder="Dodaj kontakt (email/ime)"
            value={newContactInput}
            onChange={(e) => setNewContactInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNewContact()}
          />
          <button onClick={addNewContact}>Dodaj</button>
        </div>
        {uniqueUsers.map((user) => (
          <div
            key={user}
            className={`contact ${user === selectedUser ? "active" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            {user}
          </div>
        ))}
      </div>

      <div className="chat-content">
        <div className="chat-header">💬 Chat sa {selectedUser || "..."}</div>

        <div className="chat-messages">
          {filteredMessages.map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${
                msg.sender === username ? "sent" : "received"
              }`}
            >
              <div className="chat-meta">
                {msg.sender} ➡ {msg.recipient}
              </div>
              <div className="chat-text">{msg.text}</div>
              <div className="chat-time">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-inputs">
          <input
            type="text"
            placeholder="Poruka"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={!selectedUser}
          />
          <button
            onClick={sendMessage}
            disabled={!selectedUser || !input.trim()}
          >
            📤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
