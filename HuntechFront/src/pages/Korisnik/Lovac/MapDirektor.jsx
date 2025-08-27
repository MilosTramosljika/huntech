import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import styles from "./Map.module.css";

import dogImg from "../../../images/pins_for_map/dog.jpg";

// servisi
import {
  getPinsByIdGrupe,
  createPin,
  deletePin,
} from "../../../services/pinNaMapi.service.js";
import {
  getZonasByIdGrupe,
  createZona,
  deleteZona,
} from "../../../services/zonaLova.service.js";

// Ikone
const hunterIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
  iconSize: [30, 30],
});
const dogIcon = new L.Icon({
  iconUrl: dogImg,
  iconSize: [25, 25],
});
const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 25],
});

// Pin dodavanje
function PinAdder({ addPinMode, setPins }) {
  const map = useMap();
  const [clickLatLng, setClickLatLng] = useState(null);

  useMapEvents({
    click(e) {
      if (!addPinMode) return;
      setClickLatLng(e.latlng);

      const popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(createPopupContent(e.latlng))
        .openOn(map);
    },
  });

  const createPopupContent = (latlng) => {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.gap = "5px";

    const types = [
      { label: "Životinja", value: "zivotinja" },
      { label: "Pas", value: "pas" },
      { label: "Lovac", value: "lovac" },
      { label: "Trofej", value: "trofej" },
      { label: "Tačka od interesa", value: "tackaOdInteresa" },
    ];

    types.forEach(({ label, value }) => {
      const btn = document.createElement("button");
      btn.innerText = label;
      btn.style.cursor = "pointer";
      btn.onclick = async () => {
        const newPin = {
          latitude: latlng.lat,
          longitude: latlng.lng,
          tipPina: value,
          idGrupe: 2,
          idZoneLova: null,
        };

        try {
          const response = await createPin(newPin);
          setPins((prev) => [...prev, response.data]);
        } catch (err) {
          console.error("Greška prilikom čuvanja pina:", err);
          alert("Nije moguće sačuvati pin.");
        } finally {
          map.closePopup();
          setClickLatLng(null);
        }
      };
      div.appendChild(btn);
    });

    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Otkaži";
    cancelBtn.style.color = "red";
    cancelBtn.style.marginTop = "5px";
    cancelBtn.onclick = () => {
      map.closePopup();
      setClickLatLng(null);
    };
    div.appendChild(cancelBtn);

    return div;
  };

  return null;
}

// Poligon crtanje
function PolygonDrawer({ polygonMode, positions, setPositions, setPolygonMode }) {
  useMapEvents({
    click(e) {
      if (!polygonMode) return;
      setPositions([...positions, [e.latlng.lat, e.latlng.lng]]);
    },
  });

  return (
    <>
      {positions.length > 0 && (
        <Polygon
          positions={positions}
          pathOptions={{ color: "orange", fillOpacity: 0.3 }}
        />
      )}
      {polygonMode && (
        <div className={styles.polygonButtons}>
          <button
            onClick={() => {
              setPositions([]);
              setPolygonMode(false);
            }}
          >
            Poništi
          </button>
        </div>
      )}
    </>
  );
}

// Search komponenta
function SearchBox() {
  const map = useMap();
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");

  const provider = new OpenStreetMapProvider();

  const handleSearch = async () => {
    if (!query) return;
    try {
      const results = await provider.search({ query });
      if (Array.isArray(results) && results.length > 0) {
        const { y: lat, x: lon } = results[0];
        map.setView([lat, lon], 15, { animate: true });
      } else {
        alert("Nema rezultata za upit");
      }
    } catch (err) {
      console.error("Greška pri pretrazi:", err);
      alert("Greška pri pretrazi (server).");
    }
  };

  return (
    <div className={`${styles.customSearch} ${active ? styles.active : ""}`}>
      <button className={styles.searchButton} onClick={() => setActive(!active)}>🔍</button>
      <input
        className={styles.searchInput}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pretraži lokaciju..."
      />
      <button className={styles.searchGoButton} onClick={handleSearch}>🚀</button>
    </div>
  );
}

