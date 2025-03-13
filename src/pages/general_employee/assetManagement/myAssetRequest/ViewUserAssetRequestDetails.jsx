import PropTypes from "prop-types";
import { Modal, Form, Input, Row, Col, Divider } from "antd";

const ViewUserAssetRequestDetails = ({ visible, onClose, asset }) => {
  return (
    <Modal
      title={
        <h2 className="text-xl font-bold text-center text-blue-600">
          My Asset Request Details
        </h2>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      bodyStyle={{ padding: "24px 32px", background: "#f0f7ff" }}
    >
      <Form
        layout="vertical"
        className="p-6 space-y-4 bg-white border border-blue-100 rounded-lg shadow-lg"
      >
        {/* <h3 className="mb-6 text-lg font-bold text-center text-blue-500">
          Request Information
        </h3> */}

        {asset ? (
          <>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Request ID</span>
                  }
                >
                  <Input
                    value={asset.id || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Category</span>
                  }
                >
                  <Input
                    value={asset?.category?.name || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Requested By</span>
                  }
                >
                  <Input
                    value={`${asset?.requested_by?.first_name || ""} ${asset?.requested_by?.last_name || "N/A"
                      }`}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">
                      Requester Organisation
                    </span>
                  }
                >
                  <Input
                    value={asset?.requested_by?.organisation?.organisation_name || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">
                      Asset Requested
                    </span>
                  }
                >
                  <Input
                    value={asset.asset_requested || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">
                      Request Description
                    </span>
                  }
                >
                  <Input.TextArea
                    value={asset.request_description || "N/A"}
                    readOnly
                    rows={4}
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Request Date</span>
                  }
                >
                  <Input
                    value={
                      asset?.request_date
                        ? new Date(asset.request_date).toLocaleDateString("en-GB")
                        : "N/A"
                    }
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">
                      Request Status
                    </span>
                  }
                >
                  <Input
                    value={asset.request_status || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Approved By</span>
                  }
                >
                  <Input
                    value={
                      asset?.approved_by
                        ? `${asset.approved_by.first_name} ${asset.approved_by.last_name}`
                        : "Not Approved"
                    }
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Approval Date</span>
                  }
                >
                  <Input
                    value={
                      asset?.date_approved
                        ? new Date(asset.date_approved).toLocaleDateString("en-GB")
                        : "N/A"
                    }
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Allocated By</span>
                  }
                >
                  <Input
                    value={
                      asset?.allocated_by
                        ? `${asset.allocated_by.first_name} ${asset.allocated_by.last_name}`
                        : "Not Allocated"
                    }
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">
                      Allocation Status
                    </span>
                  }
                >
                  <Input
                    value={asset.allocation_status || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Created At</span>
                  }
                >
                  <Input
                    value={
                      asset?.created_at
                        ? new Date(asset.created_at).toLocaleString("en-GB")
                        : "N/A"
                    }
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Updated At</span>
                  }
                >
                  <Input
                    value={
                      asset?.updated_at
                        ? new Date(asset.updated_at).toLocaleString("en-GB")
                        : "N/A"
                    }
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider style={{ borderColor: "#cce4ff" }} />
          </>
        ) : (
          <p className="text-center text-gray-500">No details available.</p>
        )}
      </Form>
    </Modal>
  );
};

ViewUserAssetRequestDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  asset: PropTypes.object,
};

console.clear();
export default ViewUserAssetRequestDetails;
