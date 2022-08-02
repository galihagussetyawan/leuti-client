import axios from "axios";
import https from 'https';
import { getCookie } from "cookies-next";

export default function ApiClient() {

    const instance = axios.create({
        baseURL: process.env.API_HOST,
        headers: {
            "Content-Type": "application/json",
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });

    instance.interceptors.request.use(
        async request => {

            const cookies = await getCookie('user');

            if (cookies) {
                request.headers["Authorization"] = `Bearer ${JSON.parse(cookies).accessToken}`;
            }

            return request;
        },
        error => {

            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            return Promise.reject(error);
        }
    )

    return instance;
}