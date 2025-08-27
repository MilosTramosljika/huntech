import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Mapa from "./pages/Mapa";
import Dnevnik from "./pages/Dnevnik";
import Profil from "./pages/Profil";

export default function App() {
  return (
    <Router>
      <div style={{ paddingBottom: "60px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/dnevnik" element={<Dnevnik />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>
      <Navigation />
    </Router>
  );
}
