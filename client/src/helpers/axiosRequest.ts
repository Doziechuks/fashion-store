import axios from "axios";

const baseURL = "https://fashion-store-gcc4.onrender.com/api/";

export const axiosRequest = axios.create({
  baseURL,
});
