import axios from 'axios';
import ApiClient from '../api-client';
import CookiesService from '../cookies/cookies.service';

class AuthService {

    async signin(username, password) {

        return await ApiClient().post('/api/auth/signin', {
            username,
            password
        })
    }

    async isLogin() {

        const cookies = await CookiesService.getCookies('user');

        if (cookies?.accessToken) {
            return true;
        }

        return false;
    }

    async isAgent() {

        return await ApiClient().get('/api/auth/agent');
    }

    async isAdmin(accessToken) {

        return await axios.get(`${process.env.API_HOST}/api/auth/admin`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then(res => true)
            .catch(err => false);
    }
}

export default new AuthService();