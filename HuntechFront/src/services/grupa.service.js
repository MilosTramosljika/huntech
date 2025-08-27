import axios from "axios";

const API_URL = "http://localhost:8080/grupas";

// Dohvati sve grupe
export const getGrupe = async () => {
  const res = await axios.get(`${API_URL}`);
  return res.data;
};

// Dohvati jednu grupu po ID-u
export const getGrupaById = (id) => {
  return axios
    .get(`http://localhost:8080/grupas/${id}`)
    .then((res) => res.data); // vraća direktno objekt grupe
};
