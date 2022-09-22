import ApiClient from "./api-client";

class RewardClaimsService {

    async createRewardClaim(rewardid) {

        return await ApiClient()
            .post('/api/reward/claim', {}, {
                params: {
                    rewardid
                }
            })
    }
}

export default new RewardClaimsService();