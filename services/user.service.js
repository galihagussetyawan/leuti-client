import axios from "axios";
import ApiClient from "./api-client";

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
}

export default new UserService();