export default function MapDirektor() {
  const [pins, setPins] = useState([]);
  const [addPinMode, setAddPinMode] = useState(false);
  const [polygonMode, setPolygonMode] = useState(false);
  const [zones, setZones] = useState([]);
  const [positions, setPositions] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const zonasRes = await getZonasByIdGrupe(2);
        const zonas = zonasRes.data;
        const pinsRes = await getPinsByIdGrupe(2);
        const pins = pinsRes.data;

        const zonesWithPins = zonas.map((z) => ({
          id: z.id,
          positions: pins
            .filter((p) => p.idZoneLova === z.id)
            .map((p) => [p.latitude, p.longitude]),
        }));

        setZones(zonesWithPins);
        setPins(pins);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const completePolygon = async () => {
    if (positions.length < 3) {
      alert("Poligon mora imati najmanje 3 tačke!");
      return;
    }

    try {
      setSaving(true);
      const zonaRes = await createZona({ idGrupe: 2 });
      const zonaId = zonaRes.data.id;

      for (const [lat, lng] of positions) {
        await createPin({
          latitude: lat,
          longitude: lng,
          tipPina: "zonaLova",
          idGrupe: 2,
          idZoneLova: zonaId,
        });
      }

      setZones((prev) => [...prev, { id: zonaId, positions }]);
      setPositions([]);
      setPolygonMode(false);
    } catch (err) {
      console.error(err);
      alert("Nije moguće sačuvati zonu lova.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.mapWrapper}>
      <MapContainer center={[44.772182, 17.191]} zoom={15} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <SearchBox />
        <PinAdder addPinMode={addPinMode} setPins={setPins} />
        <PolygonDrawer
          polygonMode={polygonMode}
          positions={positions}
          setPositions={setPositions}
          setPolygonMode={setPolygonMode}
        />

        {pins.filter((p) => p.tipPina !== "zonaLova").map((p, idx) => {
          let iconToUse = p.tipPina === "lovac" ? hunterIcon : p.tipPina === "pas" ? dogIcon : pinIcon;
          return (
            <Marker key={p.id || idx} position={[p.latitude, p.longitude]} icon={iconToUse}>
              <Popup>
                {p.tipPina}
                <br />
                {!addPinMode && !polygonMode && (
                  <button
                    onClick={async () => {
                      if (!window.confirm("Obrisati ovaj pin?")) return;
                      try {
                        await deletePin(p.id);
                        setPins(prev => prev.filter(pin => pin.id !== p.id));
                      } catch (err) {
                        alert("Greška pri brisanju pina.");
                        console.error(err);
                      }
                    }}
                  >
                    Obriši pin
                  </button>
                )}
              </Popup>
            </Marker>
          );
        })}

        {zones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.positions}
            pathOptions={{ color: "orange", fillOpacity: 0.3 }}
            eventHandlers={{
              click: (e) => {
                if (addPinMode) {
                  const latlng = e.latlng;

                  const div = document.createElement("div");
                  div.style.display = "flex";
                  div.style.flexDirection = "column";
                  div.style.gap = "5px";

                  const types = [
                    { label: "Životinja", value: "zivotinja" },
                    { label: "Pas", value: "pas" },
                    { label: "Lovac", value: "lovac" },
                    { label: "Trofej", value: "trofej" },
                    { label: "Tačka od interesa", value: "tackaOdInteresa" }
                  ];

                  types.forEach(({ label, value }) => {
                    const btn = document.createElement("button");
                    btn.innerText = label;
                    btn.style.cursor = "pointer";
                    btn.onclick = async () => {
                      const newPin = {
                        latitude: latlng.lat,
                        longitude: latlng.lng,
                        tipPina: value,
                        idGrupe: 2,
                        idZoneLova: zone.id,
                      };

                      try {
                        const response = await createPin(newPin);
                        setPins((prev) => [...prev, response.data]);
                      } catch (err) {
                        console.error("Greška prilikom čuvanja pina:", err);
                        alert("Ne može se dodati pin u zoni.");
                      } finally {
                        e.target._map.closePopup();
                      }
                    };
                    div.appendChild(btn);
                  });

                  const cancelBtn = document.createElement("button");
                  cancelBtn.innerText = "Otkaži";
                  cancelBtn.style.color = "red";
                  cancelBtn.style.marginTop = "5px";
                  cancelBtn.onclick = () => e.target._map.closePopup();
                  div.appendChild(cancelBtn);

                  L.popup().setLatLng(latlng).setContent(div).openOn(e.target._map);
                }
              },
            }}
          >
            <Popup>
              Zona lova #{zone.id}
              <br />
              {!addPinMode && !polygonMode && (
                <button
                  onClick={async () => {
                    if (!window.confirm("Obrisati ovu zonu lova?")) return;
                    try {
                      await deleteZona(zone.id);
                      setZones((prev) => prev.filter((z) => z.id !== zone.id));
                      setPins((prev) => prev.filter((p) => p.idZoneLova !== zone.id));
                    } catch (err) {
                      alert("Greška pri brisanju zone.");
                      console.error(err);
                    }
                  }}
                >
                  Obriši zonu
                </button>
              )}
            </Popup>
          </Polygon>
        ))}

      </MapContainer>

      <div className={styles.directorControls}>
        {!polygonMode && (
          <button onClick={() => setAddPinMode(!addPinMode)}>
            {addPinMode ? "Završi dodavanje pinova" : "Dodaj pin"}
          </button>
        )}
        {!addPinMode && (
          <button onClick={() => polygonMode ? completePolygon() : setPolygonMode(true)} disabled={saving}>
            {saving ? "Čuvam..." : polygonMode ? "Završi crtanje poligona" : "Dodaj zonu lova"}
          </button>
        )}
      </div>
    </div>
  );
}
