import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https:/mesocial-api.herokuapp.com/api/",
});