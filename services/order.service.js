import ApiClient from "./api-client";
import ApiServer from "./api-server";

class OrderService {

    async createOrder() {

        return await ApiClient()
            .post('/api/order')
    }

    async getOrderById(id, req, res) {

        return await ApiServer(req, res)
            .get('order', {
                params: { id }
            });
    }

    async getOrdersByUser(req, res) {

        return await ApiServer(req, res)
            .get('orders');
    }

    async getAllOrders(status, req, res) {

        return await ApiServer(req, res)
            .get('orders/all', {
                params: {
                    status,
                }
            })
    }

    async addShippingAddressOrder(id, name, address, country, province, city, district, village, postalCode, email, phone) {

        return await ApiClient()
            .post('/api/order/shipping', { name, address, country, province, city, district, village, postalCode, email, phone }, {
                params: {
                    id
                }
            })
    }

    // admin function
    async approveOrder(id) {

        return await ApiClient()
            .put('/api/order/approve', {}, {
                params: { id }
            })
    }

    async updateStatusOrderInPackagingById(id) {

        return await ApiClient()
            .put('/api/order/in-packaging', {}, {
                params: { id }
            })
    }

    async updateStatusOrderInShippingById(id) {

        return await ApiClient()
            .put('/api/order/in-shipping', {}, {
                params: { id }
            })
    }

    async completeOrderById(id) {

        return await ApiClient()
            .put('/api/order/complete', {}, {
                params: { id }
            })
    }

    async cancelOrderById(id) {

        return await ApiClient()
            .put('/api/order/cancel', {}, {
                params: { id }
            })
    }

    async searchOrders(id, status) {

        return await ApiClient()
            .get('/api/orders/search', {
                params: {
                    id, status,
                }
            })
    }
}

export default new OrderService();