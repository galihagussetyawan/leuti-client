import ApiServer from "./api-server";

class PointService {

    async getPointByUser(userid, req, res) {

        return await ApiServer(req, res).get('point', {
            params: { userid }
        })
    }

    async getPoints(req, res) {

        return await ApiServer(req, res)
            .get('points')
    }
}

export default new PointService();