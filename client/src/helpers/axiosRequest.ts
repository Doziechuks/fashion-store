import axios from "axios";

const baseURL = "http://localhost:1337/api/";
const API_TOKEN =
  "c14188368acf7e9035e1bfe425237e94693e3fa5c67d03dbdee9422f0779ddde3169b0f55c15000a7024e04cfac179a4316d3499314495db3407f196cdd480caaea2d0bf0fea92959b29a01d8239d005172906a6a246af5577f2e24f820ee5c6bfaa52fb261b5073067ff049c116d0bbb75fd548bc2b07f152651a442a03661c";

export const axiosRequest = axios.create({
  baseURL,
});

export const fetchRequest = axios.create({
  baseURL,
  headers: {
    Authorization: "bearer" + API_TOKEN,
  },
});
