// api.ts
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    withCredentials: true,
});

// ✅ Token container (set by your app once on load)
let currentAccessToken = "";

export const setAccessToken = (token: string) => {
    currentAccessToken = token;
};

// ✅ Add token to every request
API.interceptors.request.use(
    (config) => {
        if (currentAccessToken) {
            config.headers.Authorization = `Bearer ${currentAccessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Handle token expiry and refresh
API.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(
                    "/api/user/refresh",
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;
                setAccessToken(newAccessToken); // update the token in memory

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                console.log("Refresh failed — user may be logged out");
            }
        }

        return Promise.reject(err);
    }
);

export default API;