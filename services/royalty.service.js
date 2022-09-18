import ApiServer from "./api-server";

class RoyaltyService {

    async getRoyaltiesByUser(req, res) {

        return await ApiServer(req, res)
            .get('royalties')
    }
}

export default new RoyaltyService();