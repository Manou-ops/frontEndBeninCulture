import axios from 'axios';

// On crée une instance d'axios personnalisée
const axiosInstance = axios.create({
  baseURL: 'https://projetbeninculture-1.onrender.com/api', // Base commune pour tes appels API
});

// Intercepteur pour ajouter automatiquement le token dans les requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // On récupère le token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // On l'ajoute dans l'entête Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
