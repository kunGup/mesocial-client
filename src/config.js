import axios from "axios"
export const serverURL = "https:/mesocial-api.herokuapp.com/api";
export const axiosInstance = axios.create({
  baseURL: "https:/mesocial-api.herokuapp.com/api/",
});