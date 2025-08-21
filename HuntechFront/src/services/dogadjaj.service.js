// dogadjaj.service.js
import axios from "axios";

const API_URL = "http://localhost:8080"; // promeni ako je drugačije

/**
 * Dohvata sve događaje vezane za određenu objavu
 * @param {number} id - ID objave
 * @returns {Promise} - Axios promise sa nizom događaja
 */
export const getDogadjajiByObjava = (id) => {
  return axios.get(`${API_URL}/dogadjajs/objava/${id}`);
};
