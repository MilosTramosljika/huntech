import React, { useState, useEffect } from "react";
import styles from "./StatusForm.module.css";

const StatusForm = () => {
  const [formData, setFormData] = useState({
    korisnickoIme: "milena_hunt",
    email: "milena@example.com",
    ime: "Milena",
    prezime: "Stojanović",
    telefon: "+387 65 456 789",
    bio: "Lovkinja iz Hercegovine, aktivna u lokalnim udruženjima.",
    lovackiPsi: "Ajk – ptičar",
    arsenal: "Karabin .308",
    dokumenti: null,
  });

  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔄 Povuci status iz baze
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/status/${formData.korisnickoIme}`);
        const data = await res.json();
        setStatus(data.status || "Nepoznat");
      } catch (err) {
        console.error("Greška pri učitavanju statusa:", err);
        setStatus("Greška");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [formData.korisnickoIme]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) payload.append(key, value);
      });

      await fetch("/api/izmijeni-registraciju", {
        method: "POST",
        body: payload,
      });

      setSuccess(true);
    } catch (err) {
      console.error("Greška pri slanju izmjena:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Status vašeg zahtjeva za registraciju</h2>
      {loading ? (
        <p className={styles.status}>⏳ Učitavanje statusa...</p>
      ) : (
        <p className={styles.status}>
          Trenutni status: <strong>{status}</strong>
        </p>
      )}
      <p className={styles.info}>
        Administrator će pregledati vaš zahtjev i obavijestiti vas putem emaila.
      </p>

      <hr className={styles.divider} />

      <h3 className={styles.subheading}>Izmijeni podatke u zahtjevu</h3>

      {success && <div className={styles.success}>✅ Izmjene su sačuvane.</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Korisničko ime:</label>
        <input
          type="text"
          name="korisnickoIme"
          value={formData.korisnickoIme}
          required
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
        />

        <label>Ime:</label>
        <input
          type="text"
          name="ime"
          value={formData.ime}
          onChange={handleChange}
        />

        <label>Prezime:</label>
        <input
          type="text"
          name="prezime"
          value={formData.prezime}
          onChange={handleChange}
        />

        <label>Telefon:</label>
        <input
          type="tel"
          name="telefon"
          value={formData.telefon}
          onChange={handleChange}
        />

        <label>Kratke informacije o sebi:</label>
        <textarea
          name="bio"
          rows="4"
          value={formData.bio}
          onChange={handleChange}
        />

        <label>Promijeni prilog (ako je potrebno):</label>
        <input
          type="file"
          name="dokumenti"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleChange}
        />

        <label>Lovački psi (opciono):</label>
        <textarea
          name="lovackiPsi"
          rows="2"
          value={formData.lovackiPsi}
          onChange={handleChange}
        />

        <label>Arsenal oružja (opciono):</label>
        <input
          type="text"
          name="arsenal"
          value={formData.arsenal}
          onChange={handleChange}
        />

        <button type="submit" className={styles.submitBtn}>
          Sačuvaj izmjene
        </button>
      </form>
    </div>
  );
};

export default StatusForm;
