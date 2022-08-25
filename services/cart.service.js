import ApiClient from "./api-client";
import ApiServer from "./api-server";

class CartService {

    async getCartByUser(req, res) {

        return await ApiServer(req, res).get('cart');
    }

    async createCart(productid, quantity) {

        return await ApiClient()
            .post('/api/cart', { quantity }, {
                params: { productid }
            })
    }

    async deleteCartById(id) {

        return await ApiClient()
            .delete('/api/cart', {
                params: { id }
            })
    }

    async updateCartById(id, quantity) {

        return await ApiClient()
            .put('/api/cart', { quantity }, {
                params: { id }
            })
    }
}

export default new CartService();