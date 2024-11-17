import axios from "axios";

// Asosiy baza URL
const BASE_URL = "http://67.205.170.103:8001/api/v1/";

// Axios instance yaratish
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Refresh token olish uchun API endpoint
const REFRESH_URL = "common/token/refresh";

// Interceptor: Har bir so'rovda access tokenni qo'shish
axiosInstance.interceptors.request.use((config) => {
    console.log("nimadir")
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Interceptor: Access token muddati tugaganida yangilash
axiosInstance.interceptors.response.use(
  (response) => response, // Agar muvaffaqiyatli javob bo'lsa, uni o'zgartirmasdan qaytar
  async (error) => {
    const originalRequest = error.config;
    console.log("nimadir");
    // Agar token muddati tugagan va yana bir marta so'rov yuborilmagan bo'lsa
    if (error.response?.status === 401 && !originalRequest._retry) {
       
        console.log("token yangilandi");
      originalRequest._retry = true; // Bir marta qayta urinishni belgilash

      try {
        // Refresh tokenni o'qish
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          console.error("Refresh token topilmadi.");
          return Promise.reject(error);
        }

        // Yangi access token olish
        const { data } = await axios.post(`${BASE_URL}${REFRESH_URL}`, {
          refresh: refreshToken,
        });

        // Yangi tokenlarni saqlash
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        // Yangi token bilan original so'rovni qayta yuborish
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh tokenni yangilashda xatolik:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Boshqa xatolarni qayta ishlash
  }
);

export default axiosInstance;
