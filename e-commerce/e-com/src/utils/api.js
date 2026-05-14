import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';

const getAuthHeader = () => {
  const token = localStorage.getItem('userToken');
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
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    });
    return data;
  } catch (error) {
    return error.response?.data || { error: error.message };
  }
};

export const getAuthData = async (url) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers: getAuthHeader(),
    });
    return data;
  } catch (error) {
    return error.response?.data || { error: error.message };
  }
};

export const putAuthData = async (url, formData) => {
  try {
    const { data } = await axios.put(BASE_URL + url, formData, {
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    });
    return data;
  } catch (error) {
    return error.response?.data || { error: error.message };
  }
};

export const deleteData = async (url) => {
  try {
    const { data } = await axios.delete(BASE_URL + url, { headers: getAuthHeader() });
    return data;
  } catch (error) {
    return error.response?.data || { error: error.message };
  }
};

// legacy helpers used by admin
export const updateCategory = async (id, data) => putAuthData(`/api/category/${id}`, data);
export const deleteCategory = async (id) => deleteData(`/api/category/${id}`);
export const getProducts = (filters) => axios.get(`${BASE_URL}/api/products`, { params: filters });
export const deleteProduct = async (id) => deleteData(`/api/products/${id}`);
export const updateProduct = async (id, data) => putAuthData(`/api/products/${id}`, data);
