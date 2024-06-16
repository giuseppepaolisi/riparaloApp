import axios from "axios";

// Base URL for the API
const BASE_URL = "https://your-api-url.com/api";

// Fetch a single cliente by ID
export const fetchClienteById = async (token, id) => {
  try {
    const response = await axios.get(`${BASE_URL}/customer/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.customer;
  } catch (error) {
    throw new Error("Errore nel caricamento del cliente");
  }
};

// Update cliente
export const updateCliente = async (token, id, cliente) => {
  try {
    await axios.patch(`${BASE_URL}/customer/${id}`, cliente, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error("Errore nell'aggiornamento del cliente");
  }
};

// Delete cliente
export const deleteCliente = async (token, id) => {
  try {
    await axios.delete(`${BASE_URL}/customer/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error("Errore eliminazione cliente");
  }
};

// Fetch all clienti
export const fetchClienti = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/customers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.customers;
  } catch (error) {
    throw new Error("Errore nel caricamento dei clienti");
  }
};
