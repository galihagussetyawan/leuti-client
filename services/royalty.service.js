import ApiServer from "./api-server";

class RoyaltyService {

    async getRoyaltiesByUser(req, res) {

        return await ApiServer(req, res)
            .get('royalties')
    }

    //admin service
    async getAllRoyaltiesList(req, res) {

        return await ApiServer(req, res)
            .get('royalties/all')
    }
}

export default new RoyaltyService();