import axios from "axios";

import { BASE_URL } from "../config.js";

const API_URL = `${BASE_URL}/korisniks`; // promeni ako je drugačije

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

export const getUserByEmail = (email) => {
  return axios.get(`${API_URL}/email/${email}`);
};
