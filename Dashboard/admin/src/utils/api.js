import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

const getAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(BASE_URL + url);
    return data;
  } catch (error) {
    return error.response?.data || { error: error.message };
  }
};

export const fetchAuthData = async (url) => {
  try {
    const { data } = await axios.get(BASE_URL + url, { headers: getAuthHeader() });
    return data;
  } catch (error) {
    return error.response?.data || { error: error.message };
  }
};

export const postData = async (url, formData) => {
  try {
    const { data } = await axios.post(BASE_URL + url, formData);
    return data;
  } catch (error) {
    return error.response?.data || { error: error.message };
  }
};

export const postAuthData = async (url, formData) => {
  try {
    const { data } = await axios.post(BASE_URL + url, formData, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return data;
  } catch (error) {
    return error.response?.data || { error: error.message };
  }
};

export const updateCategory = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/category/${id}`, data, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/category/${id}`, { headers: getAuthHeader() });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProducts = (filters) =>
  axios.get(`${BASE_URL}/api/products`, { params: filters });

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/products/${id}`, { headers: getAuthHeader() });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/products/${id}`, data, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
