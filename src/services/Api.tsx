
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    withCredentials: true, // so the refreshToken cookie is sent
});

// Inject access token into request headers
let currentAccessToken = "";

export const updateAccessToken = (token: string) => {
    currentAccessToken = token;
};

API.interceptors.request.use(
    (config) => {
        if (currentAccessToken) {
            config.headers.Authorization = `Bearer ${currentAccessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle expired access token automatically
API.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URI}/user/refreshAccessToken`,
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;
                updateAccessToken(newAccessToken); // update in memory
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return API(originalRequest); // retry original request
            } catch (refreshError) {
                console.error("Refresh token failed");
                // Optionally trigger logout from here
            }
        }

        return Promise.reject(err);
    }
);

export default API;

