import React, { useEffect, useState } from "react";
import {
  ref,
  push,
  onValue,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { database, auth } from "./firebase.js"; // VAŽNO: Uvezi 'auth' instancu
import "./Chat.css";
// getAuth više nije potreban ovde, jer ga uvozimo iz firebase.js

const Chat = () => {
  // Stanje za prijavljenog korisnika
  const [currentUser, setCurrentUser] = useState(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);

  // Izvedene vrednosti, ažuriraće se kada se `currentUser` promeni
  const currentUserId = currentUser?.uid;
  const currentUserNameForDisplay =
    currentUser?.displayName || currentUser?.email;

  // --- NOVI useEffect za slušanje stanja autentifikacije ---
  useEffect(() => {
    // onAuthStateChanged vraća funkciju za odjavu sa listenera
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Postavi prijavljenog korisnika u stanje
    });

    // Clean-up funkcija za odjavu sa listenera kada se komponenta unmount-uje
    return () => unsubscribeAuth();
  }, []); // Prazan niz zavisnosti znači da se ovaj efekt pokreće samo jednom pri montiranju

  // Dohvaćanje korisnika (ovaj useEffect se sada oslanja na `currentUser`)
  useEffect(() => {
    if (!currentUserId) {
      setAvailableUsers([]); // Očisti listu ako nema prijavljenog korisnika
      return;
    }

    const usersRef = ref(database, "users/");
    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      const loadedUsers = [];

      if (usersData) {
        for (let uid in usersData) {
          if (uid !== currentUserId) {
            loadedUsers.push({
              uid: uid,
              display: usersData[uid].displayName || usersData[uid].email,
            });
          }
        }
      }
      setAvailableUsers(loadedUsers);
    });

    return () => unsubscribeUsers();
  }, [currentUserId]); // Sada zavisi od currentUserId

  // Dohvaćanje poruka (i ovaj useEffect se sada oslanja na `currentUser`)
  useEffect(() => {
    if (!currentUserId) {
      setMessages([]); // Očisti poruke ako nema prijavljenog korisnika
      return;
    }

    const messagesRef = ref(database, "messages/");
    let allMessagesMap = new Map();

    const querySent = query(
      messagesRef,
      orderByChild("sender"),
      equalTo(currentUserId)
    );
    const unsubscribeSent = onValue(querySent, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        allMessagesMap.set(childSnapshot.key, childSnapshot.val());
      });
      setMessages(
        Array.from(allMessagesMap.values()).sort(
          (a, b) => a.timestamp - b.timestamp
        )
      );
    });

    const queryReceived = query(
      messagesRef,
      orderByChild("recipient"),
      equalTo(currentUserId)
    );
    const unsubscribeReceived = onValue(queryReceived, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        allMessagesMap.set(childSnapshot.key, childSnapshot.val());
      });
      setMessages(
        Array.from(allMessagesMap.values()).sort(
          (a, b) => a.timestamp - b.timestamp
        )
      );
    });

    return () => {
      unsubscribeSent();
      unsubscribeReceived();
    };
  }, [currentUserId]); // Sada zavisi od currentUserId

  // Filtriranje poruka (ostaje isto)
  const filteredMessages = selectedUser
    ? messages.filter(
        (msg) =>
          (msg.sender === currentUserId &&
            msg.recipient === selectedUser.uid) ||
          (msg.sender === selectedUser.uid && msg.recipient === currentUserId)
      )
    : [];

  // Slanje poruke
  const sendMessage = () => {
    // Dodatna provera da korisnik mora biti prijavljen pre slanja

    console.log("sendMessage funkcija je pozvana!"); // DODAJ OVO!

    if (!currentUser) {
      console.error("Greška: Nema prijavljenog korisnika za slanje poruke.");
      // Opcionalno, preusmeri korisnika na login stranicu ili prikaži poruku
      return;
    }

    if (!selectedUser || !input.trim()) {
      console.log("Pre-send check failed: selectedUser or input is missing.");
      console.log("Selected User:", selectedUser);
      console.log("Input:", input);
      return;
    }

    console.log("Attempting to send message...");
    console.log("Current User (auth.currentUser):", currentUser); // Ovo bi sada trebalo da je objekat korisnika
    console.log("Current User ID (currentUserId):", currentUserId); // Ovo bi sada trebalo da je UID korisnika
    console.log("Selected Recipient:", selectedUser);

    const messagesRef = ref(database, "messages/");
    const newMessage = {
      sender: currentUserId,
      senderDisplay: currentUserNameForDisplay,
      recipient: selectedUser.uid,
      recipientDisplay: selectedUser.display,
      text: input,
      timestamp: Date.now(),
    };

    // DODAJ OVE DVE LINIJE
    console.log(
      "  Sadržaj newMessage objekta:",
      JSON.stringify(newMessage, null, 2)
    );
    console.log("  Vrednost newMessage.sender:", newMessage.sender);

    push(messagesRef, newMessage)
      .then(() => {
        setInput("");
        console.log("Message sent successfully!");
      })
      .catch((err) => console.error("Greška pri slanju poruke:", err));
  };

  // Render logike
  return (
    <div className="chat-layout">
      {/* ... ostatak tvog render koda ostaje isti ... */}
      <div className="sidebar">
        <h3>Kontakti</h3>
        {/* Prikazati loading state ili poruku ako currentUser još nije učitan */}
        {!currentUser && <p>Učitavanje korisnika...</p>}
        {currentUser && availableUsers.length === 0 && (
          <p>Nema dostupnih kontakata. Registrirajte više korisnika!</p>
        )}
        {currentUser &&
          availableUsers.map((user) => (
            <div
              key={user.uid}
              className={`contact ${
                selectedUser && user.uid === selectedUser.uid ? "active" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.display}
            </div>
          ))}
      </div>

      <div className="chat-content">
        <div className="chat-header">
          {/* Prikazati poruku ako nema currentUser */}
          {!currentUser
            ? "Prijavite se za chat"
            : `💬 Chat sa ${selectedUser ? selectedUser.display : "..."}`}
        </div>

        <div className="chat-messages">
          {!currentUser && (
            <p className="no-chat-selected">
              Molimo prijavite se da biste videli poruke.
            </p>
          )}
          {currentUser && filteredMessages.length === 0 && !selectedUser && (
            <p className="no-chat-selected">
              Odaberite kontakt za početak razgovora.
            </p>
          )}
          {currentUser && filteredMessages.length === 0 && selectedUser && (
            <p className="no-chat-selected">Pošaljite prvu poruku!</p>
          )}
          {currentUser &&
            filteredMessages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${
                  msg.sender === currentUserId ? "sent" : "received"
                }`}
              >
                <div className="chat-meta">
                  {msg.senderDisplay} ➡ {msg.recipientDisplay}
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
            disabled={!selectedUser || !currentUser} // Onemogući input ako nije prijavljen ili odabran korisnik
          />
          <button
            onClick={sendMessage}
            disabled={!selectedUser || !input.trim() || !currentUser} // Onemogući gumb ako nema odabranog korisnika, teksta ili prijavljenog korisnika
          >
            📤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
