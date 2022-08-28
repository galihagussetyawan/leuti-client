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
                    status
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
}

export default new OrderService();