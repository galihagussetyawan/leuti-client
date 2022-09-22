import ApiClient from "./api-client";
import ApiServer from "./api-server";

class SponsorService {

    async createSponsor(userid, userdownlineid) {

        return await ApiClient()
            .post('/api/sponsor', {}, {
                params: {
                    userid, userdownlineid
                }
            })
    }

    async addSponsorDownlineById(id, userdownlineid) {


        return await ApiClient()
            .post('/api/sponsor/add', {}, {
                params: {
                    id, userdownlineid
                }
            })
    }

    async removeSponsorDownlineById(id, userdownlineid) {

        return await ApiClient()
            .delete('/api/sponsor', {
                params: {
                    id, userdownlineid
                }
            })
    }

    async getAllSponsorByUser(req, res) {

        return await ApiServer(req, res)
            .get('sponsors')
    }

}

export default new SponsorService();