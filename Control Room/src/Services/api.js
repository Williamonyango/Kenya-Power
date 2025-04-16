import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = "https://ribbon-auspicious-quasar.glitch.me/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPermits = async () => {
  try {
    const response = await api.get("/permits");
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch permits" };
  }
};

export const getPermitById = async (id) => {
  try {
    const response = await api.get(`/permits/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch permit" };
  }
};

export const updatePermit = async (id, permitData) => {
  try {
    const response = await api.put(`/permits/${id}`, permitData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to update permit" };
  }
};

export const deletePermit = async (id) => {
  try {
    const response = await api.delete(`/permits/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to delete permit" };
  }
};

export default api;
