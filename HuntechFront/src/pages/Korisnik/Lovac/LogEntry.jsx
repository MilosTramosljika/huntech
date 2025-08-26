import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createObjavu,
  getObjavuById,
  updateObjavu,
} from "../../../services/objavaNaLovackiDnevnik.service.js";
import {
  createDogadjaj,
  getDogadjajiByObjava,
  updateDogadjaj,
  deleteDogadjaj,
} from "../../../services/dogadjaj.service.js";
import styles from "./LogEntry.module.css"; // ⬅ CSS Modul

const DodavanjeLovackogDnevnika = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deletedDogadjajiIds, setDeletedDogadjajiIds] = useState([]);

  const [formData, setFormData] = useState({
    datum: "",
    sadrzaj: "",
    dogadjaji: [{ lokacija: "", vrstaDivljaci: "", koristenoOruzje: "" }],
    idKorisnika: 3,
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const objavaRes = await getObjavuById(id);
          const dogadjajiRes = await getDogadjajiByObjava(id);

          setFormData({
            datum: objavaRes.data.datum.split("T")[0],
            sadrzaj: objavaRes.data.sadrzaj,
            idKorisnika: objavaRes.data.idKorisnika,
            dogadjaji: dogadjajiRes.data.map((d) => ({
              id: d.id,
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
    if (removed.id) {
      setDeletedDogadjajiIds((prev) => [...prev, removed.id]);
    }
    setFormData((prev) => ({
      ...prev,
      dogadjaji: prev.dogadjaji.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let idObjaveNaLD = id;

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

      for (let d of formData.dogadjaji) {
        if (d.id) {
          const updateDog = {
            id: d.id,
            lokacija: d.lokacija,
            vrstaDivljaci: d.vrstaDivljaci,
            koristenoOruzje: d.koristenoOruzje,
            idObjaveNaLD: idObjaveNaLD,
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

      for (let deletedId of deletedDogadjajiIds) {
        await deleteDogadjaj(deletedId);
      }

      setDeletedDogadjajiIds([]);

      alert("Sačuvano!");
      navigate("/dnevnik");
    } catch (err) {
      console.error("❌ Greška prilikom čuvanja:", err);
      alert("Greška prilikom čuvanja!");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>
        {id ? "Uredi objavu" : "Dodaj novi zapis"}
      </h2>

      <label className={styles.label}>📅 Datum</label>
      <input
        type="date"
        name="datum"
        value={formData.datum}
        required
        onChange={handleChange}
        className={styles.input}
      />

      <h3 className={styles.subheading}>Događaji</h3>
      {formData.dogadjaji.map((dogadjaj, index) => (
        <div key={index} className={styles["dogadjaj-box"]}>
          <label className={styles.label}>📍 Lokacija</label>
          <input
            type="text"
            value={dogadjaj.lokacija}
            required
            onChange={(e) => handleChange(e, index, "lokacija")}
            className={styles.input}
          />

          <label className={styles.label}>🦌 Vrsta divljači</label>
          <input
            type="text"
            value={dogadjaj.vrstaDivljaci}
            required
            onChange={(e) => handleChange(e, index, "vrstaDivljaci")}
            className={styles.input}
          />

          <label className={styles.label}>🔫 Vrsta oružja</label>
          <input
            type="text"
            value={dogadjaj.koristenoOruzje}
            required
            onChange={(e) => handleChange(e, index, "koristenoOruzje")}
            className={styles.input}
          />

          <div className={styles["dogadjaj-actions"]}>
            <button
              type="button"
              className={styles.buttonRemove}
              onClick={() => removeDogadjaj(index)}
            >
              ❌ Ukloni
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className={styles.buttonSecondary}
        onClick={addDogadjaj}
      >
        ➕ Dodaj novi događaj
      </button>

      <label className={styles.label}>📝 Opis</label>
      <textarea
        name="sadrzaj"
        rows="4"
        value={formData.sadrzaj}
        onChange={handleChange}
        className={styles.textarea}
      />

      <div className={styles.actions}>
        <button type="submit" className={styles.buttonPrimary}>
          {id ? "💾 Sačuvaj promjene" : "✅ Sačuvaj objavu"}
        </button>
        <button
          type="button"
          className={styles.buttonSecondary}
          onClick={() => navigate("/dnevnik")}
        >
          🚪 Odustani
        </button>
      </div>
    </form>
  );
};

export default DodavanjeLovackogDnevnika;
