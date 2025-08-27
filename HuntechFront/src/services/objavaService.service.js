import axios from "axios";

const API_URL = "http://localhost:8080/objavas"; // backend endpoint za objave

// --- Učitavanje svih objava ---
export const getObjave = () => {
  return axios.get(API_URL);
};

// --- Učitavanje objava po grupi ---
export const getObjaveByGrupa = (idGrupe) => {
  return axios
    .get(`http://localhost:8080/objavas/grupa/${idGrupe}`)
    .then((res) => res.data); // vraća niz objava
};
// --- Kreiranje nove objave ---
export const createObjava = (objavaData) => {
  return axios.post(API_URL, objavaData);
};

// --- Ažuriranje objave ---
export const updateObjava = (idObjave, updatedObjava) => {
  return axios.put(`${API_URL}/${idObjave}`, updatedObjava);
};

// --- Brisanje objave ---
export const deleteObjava = (idObjave) => {
  console.log("Brisanje objave: " + idObjave);
  return axios.delete(`${API_URL}/${idObjave}`);
};
