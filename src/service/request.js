import axios from "axios";

const apiUrl = import.meta.env.VITE_URL_KEY;

export const fetchAll = (url) => {
  const res = axios.get(`${apiUrl}${url}`);
  return res;
};