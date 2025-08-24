import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./RequestTable.module.css"; // ako koristiš CSS module

const zahtjevi = [
  {
    id: "001",
    korisnik: "lazar99",
    tip: "Promjena lozinke",
    datum: "2025-07-13",
  },
  // Dodaj još zahtjeva po potrebi
];

const RequestTable = () => {
  return (
    <div className={styles.container}>
      <h2>Pristigli zahtjevi</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID zahtjeva</th>
            <th>Korisnik</th>
            <th>Tip zahtjeva</th>
            <th>Datum</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {zahtjevi.map((z) => (
            <tr key={z.id}>
              <td>{z.id}</td>
              <td>{z.korisnik}</td>
              <td>{z.tip}</td>
              <td>{z.datum}</td>
              <td>
                <form
                  action="/odobri-zahtjev"
                  method="post"
                  style={{ display: "inline" }}
                >
                  <input type="hidden" name="idZahtjeva" value={z.id} />
                  <button type="submit" className={styles.actionBtn}>
                    <i className="fas fa-check"></i>
                  </button>
                </form>

                <form
                  action="/odbij-zahtjev"
                  method="post"
                  style={{ display: "inline" }}
                >
                  <input type="hidden" name="idZahtjeva" value={z.id} />
                  <button type="submit" className={styles.actionBtn}>
                    <i className="fas fa-times"></i>
                  </button>
                </form>

                <form
                  action="/detalji-zahtjeva"
                  method="get"
                  style={{ display: "inline" }}
                >
                  <input type="hidden" name="idZahtjeva" value={z.id} />
                  <button type="submit" className={styles.actionBtn}>
                    <i className="fas fa-info-circle"></i>
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
