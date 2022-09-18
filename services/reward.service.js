import ApiServer from "./api-server";

class RewardService {

    async getAllRewards() {
        return await ApiServer()
            .get('rewards')
    }
}

export default new RewardService();