import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // URL de base de votre API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un interceptor pour inclure le token JWT dans les requêtes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;