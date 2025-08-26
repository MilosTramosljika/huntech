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

// servis za pinove
import {
  getPinsByIdGrupe,
  createPin,
} from "../../../services/pinNaMapi.service.js";

// Ikone
const hunterIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flatitudeicon.com/512/1077/1077012.png",
  iconSize: [30, 30],
});
const dogIcon = new L.Icon({
  iconUrl: dogImg,
  iconSize: [25, 25],
});
const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flatitudeicon.com/512/684/684908.png",
  iconSize: [25, 25],
});

// Pin dodavanje
function PinAdder({ addPinMode, setPins }) {
  useMapEvents({
    async click(e) {
      if (!addPinMode) return;
      const name = prompt("Unesite naziv tačke interesa:");
      if (!name) return;

      try {
        const newPin = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          tipPina: name,
          idGrupe: 2, // za sada hardkodirano
          idZoneLova: null,
        };

        console.log("Novi pin za čuvanje:", newPin);
        const response = await createPin(newPin);
        setPins((prev) => [...prev, response.data]);
      } catch (err) {
        console.error("Greška prilikom čuvanja pina:", err);
        alert("Nije moguće sačuvati pin.");
      }
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
    { id: 1, latitude: 44.787197, longitude: 20.457273 },
    { id: 2, latitude: 44.788, longitude: 20.455 },
  ]);
  const [dogs] = useState([
    { id: 1, latitude: 44.786, longitude: 20.456 },
    { id: 2, latitude: 44.785, longitude: 20.454 },
  ]);
  const [pins, setPins] = useState([]);
  const [addPinMode, setAddPinMode] = useState(false);
  const [polygonMode, setPolygonMode] = useState(false);
  const [zones, setZones] = useState([]);

  // učitavanje pinova iz baze kad se komponenta mount-uje
  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await getPinsByIdGrupe(2); // primer sa idGrupe = 2
        setPins(response.data);
      } catch (err) {
        console.error("Greška pri učitavanju pinova:", err);
      }
    };
    fetchPins();
  }, []);

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={[44.772182, 17.191]}
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
        <PinAdder addPinMode={addPinMode} setPins={setPins} />
        <PolygonDrawer polygonMode={polygonMode} setZones={setZones} />

        {/* Pinovi iz baze sa dinamičkim ikonama */}
        {pins.map((p, idx) => {
          let iconToUse;
          if (p.tipPina === "lovac") iconToUse = hunterIcon;
          else if (p.tipPina === "pas") iconToUse = dogIcon;
          else iconToUse = pinIcon;

          return (
            <Marker
              key={p.id || idx}
              position={[p.latitude, p.longitude]}
              icon={iconToUse}
            >
              <Popup>{p.tipPina}</Popup>
            </Marker>
          );
        })}

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
