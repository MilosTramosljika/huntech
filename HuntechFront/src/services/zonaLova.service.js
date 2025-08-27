import axios from "axios";

import { BASE_URL } from "../config.js";

const API_URL = `${BASE_URL}/zonas-lova`; // promeni ako je drugačije

export const getAllZonas = () => {
  return axios.get(API_URL);
};

export const getZonaById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createZona = (userData) => {
  return axios.post(API_URL, userData);
};

export const updateZona = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};

export const deleteZona = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getZonasByIdGrupe = (groupId) => {
  return axios.get(`${API_URL}/grupa/${groupId}`);
};
