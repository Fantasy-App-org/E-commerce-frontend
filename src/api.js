// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use(
//   async (config) => {
//     const access = localStorage.getItem('access');
//     if (access) {
//       config.headers.Authorization = `Bearer ${access}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refresh = localStorage.getItem('refresh');
//         if (refresh) {
//           const { data } = await axios.post(
//             'http://127.0.0.1:8000/api/token/refresh/',
//             { refresh }
//           );
//           localStorage.setItem('access', data.access);
//           api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         localStorage.clear();
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// src/api.js
import axios from "axios";

// 💡 Configure your base URL here
const API_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If the error is 401 and not a login request, try to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}auth/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem("access", data.access);
          // Retry the original request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh fails, log out the user
          console.error("Token refresh failed:", refreshError);
          localStorage.clear();
          window.location.href = "/login"; // or use navigate
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, redirect to login
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;