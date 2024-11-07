import axios from "axios";
import authHeader from "./services/auth-header.js";
import { RENDER_URL } from "./apiConfig.js";

const instance = axios.create({
    baseURL: RENDER_URL,
    headers: {
        "Content-Type": "application/json",
        ...authHeader()
    },
})

export const formsRequestInstance = axios.create({
    baseURL: RENDER_URL,
    headers: {
        "Content-Type": "multipart/form-data",
        ...authHeader()
    },
})

export default instance;