import axios from "axios";

const API_URL = "http://localhost:8080/pins-na-mapi"; // tvoj backend endpoint

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
