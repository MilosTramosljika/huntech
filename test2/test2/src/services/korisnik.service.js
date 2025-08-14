import axios from "axios";

const API_URL = "http://localhost:8080/korisniks"; // tvoj backend endpoint

export const getAllUsers = () => {
  return axios.get(API_URL);
};

export const getUserById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createUser = (userData) => {
  return axios.post(API_URL, userData);
};

export const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
