// --- START OF FIXED CODE ---
import React, { useState, useEffect } from "react";
import styles from "./GroupManagement.module.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  getObjaveByGrupa,
  createObjava,
  deleteObjava,
  updateObjava,
} from "../../../services/objavaService.service.js";
import { getGrupaById } from "../../../services/grupa.service.js";
import { sendHardcodedInvite } from "../../../services/poziv.service.js";
import { createKorisnikHasGrupa } from "../../../services/korisnikHasGrupa.service.js";
import { getUserByEmail } from "../../../services/korisnik.service.js";
import { getKorisnikHasGrupaByIdKorisnika } from "../../../services/korisnikHasGrupa.service.js";

const GroupManagement = () => {
  const [specialEventTitle, setSpecialEventTitle] = useState("");
  const [specialEventDesc, setSpecialEventDesc] = useState("");
  const [objave, setObjave] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [loadingObjave, setLoadingObjave] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [emailPozvanog, setEmailPozvanog] = useState("");
  const [poruka, setPoruka] = useState("");
  const [pozivMsg, setPozivMsg] = useState("");

  const [mape, setMape] = useState([]);
  const [showZahtjevi, setShowZahtjevi] = useState(false);
  const [zahtjevi, setZahtjevi] = useState([]);

  const [successMsg, setSuccessMsg] = useState("");
  //const navigate = useNavigate();
  const { id } = useParams();
  const [grupa, setGrupa] = useState(null);
  const navigate = useNavigate();

  const now = new Date();
  const localDateTime =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0") +
    "T" +
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0") +
    ":" +
    String(now.getSeconds()).padStart(2, "0");

  useEffect(() => {
    const fetchGrupa = async () => {
      try {
        const grupaObj = await getGrupaById(id);
        setGrupa(grupaObj);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGrupa();
  }, [id]);

  const fetchObjave = async () => {
    if (!grupa) return;
    setLoadingObjave(true);
    try {
      const objaveList = await getObjaveByGrupa(grupa.id);
      objaveList.sort(
        (a, b) =>
          new Date(b.datumObjavljivanja) - new Date(a.datumObjavljivanja)
      );
      setObjave(objaveList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingObjave(false);
    }
  };

  useEffect(() => {
    fetchObjave();
  }, [grupa]);

  // --- Nova objava ---
  const handleNewPostSubmit = async (e) => {
    e.preventDefault();

    try {
      const newObjava = {
        idGrupe: grupa?.id,
        idKorisnika: 3,
        tipObjave: "OBICNA",
        datumObjavljivanja: localDateTime,
        lajk: 0,
        dislajk: 0,
        nazivObjave: newPostTitle,
        sadrzaj: newPostContent,
      };
      await createObjava(newObjava);
      setNewPostTitle("");
      setNewPostContent("");
      setSuccessMsg("✅ Objava uspješno dodata!");
      setTimeout(() => setSuccessMsg(""), 7000);
      fetchObjave(); // refresh liste
    } catch (err) {
      console.error(err);
      alert("⚠️ Neuspjelo kreiranje objave");
    }
  };

  // --- Specijalni događaj ---
  const handleSpecialEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = {
        idGrupe: grupa?.id,
        idKorisnika: 3,
        tipObjave: "SPECDOGADJAJ",
        datumObjavljivanja: localDateTime,
        lajk: 0,
        dislajk: 0,
        nazivObjave: specialEventTitle,
        sadrzaj: specialEventDesc,
      };
      await createObjava(newEvent);
      setSpecialEventTitle("");
      setSpecialEventDesc("");
      setSuccessMsg("✅ Objava uspješno dodata!");
      setTimeout(() => setSuccessMsg(""), 7000);
      fetchObjave(); // refresh liste
    } catch (err) {
      console.error(err);
      alert("⚠️ Neuspjelo kreiranje događaja");
    }
  };

  // --- Brisanje ---
  const handleDeleteObjava = async (id) => {
    if (!window.confirm("Da li ste sigurni da želite obrisati ovu objavu?"))
      return;
    try {
      await deleteObjava(id);
      setSuccessMsg("🗑️ Objava obrisana!");
      alert("🗑️ Objava obrisana!"); // ← alert
      setTimeout(() => setSuccessMsg(""), 7000);
      fetchObjave();
    } catch (err) {
      console.error("Greška pri brisanju objave:", err.response || err);
      alert("⚠️ Greška prilikom brisanja objave");
    }
  };

  // --- Uređivanje ---
  const handleEditClick = (objava) => {
    setEditingId(objava.id);
    setEditTitle(objava.nazivObjave || "");
    setEditContent(objava.sadrzaj || "");
  };

  const handleUpdateObjava = async (e) => {
    e.preventDefault();
    try {
      const objavaZaUpdate = objave.find((o) => o.id === editingId);

      const updated = await updateObjava(editingId, {
        idGrupe: objavaZaUpdate.idGrupe,
        idKorisnika: objavaZaUpdate.idKorisnika,
        tipObjave: objavaZaUpdate.tipObjave,
        datumObjavljivanja: objavaZaUpdate.datumObjavljivanja,
        lajk: objavaZaUpdate.lajk,
        dislajk: objavaZaUpdate.dislajk,
        nazivObjave: editTitle,
        sadrzaj: editContent,
      });

      setEditingId(null);
      setEditTitle("");
      setEditContent("");
      setSuccessMsg("✏️ Objava uspješno uređena!");
      alert("✏️ Objava uspješno uređena!"); // ← alert
      setTimeout(() => setSuccessMsg(""), 7000);
      fetchObjave();
    } catch (err) {
      console.error(err);
      alert("⚠️ Neuspjelo uređivanje objave");
    }
  };

  const handleHardcodedInvite = async () => {
    try {
      const invitedUser = await sendHardcodedInvite("mmarko", grupa.id);
      setPozivMsg(`✅ Poziv poslat korisniku ${invitedUser.username}`);
      setTimeout(() => setPozivMsg(""), 7000);
    } catch (err) {
      console.error(err);
      setPozivMsg("⚠️ Greška prilikom slanja poziva");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        🔧 Upravljanje grupom: {grupa ? grupa.nazivGrupe : "Učitavanje..."}
      </h2>
      {successMsg && <div className={styles.successMessage}>{successMsg}</div>}

      {/* Specijalni događaj */}
      <section className={styles.panel}>
        <h3>🎯 Kreiranje specijalnog događaja</h3>
        <form onSubmit={handleSpecialEventSubmit}>
          <input
            type="text"
            placeholder="Naziv događaja"
            value={specialEventTitle}
            onChange={(e) => setSpecialEventTitle(e.target.value)}
            required
          />
          <textarea
            rows="3"
            placeholder="Opis događaja"
            value={specialEventDesc}
            onChange={(e) => setSpecialEventDesc(e.target.value)}
            required
          />
          <button type="submit">➕ Kreiraj specijalni događaj</button>
        </form>
      </section>

      {/* Nova objava */}
      <section className={styles.panel}>
        <h3>🗓️ Nova objava</h3>
        <form onSubmit={handleNewPostSubmit}>
          <input
            type="text"
            placeholder="Naziv objave"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            required
          />
          <textarea
            rows="4"
            placeholder="Unesi sadržaj objave..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            required
          />
          <button type="submit">📢 Objavi</button>
        </form>

        <h4>Postojeće objave:</h4>
        {loadingObjave ? (
          <p>Učitavanje...</p>
        ) : objave.length === 0 ? (
          <p>Trenutno nema objava.</p>
        ) : (
          <ul className={styles.list}>
            {objave.map((o) => (
              <li key={o.id} className={styles.objavaItem}>
                {editingId === o.id ? (
                  <form
                    onSubmit={handleUpdateObjava}
                    className={styles.editForm}
                  >
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                    />
                    <textarea
                      rows="3"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      required
                    />
                    <button type="submit">💾 Sačuvaj</button>
                    <button type="button" onClick={() => setEditingId(null)}>
                      ❎ Odustani
                    </button>
                  </form>
                ) : (
                  <>
                    <p>
                      <strong>{o.nazivObjave}</strong>
                      <br />
                      {o.sadrzaj}
                    </p>
                    <small>
                      Objavljeno:{" "}
                      {new Date(o.datumObjavljivanja).toLocaleString(
                        "sr-Latn-RS",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}{" "}
                      — 👍 {o.lajk} | 👎 {o.dislajk}
                    </small>
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleEditClick(o)}>
                        ✏️ Uredi
                      </button>
                      <button onClick={() => handleDeleteObjava(o.id)}>
                        🗑️ Obriši
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* 📥 Zahtjevi za učlanjenje */}
      <section className={styles.panel}>
        <h3>📥 Zahtjevi za učlanjenje</h3>
        <button onClick={() => navigate(`/GroupManagement/${grupa?.id}/zahtjevi`)}>
          👀 Pregledaj zahtjeve
        </button>
      </section>

      {showZahtjevi && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>📥 Zahtjevi za učlanjenje</h3>
            <div className={styles.scrollBox}>
              {zahtjevi.length === 0 ? (
                <p>Nema novih zahtjeva.</p>
              ) : (
                zahtjevi.map((z, i) => (
                  <div key={i} className={styles.zahtjevItem}>
                    <strong>{z.korisnik}</strong> — {z.datum}
                    <br />
                    <button onClick={() => console.log("Prihvati", z.korisnik)}>
                      ✅ Prihvati
                    </button>
                    <button onClick={() => console.log("Odbij", z.korisnik)}>
                      ❌ Odbij
                    </button>
                  </div>
                ))
              )}
            </div>
            <button onClick={() => setShowZahtjevi(false)}>❎ Zatvori</button>
          </div>
        </div>
      )}

      {/* 📤 Poziv za učlanjenje */}
      <section className={styles.panel}>
        <h3>📤 Pozovi člana</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              // prvo pronađi korisnika po emailu
              const { data: korisnik } = await getUserByEmail(emailPozvanog);

              // provjeri da li korisnik već ima poziv za ovu grupu
              const { data: postojeciPozivi } = await getKorisnikHasGrupaByIdKorisnika(korisnik.id);
              const vecPoslatPoziv = postojeciPozivi.some(
                (p) =>
                  p.idGrupe === grupa.id &&
                  p.statusZaClanstvo === "poslatPozivOdDirektora",
              );

              if (vecPoslatPoziv) {
                setPozivMsg(
                  `⚠️ Korisnik ${korisnik.mail} već ima poziv za ovu grupu`,
                );
                setTimeout(() => setPozivMsg(""), 7000);
                return; // prekini funkciju
              }

              // napravi payload za grupu
              const payload = {
                idKorisnika: korisnik.id,
                idGrupe: grupa.id,
                statusZaClanstvo: "poslatPozivOdDirektora",
                datumUclanjivanja: new Date().toISOString().split("T")[0],
              };

              await createKorisnikHasGrupa(payload);

              setEmailPozvanog("");
              setPoruka("");
              setPozivMsg(`✅ Poziv poslat korisniku ${korisnik.username}`);
              setTimeout(() => setPozivMsg(""), 7000);
            } catch (err) {
              console.error(err);
              setPozivMsg("⚠️ Greška prilikom slanja poziva");
            }
          }}
        >
          <input
            type="email"
            placeholder="Unesi email korisnika"
            value={emailPozvanog}
            onChange={(e) => setEmailPozvanog(e.target.value)}
            required
          />
          <textarea
            rows="2"
            placeholder="Dodaj poruku (opcionalno)"
            value={poruka}
            onChange={(e) => setPoruka(e.target.value)}
          />
          <button type="submit">📨 Pošalji poziv</button>
        </form>
        {pozivMsg && <p>{pozivMsg}</p>}
      </section>


      {/* 🗺️ Moje lovačke mape
      <section className={styles.panel}>
        <h3>🗺️ Moje lovačke mape</h3>
        <ul className={styles.list}>
          {mape.map((m) => (
            <li key={m.id}>
              <strong>{m.naziv}</strong>
              <br />
              Kreirano: {m.datum}
              <br />
              Zona: {m.zona}, POI: {m.poi} tačke
              <br />
              <button
                onClick={() => (window.location.href = `/uredi-mapu/${m.id}`)}
              >
                ✏️ Uredi
              </button>
              <button onClick={() => console.log(`Obriši mapu ${m.id}`)}>
                🗑️ Obriši
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => (window.location.href = "/nova-mapa")}>
          ➕ Kreiraj novu mapu
        </button>
      </section> */}

      {/* 🗺️ Lovne zone
      <section className={styles.panel}>
        <h3>🗺️ Lovne zone i POI</h3>
        <p>
          Zona: <em>Jaružani – planinski greben</em>
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => (window.location.href = "/zona-uredi/001")}>
            ⚙️ Uredi zonu
          </button>
          <button
            onClick={() => (window.location.href = "/dodaj-tacku-interesa")}
          >
            📍 Dodaj POI
          </button>
        </div>
      </section> */}

      {/* Modal za zahtjeve */}
      {showZahtjevi && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>📥 Zahtjevi za učlanjenje</h3>
            <div className={styles.scrollBox}>
              {zahtjevi.map((z, i) => (
                <div key={i} className={styles.zahtjevItem}>
                  <strong>{z.korisnik}</strong> — {z.datum}
                  <br />
                  <button>✅ Prihvati</button>
                  <button>❌ Odbij</button>
                </div>
              ))}
            </div>
            <button onClick={() => setShowZahtjevi(false)}>❎ Zatvori</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManagement;
