import instance from "../api";

class AssetCategoryService {
    create(data) {
        return instance.post('asset-categories/', data)
    }

    getAllByOrganisationId(organisation_id) {
        return instance.get(`asset-categories/get-all-by-organisation-id/${organisation_id}/`)
    }

    getAll() {
        return instance.get('asset-categories/get-all/')
    }

    get(id) {
        return instance.get(`asset-categories/${id}/`)
    }

    update(id, data) {
        return instance.put(`asset-categories/update/${id}/`, data);
    }

    delete(id) {
        return instance.delete(`asset-categories/${id}/`)
    }
}

export default new AssetCategoryService();