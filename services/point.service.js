import ApiServer from "./api-server";

class PointService {

    async getPointByUser(userid, req, res) {

        return await ApiServer(req, res).get('point', {
            params: { userid }
        })
    }
}

export default new PointService();