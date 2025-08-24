import axios from "axios";

const API_URL = "http://localhost:8080/objavas-ld"; // tvoj backend endpoint

export const getAllObjave = () => {
  return axios.get(API_URL);
};

export const getObjavuById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createObjavu = (userData) => {
  return axios.post(API_URL, userData);
};

export const updateObjavu = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};

export const deleteObjavu = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getObjaveByIdKorisnika = (id) => {
  return axios.get(`${API_URL}/korisnik/${id}`);
};
