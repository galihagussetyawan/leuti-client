import ApiServer from "./api-server";

class UserDetailService {

    async getUserDetailByUser(userid, req, res) {

        return await ApiServer(req, res).get('user/detail', {
            params: { userid }
        })
    }
}

export default new UserDetailService();