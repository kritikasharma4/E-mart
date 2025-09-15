import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";
console.log("BASE_URL:", BASE_URL);

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(BASE_URL + url);
    return data;
  } catch (error) {
    console.error("GET Error:", error);
    return error.response?.data || error.message;
  }
};

export const postData = async (url, formData, params = {}) => {
  try {
    const { data } = await axios.post(BASE_URL + url, formData, { params });
    return data;
  } catch (error) {
    console.error("POST Error:", error);
    return error.response?.data || error.message;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/category/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/category/${id}`);
    return res.data;
  } catch (error) {
    console.error("Delete failed:", error);
    throw error;
  }
};

export const getProducts = (filters) =>
  axios.get(`${BASE_URL}/api/products`, { params: filters });

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Product delete failed:", error);
    throw error;
  }
};


export const updateProduct = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/products/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Product update failed:", error);
    throw error;
  }
};

