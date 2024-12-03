import instance from "../api";

class AssetAllocationService {
    create(data) {
        return instance.post('asset-allocations/', data)
    }

    getAllByOrganisationId(organisation_id) {
        return instance.get(`asset-allocations/get-all-by-organisation-id/${organisation_id}/`)
    }

    getAllByUserId(user_id) {
        return instance.get(`asset-allocations/get-all-by-user-id/${user_id}/`)
    }

    getAllByAllocatorUserId(user_id) {
        return instance.get(`asset-allocations/get-all-by-allocator-user-id/${user_id}/`)
    }

    getAll() {
        return instance.get('asset-allocations/get-all/')
    }

    get(id) {
        return instance.get(`asset-allocations/${id}/`)
    }

    update(id, data) {
        return instance.put(`asset-allocations/update/${id}/`, data);
    }

    delete(id) {
        return instance.delete(`asset-allocations/${id}/`)
    }
}

export default new AssetAllocationService();