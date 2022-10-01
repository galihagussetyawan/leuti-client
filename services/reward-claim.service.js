import ApiClient from "./api-client";
import ApiServer from "./api-server";

class RewardClaimsService {

    async createRewardClaim(rewardid) {

        return await ApiClient()
            .post('/api/reward/claim', {}, {
                params: {
                    rewardid
                }
            })
    }

    async getAllRewardClaim(req, res) {

        return await ApiServer(req, res)
            .get('rewards/claim/all')
    }
}

export default new RewardClaimsService();