import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createObjavu,
  getObjavuById,
  updateObjavu,
} from "../../services/objavaNaLovackiDnevnik.service.js";
import {
  createDogadjaj,
  getDogadjajiByObjava,
  updateDogadjaj,
  deleteDogadjaj,
} from "../../services/dogadjaj.service.js";
import "./objavaNaLD.css";

const DodavanjeLovackogDnevnika = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Ako postoji → uređivanje, inače → dodavanje
  const [deletedDogadjajiIds, setDeletedDogadjajiIds] = useState([]);

  const [formData, setFormData] = useState({
    datum: "",
    sadrzaj: "",
    dogadjaji: [{ lokacija: "", vrstaDivljaci: "", koristenoOruzje: "" }],
    idKorisnika: 3, // privremeno, kasnije iz autentifikacije
  });

  // Ako uređujemo → učitavanje podataka
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const objavaRes = await getObjavuById(id);

          // posebno dohvatamo dogadjaje za tu objavu
          const dogadjajiRes = await getDogadjajiByObjava(id);

          setFormData({
            datum: objavaRes.data.datum.split("T")[0],
            sadrzaj: objavaRes.data.sadrzaj,
            idKorisnika: objavaRes.data.idKorisnika,
            dogadjaji: dogadjajiRes.data.map(d => ({
              id: d.id, // ključan podatak!
              lokacija: d.lokacija,
              vrstaDivljaci: d.vrstaDivljaci,
              koristenoOruzje: d.koristenoOruzje,
            })),
          });
        } catch (err) {
          console.error("Greška prilikom učitavanja objave i događaja:", err);
        }
      };

    fetchData();
  }
}, [id]);

  // Promjena polja
  const handleChange = (e, index, field) => {
    if (field) {
      const newDogadjaji = [...formData.dogadjaji];
      newDogadjaji[index][field] = e.target.value;
      setFormData((prev) => ({
        ...prev,
        dogadjaji: newDogadjaji,
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Dodavanje/brisanje događaja
  const addDogadjaj = () => {
    setFormData((prev) => ({
      ...prev,
      dogadjaji: [
        ...prev.dogadjaji,
        { lokacija: "", vrstaDivljaci: "", koristenoOruzje: "" },
      ],
    }));
  };

  const removeDogadjaj = (index) => {
    const removed = formData.dogadjaji[index];

    // Ako događaj već ima ID (postoji u bazi), dodaj u listu za brisanje
    if (removed.id) {
      setDeletedDogadjajiIds((prev) => [...prev, removed.id]);
    }

    // Ukloni događaj iz state-a da nestane sa forme
    setFormData((prev) => ({
      ...prev,
      dogadjaji: prev.dogadjaji.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let idObjaveNaLD = id;

      // 1️⃣ Kreiranje ili update objave
      if (!id) {
        const newObjava = {
          datum: new Date(formData.datum).toISOString(),
          sadrzaj: formData.sadrzaj,
          idKorisnika: formData.idKorisnika,
        };
        const objavaRes = await createObjavu(newObjava);
        idObjaveNaLD = objavaRes.data.id;
      } else {
        const updateObjavaData = {
          id: idObjaveNaLD,
          datum: new Date(formData.datum).toISOString(),
          sadrzaj: formData.sadrzaj,
          idKorisnika: formData.idKorisnika,
        };
        await updateObjavu(id, updateObjavaData);
      }

      // 2️⃣ Kreiranje ili update događaja
      for (let d of formData.dogadjaji) {
        if (d.id) {
          const updateDog = { 
            id: d.id,
            lokacija: d.lokacija,
            vrstaDivljaci: d.vrstaDivljaci,
            koristenoOruzje: d.koristenoOruzje,
            idObjaveNaLD: idObjaveNaLD
          };
          await updateDogadjaj(d.id, updateDog);
        } else {
          const newDog = { 
            lokacija: d.lokacija,
            vrstaDivljaci: d.vrstaDivljaci,
            koristenoOruzje: d.koristenoOruzje,
            idObjaveNaLD: idObjaveNaLD,
          };
          await createDogadjaj(newDog);
        }
      }

      // 3️⃣ Brisanje obrisanih događaja
      for (let deletedId of deletedDogadjajiIds) {
        await deleteDogadjaj(deletedId);
      }

      // 4️⃣ Očisti listu obrisanih događaja
      setDeletedDogadjajiIds([]);

      alert("Sačuvano!");
      navigate("/lovackiDnevnik"); // ⬅⬅⬅ ovo vraća na LovackiDnevnik.jsx
    } catch (err) {
      console.error("❌ Greška prilikom čuvanja:", err);
      alert("Greška prilikom čuvanja!");
    }
  };





  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="heading">
        {id ? "Uredi objavu" : "Dodaj novi zapis"}
      </h2>

      {/* 📅 Datum */}
      <label className="label">📅 Datum</label>
      <input
        type="date"
        name="datum"
        value={formData.datum}
        required
        onChange={handleChange}
        className="input"
      />

      {/* Dinamički događaji */}
      <h3 className="subheading">Događaji</h3>
      {formData.dogadjaji.map((dogadjaj, index) => (
        <div key={index} className="dogadjaj-box">
          <label className="label">📍 Lokacija</label>
          <input
            type="text"
            value={dogadjaj.lokacija}
            required
            onChange={(e) => handleChange(e, index, "lokacija")}
            className="input"
          />

          <label className="label">🦌 Vrsta divljači</label>
          <input
            type="text"
            value={dogadjaj.vrstaDivljaci}
            required
            onChange={(e) => handleChange(e, index, "vrstaDivljaci")}
            className="input"
          />

          <label className="label">🔫 Vrsta oružja</label>
          <input
            type="text"
            value={dogadjaj.koristenoOruzje}
            required
            onChange={(e) => handleChange(e, index, "koristenoOruzje")}
            className="input"
          />

          <div className="dogadjaj-actions">
            <button
              type="button"
              className="buttonRemove"
              onClick={() => removeDogadjaj(index)}
            >
              ❌ Ukloni
            </button>
          </div>
        </div>
      ))}

      <button type="button" className="buttonSecondary" onClick={addDogadjaj}>
        ➕ Dodaj novi događaj
      </button>

      {/* 📝 Opis */}
      <label className="label">📝 Opis</label>
      <textarea
        name="sadrzaj"
        rows="4"
        value={formData.sadrzaj}
        onChange={handleChange}
        className="textarea"
      />

      {/* Dugmad */}
      <div className="actions">
        <button type="submit" className="buttonPrimary">
          {id ? "💾 Sačuvaj promjene" : "✅ Sačuvaj objavu"}
        </button>
        <button
          type="button"
          className="buttonSecondary"
          onClick={() => navigate("/dnevnik")}
        >
          🚪 Odustani
        </button>
      </div>
    </form>
  );
};

export default DodavanjeLovackogDnevnika;
