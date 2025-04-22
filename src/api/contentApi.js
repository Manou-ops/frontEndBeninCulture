import apiClient from './axiosConfig';

export const getAllContents = async () => {
  return await apiClient.get('/contents');
};

export const getContentById = async (id) => {
  return await apiClient.get(`/contents/${id}`);
};

export const createContent = async (contentData) => {
  return await apiClient.post('/contents', contentData);
};

export const updateContent = async (id, contentData) => {
  return await apiClient.put(`/contents/${id}`, contentData);
};

export const deleteContent = async (id) => {
  return await apiClient.delete(`/contents/${id}`);
};