import React, { useState } from "react";
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

// Ikone
const hunterIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
  iconSize: [30, 30],
});
const dogIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  iconSize: [25, 25],
});
const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 25],
});

// Pin dodavanje
function PinAdder({ addPinMode, setPins, pins }) {
  useMapEvents({
    click(e) {
      if (!addPinMode) return;
      const name = prompt("Unesite naziv tačke interesa:");
      if (!name) return;
      setPins([...pins, { lat: e.latlng.lat, lng: e.latlng.lng, name }]);
    },
  });
  return null;
}

// Poligon crtanje
function PolygonDrawer({ polygonMode, setZones }) {
  const [positions, setPositions] = useState([]);
  useMapEvents({
    click(e) {
      if (!polygonMode) return;
      setPositions([...positions, [e.latlng.lat, e.latlng.lng]]);
    },
  });

  const completePolygon = () => {
    if (positions.length < 3) {
      alert("Poligon mora imati najmanje 3 tačke!");
      return;
    }
    setZones((prev) => [...prev, positions]);
    setPositions([]);
  };

  return (
    <>
      {positions.length > 0 && (
        <Polygon
          positions={positions}
          pathOptions={{ color: "green", fillOpacity: 0.3 }}
        />
      )}
      {polygonMode && positions.length > 0 && (
        <div className={styles.polygonButtons}>
          <button onClick={completePolygon}>Završi poligon</button>
          <button onClick={() => setPositions([])}>Poništi</button>
        </div>
      )}
    </>
  );
}

// Search komponenta sa dugmetom
function SearchBox() {
  const map = useMap();
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");

  const provider = new OpenStreetMapProvider();

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&limit=5&lang=sr`,
      );
      const results = await res.json();

      if (Array.isArray(results) && results.length > 0) {
        const { lat, lon } = results[0];
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
      <button
        className={styles.searchButton}
        onClick={() => setActive(!active)}
      >
        🔍
      </button>
      <input
        className={styles.searchInput}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pretraži lokaciju..."
      />
      <button className={styles.searchGoButton} onClick={handleSearch}>
        🚀
      </button>
    </div>
  );
}

export default function MapDirektor() {
  const [hunters] = useState([
    { id: 1, lat: 44.787197, lng: 20.457273 },
    { id: 2, lat: 44.788, lng: 20.455 },
  ]);
  const [dogs] = useState([
    { id: 1, lat: 44.786, lng: 20.456 },
    { id: 2, lat: 44.785, lng: 20.454 },
  ]);
  const [pins, setPins] = useState([]);
  const [addPinMode, setAddPinMode] = useState(false);
  const [polygonMode, setPolygonMode] = useState(false);
  const [zones, setZones] = useState([]);

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={[44.787197, 20.457273]}
        zoom={15}
        className={styles.map}
      >
        {/* Satelitska mapa */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Search */}
        <SearchBox />

        {/* Pinovi i poligoni */}
        <PinAdder addPinMode={addPinMode} setPins={setPins} pins={pins} />
        <PolygonDrawer polygonMode={polygonMode} setZones={setZones} />

        {/* Lovci */}
        {hunters.map((h) => (
          <Marker key={h.id} position={[h.lat, h.lng]} icon={hunterIcon}>
            <Popup>Lovac {h.id}</Popup>
          </Marker>
        ))}

        {/* Psi */}
        {dogs.map((d) => (
          <Marker key={d.id} position={[d.lat, d.lng]} icon={dogIcon}>
            <Popup>Pas {d.id}</Popup>
          </Marker>
        ))}

        {/* Pinovi */}
        {pins.map((p, idx) => (
          <Marker key={idx} position={[p.lat, p.lng]} icon={pinIcon}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))}

        {/* Poligoni */}
        {zones.map((zone, idx) => (
          <Polygon
            key={idx}
            positions={zone}
            pathOptions={{ color: "green", fillOpacity: 0.3 }}
          />
        ))}
      </MapContainer>

      {/* Dugmad direktora */}
      <div className={styles.directorControls}>
        <button onClick={() => setAddPinMode(!addPinMode)}>
          {addPinMode ? "Završi dodavanje pinova" : "Dodaj pin"}
        </button>
        <button onClick={() => setPolygonMode(!polygonMode)}>
          {polygonMode ? "Završi crtanje poligona" : "Dodaj zonu lova"}
        </button>
      </div>
    </div>
  );
}
