import ApiClient from "./api-client";
import ApiServer from "./api-server";

class WithdrawService {

    async createWithdrawByUser() {

        return await ApiClient()
            .post('/api/withdraw')
    }

    async getWithdrawByUser(req, res) {

        return await ApiServer(req, res)
            .get('withdraw')
    }
}

export default new WithdrawService();