import ApiClient from "./api-client";

class UserDetailService {

    async addUserDetail(address, country, province, city, district, village, postalCode, phone) {

        return await ApiClient()
            .post('/api/user/detail', {
                address, country, province, city, district, village, postalCode, phone,
            })
    }

    async updateUserDetail(id, address, country, province, city, district, village, postalCode, phone,) {

        return await ApiClient()
            .put('/api/user/detail', {
                address, country, province, city, district, village, postalCode, phone,
            }, {
                params: { id },
            })
    }
}

export default new UserDetailService();