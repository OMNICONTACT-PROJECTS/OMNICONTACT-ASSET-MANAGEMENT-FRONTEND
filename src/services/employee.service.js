import instance, { formsRequestInstance } from "../api";

class EmployeeService {
    createAdministrator(data) {
        return instance.post('users/administrators/', data)
    }

    createIsSupport(data) {
        return instance.post('users/is-support/', data)
    }

    createGeneralUser(data) {
        return instance.post('users/general-users/', data)
    }

    getAllByOrganisationId(organisation_id) {
        return instance.get(`users/get-by-organisation-id/${organisation_id}/`)
    }

    getAllAdministratorsByOrganisationId(organisation_id) {
        return instance.get(`users/administrators/get-by-organisation-id/${organisation_id}/`)
    }

    getAllIsSupportByOrganisationId(organisation_id) {
        return instance.get(`users/is-support/get-by-organisation-id/${organisation_id}/`)
    }

    getAllGeneralUsersByOrganisationId(organisation_id) {
        return instance.get(`users/general-users/get-by-organisation-id/${organisation_id}/`)
    }
    getAll() {
        return instance.get('users/get-all/')
    }

    get(id) {
        return instance.get(`users/${id}/`)
    }

    update(id, data) {
        return instance.put(`users/update/${id}/`, data);
    }

    delete(id) {
        return instance.delete(`users/${id}/`)
    }

    UploadUserProfilePic(id) {
        return formsRequestInstance.postForm(`users/upload-user-profile-picture/${id}/`)
    }

    enableAAssetAllocationPermissions(user_id, data) {
        return instance.put(`users/${user_id}/enable-asset-allocation-permissions/`, data);
    }

    enableAssetApprovalPermissions(user_id, data) {
        return instance.put(`users/${user_id}/enable-asset-approval-permissions/`, data);
    }

}

export default new EmployeeService();