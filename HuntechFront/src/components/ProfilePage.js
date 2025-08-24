// src/components/ProfilePage.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebaseConfig";
import { ref, onValue, off, update } from "firebase/database";

function ProfilePage() {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    email: "",
    username: "",
    ime: "",
    prezime: "",
    lokacija: "",
    bio: "",
    brojTelefona: "",
    adresa: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const userProfileRef = ref(database, "users/" + currentUser.uid);

    const unsubscribe = onValue(
      userProfileRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setProfileData({
            email: data.email || currentUser.email,
            username: data.username || "",
            ime: data.ime || "",
            prezime: data.prezime || "",
            lokacija: data.lokacija || "",
            bio: data.bio || "",
            brojTelefona: data.brojTelefona || "",
            adresa: data.adresa || "",
          });
          setError(null);
        } else {
          // Ako profil ne postoji, postavi default vrednosti
          setProfileData({
            email: currentUser.email,
            username: "",
            ime: "",
            prezime: "",
            lokacija: "",
            bio: "",
            brojTelefona: "",
            adresa: "",
          });
        }
        setLoading(false);
      },
      (dbError) => {
        console.error("Greška pri čitanju profila:", dbError);
        setError("Greška pri učitavanju profila.");
        setLoading(false);
      }
    );

    return () => off(userProfileRef, "value", unsubscribe);
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    if (!currentUser) return;
    setMessage(null);
    setError(null);

    try {
      const userProfileRef = ref(database, "users/" + currentUser.uid);
      await update(userProfileRef, {
        username: profileData.username,
        ime: profileData.ime,
        prezime: profileData.prezime,
        lokacija: profileData.lokacija,
        bio: profileData.bio,
        brojTelefona: profileData.brojTelefona,
        adresa: profileData.adresa,
      });

      setMessage("Profil uspešno ažuriran!");
      setIsEditing(false);
    } catch (dbError) {
      console.error("Greška pri ažuriranju profila:", dbError);
      setError("Greška pri ažuriranju profila.");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Učitavanje profila...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Moj Profil</h2>

      {message && (
        <p style={{ color: "green", marginBottom: "15px" }}>{message}</p>
      )}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      {!isEditing ? (
        // Mod prikaza profila
        <div>
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
          <p>
            <strong>Korisničko ime:</strong>{" "}
            {profileData.username || "Nije postavljeno"}
          </p>
          <p>
            <strong>Ime:</strong> {profileData.ime}
          </p>
          <p>
            <strong>Prezime:</strong> {profileData.prezime}
          </p>
          <p>
            <strong>Broj telefona:</strong>{" "}
            {profileData.brojTelefona || "Nije postavljeno"}
          </p>
          <p>
            <strong>Adresa:</strong> {profileData.adresa || "Nije postavljeno"}
          </p>
          <p>
            <strong>Lokacija:</strong>{" "}
            {profileData.lokacija || "Nije postavljeno"}
          </p>
          <p>
            <strong>Bio:</strong> {profileData.bio || "Nije postavljeno"}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            Uredi Profil
          </button>
        </div>
      ) : (
        // Mod uređivanja profila
        <div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Email (Ne može se menjati):
            </label>
            <input
              type="email"
              value={profileData.email}
              disabled
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                background: "#eee",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Korisničko ime:
            </label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Ime:
            </label>
            <input
              type="text"
              name="ime"
              value={profileData.ime}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Prezime:
            </label>
            <input
              type="text"
              name="prezime"
              value={profileData.prezime}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Broj telefona:
            </label>
            <input
              type="text"
              name="brojTelefona"
              value={profileData.brojTelefona}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Adresa:
            </label>
            <input
              type="text"
              name="adresa"
              value={profileData.adresa}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Lokacija:
            </label>
            <input
              type="text"
              name="lokacija"
              value={profileData.lokacija}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Bio:
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              rows="4"
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            ></textarea>
          </div>

          <button
            onClick={handleUpdateProfile}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Sačuvaj Promene
          </button>

          <button
            onClick={() => setIsEditing(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Odustani
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
