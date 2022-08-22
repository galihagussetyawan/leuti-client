import ApiClient from './api-client';

class ImageService {

    async uploadImage(images, productid) {

        let formData = new FormData();

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        return await ApiClient()
            .post('/api/image/upload', formData, {
                "Content-Type": "multipart/form-data",
                params: {
                    productid
                }
            })
    }

    async getImage(img) {

        return await ApiClient()
            .get('/api/image', {
                params: { img }
            })
    }

    async addImageToProduct(imageid, productid) {

        return await ApiClient()
            .post('/api/image/add', {}, {
                params: {
                    imageid, productid
                }
            })
    }
}

export default new ImageService();