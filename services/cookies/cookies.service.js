import { setCookie, getCookie, deleteCookie } from 'cookies-next';

class CookiesService {

    setCookies(key, value) {

        const data = JSON.stringify(value);

        setCookie(key, data);
    }

    async getCookies(key) {

        const cookies = await getCookie(key);

        if (cookies) {
            return JSON.parse(cookies);
        }
    }

    delete(key) {

        deleteCookie(key);
    }
}

export default new CookiesService();