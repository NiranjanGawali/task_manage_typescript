import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the access token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(
      sessionStorage.getItem('accessToken') || 'null'
    );
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle 401 unauthorized access
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('userId');
      // window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
