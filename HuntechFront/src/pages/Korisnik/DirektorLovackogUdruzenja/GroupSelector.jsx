import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GroupSelector.module.css";

// servis
import { getGrupe } from "../../../services/grupa.service.js";

export default function GroupSelector() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGrupe();
        setGroups(data);
      } catch (err) {
        setError("Greška prilikom učitavanja grupa: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGroup) {
      navigate(`/GroupManagement/${selectedGroup}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.welcome}>
        Dobrodošao, Direktor Lovačkog udruženja
      </h1>
      <h2 className={styles.heading}>📂 Moje grupe u nadležnosti</h2>

      {loading && <p>⏳ Učitavam grupe...</p>}
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      {!loading && !error && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="grupa">Odaberi grupu za pregled:</label>
          <select
            id="grupa"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            required
          >
            <option value="">-- Izaberi grupu --</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nazivGrupe} - {g.opis}
              </option>
            ))}
          </select>
          <button type="submit" className={styles.submitBtn}>
            📁 Prikaži grupu
          </button>
        </form>
      )}

      {/* Opcionalni prikaz slike */}
      {!loading && !error && selectedGroup && (
        <div className={styles.preview}>
          {groups
            .filter((g) => g.id.toString() === selectedGroup.toString())
            .map((g) => (
              <div key={g.id}>
                <h3>{g.nazivGrupe}</h3>
                <p>{g.opis}</p>
                {g.slika && (
                  <img
                    src={`http://localhost:8080${g.slika}`}
                    alt={g.nazivGrupe}
                    className={styles.groupImage}
                  />
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
