import React, { useState } from "react";
import styles from "./Comments.module.css";

const Comments = () => {
  const [comments] = useState([
    {
      korisnik: "milena_hunt",
      avatar: "avatar1.jpg",
      datum: "2025-08-21 09:15",
      tekst: "Slažem se s izvještajem — sve je precizno obrađeno.",
    },
    {
      korisnik: "vuk_balkan",
      avatar: "avatar2.jpg",
      datum: "2025-08-21 10:02",
      tekst: "Možda dodati fotografije trofeja kao prilog uz izvještaj?",
    },
  ]);

  const [formData, setFormData] = useState({
    naslov: "",
    sadrzaj: "",
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
    console.log("Nova objava:", formData);
    // TODO: slanje ka backendu
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Komentari</h2>

      <div className={styles.commentList}>
        {comments.map((c, i) => (
          <div key={i} className={styles.comment}>
            <strong>
              <img src={c.avatar} alt="avatar" className={styles.avatar} />{" "}
              {c.korisnik}
            </strong>
            <br />
            <small>Objavljeno: {c.datum}</small>
            <p>{c.tekst}</p>
          </div>
        ))}
      </div>

      <hr className={styles.divider} />

      <h2 className={styles.heading}>Objavi nešto</h2>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label>Naslov objave:</label>
        <input
          type="text"
          name="naslov"
          placeholder="Npr. Lov u zoru kod Plivskog jezera"
          required
          onChange={handleChange}
        />

        <label>Tekst objave:</label>
        <textarea
          name="sadrzaj"
          rows="4"
          placeholder="Podijeli iskustvo sa članovima..."
          required
          onChange={handleChange}
        />

        <label>Dodaj sliku ili dokument (opciono):</label>
        <input
          type="file"
          name="prilog"
          accept=".jpg,.jpeg,.png,.pdf,.docx"
          onChange={handleChange}
        />

        <button type="submit">Objavi</button>
      </form>
    </div>
  );
};

export default Comments;
