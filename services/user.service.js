import axios from "axios";
import ApiClient from "./api-client";
import ApiServer from "./api-server";

class UserService {

    async createUser(firstname, lastname, username, email, password) {

        return await ApiClient().post('/api/user', {
            firstname, lastname, username, email, password,
        })
    }

    async getUserById(id) {

        return await axios.get(`${process.env.API_HOST}/api/user`, {
            params: { id },
        });
    }

    async getUsers(req, res) {

        return await ApiServer(req, res)
            .get('users');
    }

    async searchUserByIdOrUsername(search) {

        return await ApiClient()
            .get('/api/users/search', {
                params: { search }
            })
    }
}

export default new UserService();