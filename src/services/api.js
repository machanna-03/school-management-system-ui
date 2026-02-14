import axios from 'axios';
import { Cookies } from 'react-cookie';
import { config } from '../config/Config';
const packageJson = require("../../package.json");

const cookies = new Cookies();

const api = axios.create({
    baseURL: config.getMySchool,
    headers: {
        'Content-Type': 'application/json',
        appversion: packageJson.version,
        platform: 'web',
    },
});

api.interceptors.request.use(
    (requestConfig) => {
        const allCookies = cookies.getAll();
        const userCookie = allCookies[config.cookieName];
        const sessionCookie = allCookies[config.sessionCookie];

        if (userCookie) {
            if (userCookie.token) {
                requestConfig.headers.Authorization = `Bearer ${userCookie.token}`;
            }
            if (userCookie.loginUserId) {
                requestConfig.headers.loginUserId = userCookie.loginUserId;
            }
        }

        if (sessionCookie && sessionCookie.sessionId) {
            requestConfig.headers.sessionId = sessionCookie.sessionId;
        }

        return requestConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Optional: Handle 401 Unauthorized globally
        if (error.response && error.response.status === 401) {
            // Logic to redirect to login or refresh token
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;
