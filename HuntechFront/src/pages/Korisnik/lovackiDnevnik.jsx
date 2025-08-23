// LovackiDnevnik.jsx
import React, { useEffect, useState } from "react";
import { Collapse, Spin, Button, Table } from "antd";
import { Link } from "react-router-dom";
import {
  getObjaveByIdKorisnika,
  deleteObjavu,
} from "../../services/objavaNaLovackiDnevnik.service.js";
import { getDogadjajiByObjava } from "../../services/dogadjaj.service.js";
import "./lovackiDnevnik.css";

const LovackiDnevnik = () => {
  const [dnevnik, setDnevnik] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dogadjaji, setDogadjaji] = useState({}); // { [objavaId]: [dogadjaji] }
  const [loadingDogadjaji, setLoadingDogadjaji] = useState({}); // { [objavaId]: true/false }

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
    if (!keys || keys.length === 0) return; // ništa otvoreno
    const key = String(keys[keys.length - 1]); // uvijek string

    if (dogadjaji[key]) return; // već učitano

    setLoadingDogadjaji((prev) => ({ ...prev, [key]: true }));
    console.log("Učitavanje događaja za objavu ID:", key);

    getDogadjajiByObjava(key)
      .then((res) => {
        setDogadjaji((prev) => ({ ...prev, [key]: res.data }));
        setLoadingDogadjaji((prev) => ({ ...prev, [key]: false }));
        console.log("Događaji učitani za objavu ID:", key, res.data);
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
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
        <p>Učitavanje dnevnika...</p>
      </div>
    );

  if (!dnevnik.length)
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Nema zapisanih dana u dnevniku.</p>
        <Link to="/dodavanjeObjaveNaLD">
          <button className="add-entry-button">Dodaj novi zapis</button>
        </Link>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lovački dnevnik</h2>

      <Collapse
        onChange={handleExpand}
        items={dnevnik.map((dan) => ({
          key: String(dan.id), // ključ uvijek string
          label: new Date(dan.datum).toLocaleDateString(),
          children: (
            <div>
              <p>
                <strong>Opis ulova:</strong> {dan.sadrzaj}
              </p>

              {dan.slikaZaObjavuNaLds?.length > 0 ? (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {dan.slikaZaObjavuNaLds.map((slika, i) => (
                    <img
                      key={i}
                      src={`http://localhost:8080/${slika.replace(/\\/g, "/")}`}
                      alt={`Ulov ${i + 1}`}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p>Nema slika za ovaj ulov</p>
              )}

              {/* Tabela sa događajima */}
              <div style={{ marginTop: "20px" }}>
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

              {/* Dugmad za uređivanje i brisanje */}
              <div className="entry-buttons">
                <Link to={`/uredjivanjeObjaveNaLD/${dan.id}`}>
                  <button className="edit-button">Uredi zapis</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(dan.id)}>
                  Obriši zapis
                </button>
              </div>
            </div>
          ),
        }))}
      />

      {/* Dugme za dodavanje novog zapisa */}
      <div className="add-entry-button-container">
        <Link to="/dodavanjeObjaveNaLD">
          <button className="add-entry-button">Dodaj novi zapis</button>
        </Link>
      </div>
    </div>
  );
};

export default LovackiDnevnik;
