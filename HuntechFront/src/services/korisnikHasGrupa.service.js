import axios from "axios";

const API_URL = "http://localhost:8080/korisnik-grupas";

export const getAllKorisnikHaGrupa = () => {
  return axios.get(API_URL);
};

export const getKorisnikHasGrupaById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createKorisnikHasGrupa = (userData) => {
  return axios.post(API_URL, userData);
};

export const updateKorisnikHasGrupa = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};

export const deleteKorisnikHasGrupa = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getKorisnikHasGrupaByIdKorisnika = (id) => {
  return axios.get(`${API_URL}/idKorisnika/${id}`);
};
