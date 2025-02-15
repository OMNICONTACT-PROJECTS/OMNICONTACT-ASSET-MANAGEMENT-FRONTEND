import instance from "../api";

class AssetRequestService {
    create(data) {
        return instance.post('asset-requests/', data)
    }

    getAllByOrganisationId(organisation_id) {
        return instance.get(`asset-requests/get-all-by-organisation-id/${organisation_id}/`)
    }

    getAllStatsByOrganisationId(organisation_id) {
        return instance.get(`asset-requests/stats/requests/${organisation_id}/`)
    }

    getGraphStatsByOrganisationIdAndYear(organisation_id, year) {
        return instance.get(`asset-requests/stats/requests/${organisation_id}/${year}/`)
    }

    getAllByUserId(user_id) {
        return instance.get(`asset-requests/get-all-by-user-id/${user_id}/`)
    }

    getAllByAllocatorUserId(user_id) {
        return instance.get(`asset-requests/get-all-by-allocator-user-id/${user_id}/`)
    }

    getAll() {
        return instance.get('asset-requests/get-all/')
    }

    get(id) {
        return instance.get(`asset-requests/${id}/`)
    }

    update(id, data) {
        return instance.put(`asset-requests/update/${id}/`, data);
    }

    approveRequest(id, data) {
        return instance.put(`asset-requests/approve/${id}/`, data);
    }

    delete(id) {
        return instance.delete(`asset-requests/${id}/`)
    }
}

export default new AssetRequestService();