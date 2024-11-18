import axios from "axios";

// Asosiy baza URL
const BASE_URL = "http://67.205.170.103:8001/api/v1/";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


const REFRESH_URL = "common/token/refresh";

axiosInstance.interceptors.request.use((config) => {
    console.log("nimadir")
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("nimadir");
    if (error.response?.status === 401 && !originalRequest._retry) {
       
        console.log("token yangilandi");
      originalRequest._retry = true; 

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          console.error("Refresh token topilmadi.");
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${BASE_URL}${REFRESH_URL}`, {
          refresh: refreshToken,
        });

        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh tokenni yangilashda xatolik:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); 
  }
);

export default axiosInstance;
