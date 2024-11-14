import instance from "../api";

class DepartmentService {
    create(data) {
        return instance.postForm('departments/', data)
    }

    get(id) {
        return instance.get(`departments/${id}/`)
    }

    update(id) {
        return instance.put(`departments/update/${id}/`)
    }

    getAll() {
        return instance.get('departments/get-all/')
    }

    getAllByOrganisationId(organisation_id) {
        return instance.get(`departments/get-all-by-organisation-id/${organisation_id}/`)
    }
}

export default new DepartmentService();