import instance from "../api";

class InstitutionService {
    create(data) {
        return instance.postForm('organisations/', data)
    }

    get(id) {
        return instance.get(`institutions/${id}/`)
    }

    getAll() {
        return instance.get('organisations/get-all/')
    }
}

export default new InstitutionService();