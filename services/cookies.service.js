import { setCookie, getCookie, deleteCookie } from 'cookies-next';

class CookiesService {

    setCookies(key, value) {

        const data = JSON.stringify(value);

        setCookie(key, data, { maxAge: 34560000 });
    }

    async getCookies(key, req, res) {

        const cookies = await getCookie(key, { req, res });

        if (!cookies) return null;

        return cookies;
    }

    delete(key) {

        deleteCookie(key);
    }
}

export default new CookiesService();