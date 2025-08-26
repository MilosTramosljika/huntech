// server.js
import express from "express";
import fetch from "node-fetch";
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Dozvoli CORS iz lokalnog React dev servera (3000).
// Ako koristiš CRA "proxy" (korak 2), CORS ti zapravo neće ni trebati,
// ali ovo pomaže ako otvaraš direktno sa telefona bez proxy-ja.
app.use(cors({ origin: [/^http:\/\/localhost:3000$/, /^http:\/\/192\.168\.\d+\.\d+:\d+$/], credentials: false }));
app.use(express.json());

// Jednostavan rate-limit: max 30 upita/min po IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30
});
app.use("/api/", limiter);

// Mali in-memory cache (5 min)
const cache = new Map();
const TTL_MS = 5 * 60 * 1000;

function getCache(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.t > TTL_MS) {
    cache.delete(key);
    return null;
  }
  return hit.data;
}

function setCache(key, data) {
  cache.set(key, { data, t: Date.now() });
}

// Normalizuj odgovor Nominatima na {name, lat, lon}
function normalize(results) {
  return results.map((r) => ({
    name: r.display_name,
    lat: Number(r.lat),
    lon: Number(r.lon)
  }));
}

// /api/search?q=Banjaluka&limit=5&lang=sr
app.get("/api/search", async (req, res) => {
  const q = (req.query.q || "").toString().trim();
  const limit = (req.query.limit || "5").toString();
  const lang = (req.query.lang || "sr").toString();

  if (!q) return res.status(400).json({ error: "Missing query ?q=" });

  // cache key vezan za upit+jezik
  const key = `q:${q}|lang:${lang}|limit:${limit}`;
  const cached = getCache(key);
  if (cached) return res.json(cached);

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", q);
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", limit);

  try {
    const resp = await fetch(url.toString(), {
      headers: {
        // Nominatim traži jasan User-Agent; po pravilima je poželjno dodati mail
        "User-Agent": `huntech-app/1.0 (${process.env.CONTACT_EMAIL || "contact@example.com"})`,
        "Accept-Language": lang
      }
    });

    if (!resp.ok) {
      return res.status(resp.status).json({ error: `Upstream error ${resp.status}` });
    }

    const data = await resp.json();
    const normalized = normalize(data);
    setCache(key, normalized);
    res.json(normalized);
  } catch (e) {
    console.error("Search error:", e);
    res.status(500).json({ error: "Search failed" });
  }
});

// (opciono) reverse geocoding: /api/reverse?lat=...&lon=...&lang=sr
app.get("/api/reverse", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "lat/lon required" });

  const key = `rev:${lat},${lon}|lang:${req.query.lang || "sr"}`;
  const cached = getCache(key);
  if (cached) return res.json(cached);

  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", lat);
  url.searchParams.set("lon", lon);
  url.searchParams.set("format", "json");
  url.searchParams.set("zoom", "16");
  url.searchParams.set("addressdetails", "1");

  try {
    const resp = await fetch(url.toString(), {
      headers: {
        "User-Agent": `huntech-app/1.0 (${process.env.CONTACT_EMAIL || "contact@example.com"})`
      }
    });
    if (!resp.ok) return res.status(resp.status).json({ error: `Upstream error ${resp.status}` });
    const data = await resp.json();
    setCache(key, data);
    res.json(data);
  } catch (e) {
    console.error("Reverse error:", e);
    res.status(500).json({ error: "Reverse failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Geo proxy listening on http://localhost:${PORT}`);
});
