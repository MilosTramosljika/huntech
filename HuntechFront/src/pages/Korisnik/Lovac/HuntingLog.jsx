// LovackiDnevnik.jsx
import React, { useEffect, useState } from "react";
import { Collapse, Spin, Table } from "antd";
import { Link } from "react-router-dom";
import {
  getObjaveByIdKorisnika,
  deleteObjavu,
} from "../../../services/objavaNaLovackiDnevnik.service.js";
import { getDogadjajiByObjava } from "../../../services/dogadjaj.service.js";
import styles from "./HuntingLog.module.css";

const LovackiDnevnik = () => {
  const [dnevnik, setDnevnik] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dogadjaji, setDogadjaji] = useState({});
  const [loadingDogadjaji, setLoadingDogadjaji] = useState({});

  useEffect(() => {
    getObjaveByIdKorisnika(3)
      .then((res) => {
        setDnevnik(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška pri učitavanju dnevnika:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Da li ste sigurni da želite obrisati ovaj zapis?")) {
      deleteObjavu(id)
        .then(() => {
          setDnevnik(dnevnik.filter((dan) => dan.id !== id));
        })
        .catch((err) => {
          console.error("Greška pri brisanju zapisa:", err);
        });
    }
  };

  const handleExpand = (keys) => {
    if (!keys || keys.length === 0) return;
    const key = String(keys[keys.length - 1]);

    if (dogadjaji[key]) return;

    setLoadingDogadjaji((prev) => ({ ...prev, [key]: true }));
    getDogadjajiByObjava(key)
      .then((res) => {
        setDogadjaji((prev) => ({ ...prev, [key]: res.data }));
        setLoadingDogadjaji((prev) => ({ ...prev, [key]: false }));
      })
      .catch((err) => {
        console.error("Greška pri učitavanju događaja:", err);
        setLoadingDogadjaji((prev) => ({ ...prev, [key]: false }));
      });
  };

  const columns = [
    { title: "Lokacija", dataIndex: "lokacija", key: "lokacija" },
    { title: "Vrsta divljači", dataIndex: "vrstaDivljaci", key: "vrstaDivljaci" },
    { title: "Korišteno oružje", dataIndex: "koristenoOruzje", key: "koristenoOruzje" },
  ];

  if (loading)
    return (
      <div className={styles.centered}>
        <Spin size="large" />
        <p>Učitavanje dnevnika...</p>
      </div>
    );

  if (!dnevnik.length)
    return (
      <div className={styles.centered}>
        <p>Nema zapisanih dana u dnevniku.</p>
        <Link to="/dodavanjeObjaveNaLD">
          <button className={styles.addEntryButton}>Dodaj novi zapis</button>
        </Link>
      </div>
    );

  return (
    <div className={styles.container}>
      <h2>Lovački dnevnik</h2>

      <Collapse
        onChange={handleExpand}
        items={dnevnik.map((dan) => ({
          key: String(dan.id),
          label: new Date(dan.datum).toLocaleDateString(),
          children: (
            <div>
              <p>
                <strong>Opis ulova:</strong> {dan.sadrzaj}
              </p>

              {dan.slikaZaObjavuNaLds?.length > 0 ? (
                <div className={styles.imageContainer}>
                  {dan.slikaZaObjavuNaLds.map((slika, i) => (
                    <img
                      key={i}
                      src={`http://localhost:8080/${slika.replace(/\\/g, "/")}`}
                      alt={`Ulov ${i + 1}`}
                      className={styles.image}
                    />
                  ))}
                </div>
              ) : (
                <p>Nema slika za ovaj ulov</p>
              )}

              <div className={styles.eventsSection}>
                {loadingDogadjaji[String(dan.id)] ? (
                  <Spin size="small" />
                ) : dogadjaji[String(dan.id)] ? (
                  <Table
                    columns={columns}
                    dataSource={dogadjaji[String(dan.id)] || []}
                    rowKey="id"
                    pagination={false}
                  />
                ) : (
                  <p>Kliknite na panel da učitate događaje.</p>
                )}
              </div>

              <div className={styles.entryButtons}>
                <Link to={`/uredjivanjeObjaveNaLD/${dan.id}`}>
                  <button className={styles.editButton}>Uredi zapis</button>
                </Link>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(dan.id)}
                >
                  Obriši zapis
                </button>
              </div>
            </div>
          ),
        }))}
      />

      <div className={styles.addEntryButtonContainer}>
        <Link to="/dodavanjeObjaveNaLD">
          <button className={styles.addEntryButton}>Dodaj novi zapis</button>
        </Link>
      </div>
    </div>
  );
};

export default LovackiDnevnik;
