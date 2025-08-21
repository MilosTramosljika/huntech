import React, { useState } from 'react';
import "./uredjivanjeLovackogDnevnika.css";

const UredjivanjeLovackogDnevnika  = () => {
  const [formData, setFormData] = useState({
    zapisId: '001',
    datum: '2025-07-18',
    lokacija: 'Jaružani kod stare česme',
    divljac: 'Srndać',
    oruzje: 'Karabin .308',
    zabiljeska: 'Primećen u pokretu, odstrijel u šipražju.',
    prilog: null,
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
    console.log('Sačuvane izmjene:', formData);
    // TODO: slanje ka backendu
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="heading">Uredi zapis</h2>

      <input type="hidden" name="zapisId" value={formData.zapisId} />

      <label className="label">📅 Datum:</label>
      <input
        type="date"
        name="datum"
        value={formData.datum}
        required
        onChange={handleChange}
        className="input"
      />

      <label className="label">📍 Lokacija:</label>
      <input
        type="text"
        name="lokacija"
        value={formData.lokacija}
        required
        onChange={handleChange}
        className="input"
      />

      <label className="label">🦌 Vrsta divljači:</label>
      <input
        type="text"
        name="divljac"
        value={formData.divljac}
        required
        onChange={handleChange}
        className="input"
      />

      <label className="label">🔫 Korišteno oružje:</label>
      <input
        type="text"
        name="oruzje"
        value={formData.oruzje}
        required
        onChange={handleChange}
        className="input"
      />

      <label className="label">📝 Beleška:</label>
      <textarea
        name="zabiljeska"
        rows="4"
        value={formData.zabiljeska}
        onChange={handleChange}
        className="textarea"
      />

      <label className="label">📎 Promeni/priloži dokument:</label>
      <input
        type="file"
        name="prilog"
        accept=".jpg,.jpeg,.png,.pdf,.docx"
        onChange={handleChange}
        className="input"
      />

      <div className="actions">
        <button type="submit" className="buttonPrimary">
          💾 Sačuvaj izmjene
        </button>
        <button
          type="button"
          className="buttonSecondary"
          onClick={() => (window.location.href = '/dnevnik')}
        >
          🚪 Odustani
        </button>
      </div>
    </form>
  );
};

export default UredjivanjeLovackogDnevnika ;
