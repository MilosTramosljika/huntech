// dogadjaj.service.js
import axios from "axios";
import { BASE_URL } from "../config.js";

const API_URL = `${BASE_URL}/dogadjajs`; // promeni ako je drugačije

/**
 * Dohvata sve događaje vezane za određenu objavu
 * @param {number} id - ID objave
 * @returns {Promise} - Axios promise sa nizom događaja
 */
export const getDogadjajiByObjava = (id) => {
  return axios.get(`${API_URL}/objava/${id}`);
};

export const createDogadjaj = (userData) => {
  return axios.post(API_URL, userData);
};

export const updateDogadjaj = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};

export const deleteDogadjaj = (id, userData) => {
  return axios.delete(`${API_URL}/${id}`, userData);
};
