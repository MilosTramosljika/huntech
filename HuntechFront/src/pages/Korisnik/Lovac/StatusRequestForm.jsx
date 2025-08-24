import React, { useState } from "react";
import styles from "./StatusRequestForm.module.css";

const StatusRequestForm = () => {
  const [formData, setFormData] = useState({
    noviStatus: "Lovac",
    obrazlozenje: "",
    dokumentacija: null,
    akcija: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Zahtjev poslan:", formData);
    // TODO: slanje ka backendu
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2 className={styles.heading}>Zahtjev za promjenu statusa</h2>

      <label>Novi status:</label>
      <select
        name="noviStatus"
        value={formData.noviStatus}
        onChange={handleChange}
      >
        <option>Lovac</option>
        <option>Direktor mjesne zajednice</option>
        <option>Direktor lovačkog udruženja</option>
      </select>

      <label>Obrazloženje zahtjeva:</label>
      <textarea
        name="obrazlozenje"
        rows="4"
        placeholder="Objasnite zašto tražite promjenu statusa..."
        required
        value={formData.obrazlozenje}
        onChange={handleChange}
      />

      <label>Priloži dokumentaciju (PDF, slike, potvrde...):</label>
      <input
        type="file"
        name="dokumentacija"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleChange}
      />

      <div className={styles.actions}>
        <button
          type="submit"
          onClick={() =>
            setFormData((prev) => ({ ...prev, akcija: "Pošalji zahtjev" }))
          }
        >
          📤 Pošalji zahtjev
        </button>
        <button
          type="button"
          onClick={() => (window.location.href = "/profil")}
        >
          ❌ Otkaži
        </button>
      </div>
    </form>
  );
};

export default StatusRequestForm;
