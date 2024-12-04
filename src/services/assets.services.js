import instance from "../api";

class AssetService {

    create(data) {
        return instance.post('assets/', data)
    }

    getAllByOrganisationId(organisation_id) {
        return instance.get(`assets/get-all-by-organisation-id/${organisation_id}/`)
    }

    getAllByCategoryId(category_id) {
        return instance.get(`assets/get-all-by-category-id/${category_id}/`)
    }

    getAll() {
        return instance.get('assets/get-all/')
    }

    get(id) {
        return instance.get(`assets/${id}/`)
    }

    update(id, data) {
        return instance.put(`assets/update/${id}/`, data);
    }

    delete(id) {
        return instance.delete(`assets/${id}/`)
    }
}

export default new AssetService();