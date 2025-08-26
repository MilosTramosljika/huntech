import React, { useState } from "react";
import styles from "./InfoSection.module.css";

// PDF Viewer imports
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { LibraryBigIcon } from "lucide-react";

const InfoSection = () => {
  const [kategorija, setKategorija] = useState("");
  const [prikazi, setPrikazi] = useState(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleChange = (e) => {
    setKategorija(e.target.value);
    setPrikazi(false); // resetuje prikaz kad se promeni izbor
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!kategorija) return;
    console.log("Odabrana kategorija:", kategorija);
    setPrikazi(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <LibraryBigIcon />
        Lov Info Sekcija
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="kategorija">Odaberi kategoriju:</label>
        <select
          id="kategorija"
          name="kategorija"
          required
          value={kategorija}
          onChange={handleChange}
        >
          <option value="">-- Izaberi --</option>
          <option value="zakoni">📜 Lovački zakoni i pravilnici</option>
          <option value="oprema">🧢 Prodavnica lovačke opreme</option>
          <option value="recepti">🍲 Lovački recepti</option>
        </select>

        <button type="submit">Prikaži</button>
      </form>

      {prikazi && (
        <div className={styles.content}>
          {kategorija === "zakoni" && (
            <div className={styles.viewerWrapper}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl="/pdf/lovacki_zakoni.pdf"
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          )}

          {kategorija === "recepti" && (
            <div className={styles.viewerWrapper}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl="/pdf/lovacki_recepti.pdf"
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          )}

          {kategorija === "oprema" && (
            <iframe
              src="https://foxstillbijeljina.com/"
              width="100%"
              height="600px"
              title="Prodavnica opreme"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InfoSection;
