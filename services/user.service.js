import axios from "axios";
import ApiClient from "./api-client";
import ApiServer from "./api-server";

class UserService {

    async createUser(firstname, lastname, username, email, password) {

        return await ApiClient().post('/api/user', {
            firstname, lastname, username, email, password,
        })
    }

    // async getUserById(id) {

    //     return await axios.get(`${process.env.API_HOST}/api/user`, {
    //         params: { id },
    //     });
    // }

    async getUserById(req, res) {

        return await ApiServer(req, res)
            .get('user');
    }

    async getUsers(req, res, page = 1) {

        return await ApiServer(req, res)
            .get('users', {
                params: {
                    page: page
                }
            });
    }

    async searchUserByIdOrUsername(search) {

        return await ApiClient()
            .get('/api/users/search', {
                params: { search }
            })
    }
}

export default new UserService();