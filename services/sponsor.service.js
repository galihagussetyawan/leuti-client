import ApiClient from "./api-client";

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
}

export default new SponsorService();