// import React from "react";
// import "./App.css";
// import Korisnik from "./pages/Korisnik/korisnik";
// import UrediProfil from "./pages/UredjivanjeKorisnika/uredjivanjeKorisnika";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// const App = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Korisnik />} />
//       <Route path="/singleKorisnik" element={<Korisnik />} />
//       <Route path="/uredjivanjeKorisnika" element={<UrediProfil />} />
//     </Routes>
//   </BrowserRouter>
// );

// export default App;

// import React from "react";
// import "./App.css";
// import Korisnik from "./pages/Korisnik/korisnik";
// import UrediProfil from "./pages/UredjivanjeKorisnika/uredjivanjeKorisnika";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navigation from "./pages/Navigation/navigation.jsx";

// function App() {
//   return (
//     <Router>
//       <Navigation /> {/* ⬅️ dodaj Navigation komponentu */}
//       <Routes>
//         <Route path="/" element={<Korisnik />} />
//         <Route path="/singleKorisnik" element={<Korisnik />} />
//         <Route path="/uredjivanjeKorisnika" element={<UrediProfil />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import Korisnik from "./pages/Korisnik/korisnik";
import UrediProfil from "./pages/Korisnik/uredjivanjeKorisnika";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/Navigation/navigation.jsx";

// Layout koji dodaje Navigation osim na odredjenim stranicama
const Layout = ({ children }) => {
  const location = useLocation();

  // Stranice gdje NE želimo navigation (npr. login/registracija)
  const hiddenNavRoutes = ["/login", "/register"];

  const hideNav = hiddenNavRoutes.includes(location.pathname);

  return (
    <>
      {!hideNav && <Navigation />}
      <main>{children}</main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Korisnik />} />
          <Route path="/singleKorisnik" element={<Korisnik />} />
          <Route path="/uredjivanjeKorisnika" element={<UrediProfil />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
