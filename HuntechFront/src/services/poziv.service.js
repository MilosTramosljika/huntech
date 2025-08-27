// services/pozivService.js
import axios from "axios";

export const sendHardcodedInvite = async (input, idGrupe) => {
  let userResponse;

  if (input.includes("@")) {
    // Ako je email
    userResponse = await axios.get(
      `http://localhost:8080/korisniks/email/${input}`
    );
  } else {
    // Ako je username
    userResponse = await axios.get(
      `http://localhost:8080/korisniks/username/${input}`
    );
  }

  const korisnik = userResponse.data;

  const payload = {
    idKorisnika: korisnik.id,
    idGrupe: idGrupe,
    statusZaClanstvo: "poslat",
    datumUclanjivanja: new Date().toISOString().split("T")[0],
  };

  await axios.post("http://localhost:8080/korisnik-grupas", payload);

  return korisnik;
};
