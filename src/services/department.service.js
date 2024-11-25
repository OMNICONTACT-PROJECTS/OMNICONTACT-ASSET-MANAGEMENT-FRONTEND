import instance from "../api";

class DepartmentService {
    create(data) {
        return instance.postForm('departments/', data)
    }

    get(id) {
        return instance.get(`departments/${id}/`)
    }

    update(id, data) {
        return instance.put(`departments/update/${id}/`, data);
    }

    getAll() {
        return instance.get('departments/get-all/')
    }

    getAllByOrganisationId(organisation_id) {
        return instance.get(`departments/get-all-by-organisation-id/${organisation_id}/`)
    }

    delete(id) {
        return instance.delete(`departments/${id}/`)
    }

}

export default new DepartmentService();