import axios from "axios";
import { config } from "../config/Config";


const packageJson = require("../../package.json");

export const invokeApi = async (url, params, cookies) => {
    try {
        let headers = {
            "Content-Type": "application/json",

            appversion: packageJson.version,

            platform: "web",
        };

        if (
            cookies &&
            cookies[config.cookieName] &&
            cookies[config.cookieName].token &&
            cookies[config.cookieName].loginUserId
        ) {
            headers.Authorization = "Bearer " + cookies[config.cookieName].token;

            headers.loginUserId = cookies[config.cookieName].loginUserId;
        }

        if (
            cookies &&
            cookies[config.sessionCookie] &&
            cookies[config.sessionCookie].sessionId
        ) {
            headers.sessionId = cookies[config.sessionCookie].sessionId;
        }

        return await axios.post(url, params,);
    } catch ({ response }) {
        return response;
    }
};

export const invokeFormDataApi = async (url, formData, cookies) => {
    try {
        let headers = {
            "Content-Type": "multipart/form-data",
            appversion: packageJson.version,
            platform: "web",
        };
        if (
            cookies &&
            cookies[config.cookieName] &&
            cookies[config.cookieName].token &&
            cookies[config.cookieName].loginUserId
        ) {
            headers.Authorization = "Bearer " + cookies[config.cookieName].token;
            headers.loginUserId = cookies[config.cookieName].loginUserId;
        }
        if (
            cookies &&
            cookies[config.sessionCookie] &&
            cookies[config.sessionCookie].sessionId
        ) {
            headers.sessionId = cookies[config.sessionCookie].sessionId;
        }
        return await axios.post(url, formData, { headers: headers });
    } catch ({ response }) {
        return response;
    }
};

export const apiList = {
    //User
    userLogin: "/login",
    userAdd: "/addUser",
    getUsers: "/getUsers",
    getUser: "/getUser",
    updateUser: "/updateUser",
    updateUserRoles: "/updateUserRoles",
    deleteUser: "/deleteUser",

    //Sign-Up
    signup: "/signup",

    // traffic tracking
    addWebTraffic: "/web/addWebTraffic",

    //change password api
    changePassword: "/changePassword",


};
