import axios from 'axios';
import ApiClient from './api-client';
import ApiServer from './api-server';
import CookiesService from './cookies.service';

class AuthService {

    async signin(username, password) {

        CookiesService.delete('user');

        return await ApiClient().post('/api/auth/signin', {
            username,
            password
        })
            .then(res => {

                CookiesService.setCookies('user', res.data.data);

                if (res.status > 200) {
                    CookiesService.delete('user');
                }

                return res;
            })
    }

    async logout() {
        return await CookiesService.delete('user');
    }

    async isLogin() {

        const cookies = await CookiesService.getCookies('user');

        if (cookies?.accessToken) {
            return true;
        }

        return false;
    }

    async isAgent(req, res) {

        return await ApiServer(req, res)
            .get('auth/agent')
            .then(res => true)
            .catch(err => false);
    }

    // async isAdmin(accessToken) {

    //     return await axios.get(`${process.env.API_HOST}/api/auth/admin`, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         }
    //     })
    //         .then(res => true)
    //         .catch(err => false);
    // }

    async isAdmin(req, res) {

        return await ApiServer(req, res)
            .get('auth/admin')
            .then(res => true)
            .catch(err => false)
    }
}

export default new AuthService();