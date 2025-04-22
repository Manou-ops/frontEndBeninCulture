import apiClient from './axiosConfig';

export const registerUser = async (userData) => {
  return await apiClient.post('/auth/register', userData);
};

export const loginUser = async (credentials) => {
  return await apiClient.post('/auth/login', credentials);
};