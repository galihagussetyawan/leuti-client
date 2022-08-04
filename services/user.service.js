import ApiClient from "./api-client";

class UserService {

    async createUser(firstname, lastname, username, email, password) {

        return await ApiClient().post('/api/user', {
            firstname, lastname, username, email, password,
        })
    }
}

export default new UserService();