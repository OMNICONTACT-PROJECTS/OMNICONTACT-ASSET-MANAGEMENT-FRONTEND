import PropTypes from "prop-types";
import { Modal, Form, Input, Row, Col, Divider } from "antd";

const ViewMyAssetAllocationDetails = ({ visible, onClose, asset }) => {
  return (
    <Modal
      title={
        <h2 className="text-xl font-bold text-center text-blue-600">
          My Asset Allocation Details
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
        {/* <h3 className="mb-6 text-lg font-bold text-center">Request Information</h3> */}

        {asset ? (
          <>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label={<span className="font-semibold text-blue-500">Request ID</span>}>
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
                <Form.Item label={<span className="font-semibold text-blue-500">Model Name</span>}>
                  <Input
                    value={asset?.asset?.model_name || "N/A"}
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
                <Form.Item label={<span className="font-semibold text-blue-500">Asset Number</span>}>
                  <Input
                    value={asset?.asset?.asset_number || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span className="font-semibold text-blue-500">Serial Number</span>}>
                  <Input
                    value={asset?.asset?.serial_number || "N/A"}
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
                <Form.Item label={<span className="font-semibold text-blue-500">Asset Requested</span>}>
                  <Input
                    value={asset?.asset_request?.asset_requested || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span className="font-semibold text-blue-500">Allocated By</span>}>
                  <Input
                    value={`${asset?.allocated_by?.first_name} ${asset?.allocated_by?.last_name || ""}`}
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
                <Form.Item label={<span className="font-semibold text-blue-500">Allocated To</span>}>
                  <Input
                    value={`${asset?.allocated_to?.first_name} ${asset?.allocated_to?.last_name || ""}`}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span className="font-semibold text-blue-500">Organisation (Allocated By)</span>}>
                  <Input
                    value={asset?.allocated_by?.organisation?.organisation_name || "N/A"}
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
                <Form.Item label={<span className="font-semibold text-blue-500">Organisation (Allocated To)</span>}>
                  <Input
                    value={asset?.allocated_to?.organisation?.organisation_name || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span className="font-semibold text-blue-500">Date Allocated</span>}>
                  <Input
                    value={asset?.date_allocated ? new Date(asset.date_allocated).toLocaleDateString("en-GB") : "N/A"}
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
                <Form.Item label={<span className="font-semibold text-blue-500">Return Date</span>}>
                  <Input
                    value={asset?.return_date ? new Date(asset.return_date).toLocaleDateString("en-GB") : "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span className="font-semibold text-blue-500">Created At</span>}>
                  <Input
                    value={asset?.created_at ? new Date(asset.created_at).toLocaleString("en-GB") : "N/A"}
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
                <Form.Item label={<span className="font-semibold text-blue-500">Updated At</span>}>
                  <Input
                    value={asset?.updated_at ? new Date(asset.updated_at).toLocaleString("en-GB") : "N/A"}
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

ViewMyAssetAllocationDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  asset: PropTypes.object,
};

export default ViewMyAssetAllocationDetails;
