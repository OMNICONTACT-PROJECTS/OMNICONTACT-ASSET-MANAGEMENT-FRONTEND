import instance from "../api";

class AuditLogService {

    getAllByOrganisationId(organisation_id) {
        return instance.get(`audit-trail/get-all-by-organisation-id/${organisation_id}/`)
    }


}

export default new AuditLogService();