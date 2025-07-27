import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.BACKEND_URI,
    withCredentials: true
})

export default API;