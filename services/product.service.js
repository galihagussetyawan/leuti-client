import ApiClient from "./api-client";
import ApiServer from "./api-server";

class ProductService {

    async createProduct(name, category, description, advantage, application, ingredient, price, stock) {

        return await ApiClient()
            .post('/api/product', {
                name, category, description, advantage, application, ingredient, price, stock,
            })
    }

    async getProducts() {

        return await ApiServer()
            .get('/products')
    }

    async getProductById(id) {

        return await ApiServer()
            .get('/product', {
                params: { id }
            })
    }

    async updateProductById(id, name, category, description, advantage, application, ingredient, price, stock) {

        return await ApiClient()
            .put('/api/product', {
                name, category, description, advantage, application, ingredient, price, stock
            }, {
                params: { id }
            })
    }

    async deleteProductById(id) {

        return await ApiClient()
            .delete('/api/product', {
                params: { id }
            })
    }

    async getProductByIdClient(id) {

        return ApiClient()
            .get('/api/product', {
                params: { id }
            })
    }
}

export default new ProductService();