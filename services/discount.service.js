import ApiClient from "./api-client";

class DiscountService {

    async addDiscountToProduct(productid, quantity, item, addOns) {

        return await ApiClient()
            .post('/api/discount', {
                quantity, item, addOns,
            }, {
                params: {
                    productid
                }
            })
    }

    async updateDiscountById(id, quantity, item, addOns) {

        return await ApiClient()
            .put('/api/discount', {
                quantity, item, addOns,
            }, {
                params: {
                    id
                }
            })
    }

    async deleteDiscountById(id) {

        return await ApiClient()
            .delete('/api/discount', {
                params: { id }
            })
    }
}

export default new DiscountService();