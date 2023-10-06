import axios from "axios";

const baseURL = "http://localhost:1337/api/";

export const axiosRequest = axios.create({
  baseURL,
});
