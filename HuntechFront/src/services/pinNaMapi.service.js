import axios from "axios";

import { BASE_URL } from "../config.js";

//export const BASE_URL = "/api/zonas-lova";

const API_URL = `${BASE_URL}/pins-na-mapi`; // promeni ako je drugačije

export const getAllPins = () => {
  return axios.get(API_URL);
};

export const getPinById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createPin = (userData) => {
  return axios.post(API_URL, userData);
};

export const updatePin = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};

export const deletePin = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getPinsByIdGrupe = (groupId) => {
  return axios.get(`${API_URL}/grupa/${groupId}`);
};
