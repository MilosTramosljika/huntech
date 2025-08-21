import React, { useState } from 'react';
import { createObjavu } from "../../services/objavaNaLovackiDnevnik.service.js"; 
import "./dodavanjeObjaveNaLD.css";

const DodavanjeLovackogDnevnika = () => {
  const [formData, setFormData] = useState({
    datum: "",
    lokacija: "",
    divljac: "",
    oruzje: "",
    zabiljeska: "",
    // prilog ćemo izbaciti za JSON jer fajl ne može direktno u JSON
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // formiraj JSON objekat
      const dataToSend = {
        datum: formData.datum,
        lokacija: formData.lokacija,
        divljac: formData.divljac,
        oruzje: formData.oruzje,
        zabiljeska: formData.zabiljeska,
      };

      await createObjavu(dataToSend); // ovo šalje JSON jer u servisu koristiš axios.post
      alert("✅ Zapis je uspješno dodat!");
      window.location.href = "/dnevnik"; 
    } catch (error) {
      console.error("Greška prilikom dodavanja zapisa:", error);
      alert("❌ Neuspješno dodavanje zapisa.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="heading">Dodaj novi zapis</h2>

      <label className="label">📅</label>
      <input
        type="date"
        name="datum"
        value={formData.datum}
        required
        onChange={handleChange}
        className="input"
      />

      <label className="label">📍</label>
      <input
        type="text"
        name="lokacija"
        value={formData.lokacija}
        required
        onChange={handleChange}
        className="input"
      />

      <label className="label">🦌</label>
      <input
        type="text"
        name="divljac"
        value={formData.divljac}
        required
        onChange={handleChange}
        className="input"
      />

      <label className="label">🔫</label>
      <input
        type="text"
        name="oruzje"
        value={formData.oruzje}
        required
        onChange={handleChange}
        className="input"
      />

      <label className="label">📝</label>
      <textarea
        name="zabiljeska"
        rows="4"
        value={formData.zabiljeska}
        onChange={handleChange}
        className="textarea"
      />

      {/* Ako backend kasnije bude podržavao upload fajla, mora se raditi FormData a ne JSON */}
      {/* <label className="label">📎</label>
      <input
        type="file"
        name="prilog"
        accept=".jpg,.jpeg,.png,.pdf,.docx"
        onChange={handleChange}
        className="input"
      /> */}

      <div className="actions">
        <button type="submit" className="buttonPrimary">
          ➕ Dodaj zapis
        </button>
        <button
          type="button"
          className="buttonSecondary"
          onClick={() => (window.location.href = "/dnevnik")}
        >
          🚪 Odustani
        </button>
      </div>
    </form>
  );
};

export default DodavanjeLovackogDnevnika;
