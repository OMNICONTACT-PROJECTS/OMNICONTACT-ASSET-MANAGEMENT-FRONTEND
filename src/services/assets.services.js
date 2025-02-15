import instance from "../api";

class AssetService {

    create(data) {
        return instance.post('assets/', data)
    }

    getAllByOrganisationId(organisation_id) {
        return instance.get(`assets/get-all-by-organisation-id/${organisation_id}/`)
    }

    getAllStatsByOrganisationId(organisation_id) {
        return instance.get(`assets/stats/assets/${organisation_id}/`)
    }

    getGraphStatsByOrganisationId(organisation_id) {
        return instance.get(`assets/stats/total-assets/monthly/${organisation_id}/`)
    }

    getGraphStatsByOrganisationIdAndYear(organisation_id, year) {
        return instance.get(`assets/stats/total-assets/monthly/${organisation_id}/${year}/`)
    }

    getAllByCategoryId(category_id) {
        return instance.get(`assets/get-all-by-category-id/${category_id}/`)
    }

    getAllocatedByUserId(user_id) {
        return instance.get(`assets/get-allocated-by-user-id/${user_id}/`)
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