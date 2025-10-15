import axios from 'axios';

// 1. Crear una instancia de Axios con la URL base de tu API de Laravel
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Esta es la ruta base de tu API
  timeout: 10000, 
});

// 2. Interceptor de solicitudes: añade el token a cada petición
axiosInstance.interceptors.request.use(config => {
  // Obtiene el token del Local Storage
  const token = localStorage.getItem('token');
  
  // Si existe un token, lo añade al encabezado de Autorización como 'Bearer'
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

// 3. Exportar la instancia configurada
export default axiosInstance;